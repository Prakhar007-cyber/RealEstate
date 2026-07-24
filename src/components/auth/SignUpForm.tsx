"use client";

import { useState } from "react";
import AuthField from "./AuthField";
import GoogleButton from "./GoogleButton";
import AuthSuccess from "./AuthSuccess";
import Button from "@/components/ui/Button";

type Fields = {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirm: string;
};
type Errors = Partial<Record<keyof Fields, string>>;

const EMPTY: Fields = { name: "", email: "", phone: "", password: "", confirm: "" };

export default function SignUpForm({ onSwitch }: { onSwitch: () => void }) {
  const [values, setValues] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  function update(key: keyof Fields, value: string) {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const err: Errors = {};
    if (values.name.trim().length < 2) err.name = "Please enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
      err.email = "Enter a valid email address.";
    if (!/^[6-9]\d{9}$/.test(values.phone.replace(/\s/g, "")))
      err.phone = "Enter a valid 10-digit mobile number.";
    if (values.password.length < 6)
      err.password = "Password must be at least 6 characters.";
    if (values.confirm !== values.password)
      err.confirm = "Passwords do not match.";
    setErrors(err);
    if (Object.keys(err).length) return;

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setDone(true);
    }, 1000);
  }

  if (done) {
    return (
      <AuthSuccess
        title={`Welcome, ${values.name.split(" ")[0]}.`}
        message="Your Aurelis account has been created. A concierge will reach out shortly."
      />
    );
  }

  return (
    <div>
      <p className="eyebrow mb-4">Join Aurelis</p>
      <h1 className="mb-2 font-serif text-4xl font-light text-ivory">
        Create Account
      </h1>
      <p className="mb-8 text-sm text-stone">
        Save residences, book visits and unlock private previews.
      </p>

      <form onSubmit={submit} noValidate className="space-y-5">
        <AuthField
          label="Full Name"
          value={values.name}
          onChange={(v) => update("name", v)}
          error={errors.name}
          placeholder="Your name"
          autoComplete="name"
        />
        <AuthField
          label="Email"
          type="email"
          value={values.email}
          onChange={(v) => update("email", v)}
          error={errors.email}
          placeholder="you@email.com"
          autoComplete="email"
        />
        <AuthField
          label="Phone"
          type="tel"
          value={values.phone}
          onChange={(v) => update("phone", v)}
          error={errors.phone}
          placeholder="10-digit mobile"
          autoComplete="tel"
        />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <AuthField
            label="Password"
            type="password"
            value={values.password}
            onChange={(v) => update("password", v)}
            error={errors.password}
            placeholder="••••••••"
            autoComplete="new-password"
          />
          <AuthField
            label="Confirm Password"
            type="password"
            value={values.confirm}
            onChange={(v) => update("confirm", v)}
            error={errors.confirm}
            placeholder="••••••••"
            autoComplete="new-password"
          />
        </div>

        <Button type="submit" variant="primary" disabled={submitting} className="w-full">
          {submitting ? "Creating account…" : "Create Account"}
        </Button>
      </form>

      <div className="my-7 flex items-center gap-4 text-xs text-stone-dark">
        <span className="h-px flex-1 bg-line" />
        OR
        <span className="h-px flex-1 bg-line" />
      </div>

      <GoogleButton label="Sign up with Google" />

      <p className="mt-8 text-center text-sm text-stone">
        Already have an account?{" "}
        <button
          onClick={onSwitch}
          className="text-gold underline-offset-4 transition-colors hover:underline"
        >
          Sign in
        </button>
      </p>
    </div>
  );
}
