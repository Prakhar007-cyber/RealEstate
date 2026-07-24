"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import Button from "@/components/ui/Button";
import SplitText from "@/components/reactbits/SplitText";
import { cn } from "@/lib/utils";

type Fields = { name: string; phone: string; email: string; date: string };
type Errors = Partial<Record<keyof Fields, string>>;

const EMPTY: Fields = { name: "", phone: "", email: "", date: "" };

/* Cinematic CTA + validated booking form with an animated success state. */
export default function SiteVisit() {
  const [values, setValues] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  // Simple, readable frontend validation.
  function validate(v: Fields): Errors {
    const e: Errors = {};
    if (v.name.trim().length < 2) e.name = "Please enter your name.";
    if (!/^[6-9]\d{9}$/.test(v.phone.replace(/\s/g, "")))
      e.phone = "Enter a valid 10-digit mobile number.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email))
      e.email = "Enter a valid email address.";
    if (!v.date) e.date = "Choose a preferred date.";
    else if (v.date < today) e.date = "Date cannot be in the past.";
    return e;
  }

  function update(key: keyof Fields, value: string) {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    // No backend — simulate a short request, then celebrate.
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setDone(true);
    }, 1100);
  }

  return (
    <section id="contact" className="grain relative overflow-hidden bg-ink">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=2000&q=80"
          alt="Aurelis clubhouse interior"
          fill
          sizes="100vw"
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/60" />
      </div>

      <div className="relative z-10 mx-auto grid max-w-[1400px] grid-cols-1 gap-16 px-5 py-28 sm:px-8 sm:py-36 lg:grid-cols-2 lg:items-center">
        {/* Copy */}
        <div>
          <p className="eyebrow mb-6">Private Appointments</p>
          <SplitText
            as="h2"
            text="Experience Aurelis in person."
            className="font-serif text-5xl font-light leading-[1.02] tracking-tight text-ivory sm:text-7xl"
          />
          <p className="mt-8 max-w-md text-base leading-relaxed text-stone">
            Tour the experience centre, walk a fully-appointed show residence and
            meet our design team. Visits are strictly by appointment.
          </p>
        </div>

        {/* Form / success */}
        <div className="border border-line bg-ink/50 p-7 backdrop-blur-md sm:p-10">
          <AnimatePresence mode="wait">
            {done ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center py-10 text-center"
              >
                <motion.div
                  className="flex h-20 w-20 items-center justify-center rounded-full border border-gold"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 14, delay: 0.1 }}
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -30 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.35, type: "spring", stiffness: 260 }}
                  >
                    <Check className="h-9 w-9 text-gold" strokeWidth={1.5} />
                  </motion.div>
                </motion.div>
                <h3 className="mt-8 font-serif text-3xl font-light text-ivory">
                  Thank you, {values.name.split(" ")[0]}.
                </h3>
                <p className="mt-3 max-w-sm text-sm text-stone">
                  Your visit request for{" "}
                  <span className="text-gold-soft">{formatDate(values.date)}</span>{" "}
                  has been received. Our team will call you shortly to confirm.
                </p>
                <button
                  onClick={() => {
                    setValues(EMPTY);
                    setDone(false);
                  }}
                  className="mt-8 text-xs uppercase tracking-[0.2em] text-stone underline-offset-4 transition-colors hover:text-gold hover:underline"
                >
                  Book another visit
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                noValidate
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-5"
              >
                <h3 className="mb-2 font-serif text-2xl font-light text-ivory">
                  Book a Private Site Visit
                </h3>
                <Field
                  label="Full Name"
                  value={values.name}
                  onChange={(v) => update("name", v)}
                  error={errors.name}
                  placeholder="Your name"
                />
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <Field
                    label="Phone"
                    type="tel"
                    value={values.phone}
                    onChange={(v) => update("phone", v)}
                    error={errors.phone}
                    placeholder="10-digit mobile"
                  />
                  <Field
                    label="Email"
                    type="email"
                    value={values.email}
                    onChange={(v) => update("email", v)}
                    error={errors.email}
                    placeholder="you@email.com"
                  />
                </div>
                <Field
                  label="Preferred Date"
                  type="date"
                  value={values.date}
                  onChange={(v) => update("date", v)}
                  error={errors.date}
                  min={today}
                />
                <Button
                  type="submit"
                  variant="primary"
                  disabled={submitting}
                  className="w-full"
                >
                  {submitting ? "Scheduling…" : "Schedule Visit"}
                </Button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function formatDate(d: string) {
  if (!d) return "";
  return new Date(d).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/* A single labelled input with inline error message. */
function Field({
  label,
  value,
  onChange,
  error,
  type = "text",
  placeholder,
  min,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  type?: string;
  placeholder?: string;
  min?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs uppercase tracking-[0.16em] text-stone">
        {label}
      </span>
      <input
        type={type}
        value={value}
        min={min}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "w-full border-b bg-transparent pb-2 text-ivory placeholder:text-stone-dark focus:outline-none",
          "[color-scheme:dark] transition-colors",
          error ? "border-red-400/70" : "border-line focus:border-gold"
        )}
      />
      {error && <span className="mt-1.5 block text-xs text-red-400/90">{error}</span>}
    </label>
  );
}
