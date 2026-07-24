"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import AuthField from "./AuthField";
import GoogleButton from "./GoogleButton";
import AuthSuccess from "./AuthSuccess";
import Button from "@/components/ui/Button";

type Errors = { email?: string; password?: string };

export default function SignInForm({ onSwitch }: { onSwitch: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const found: Errors = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      found.email = "Enter a valid email address.";
    if (password.length < 6) found.password = "Password must be at least 6 characters.";
    setErrors(found);
    if (Object.keys(found).length) return;

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setDone(true);
    }, 1000);
  }

  if (done) {
    return (
      <AuthSuccess
        title="Welcome back."
        message="You're signed in. Redirecting you to your Aurelis dashboard…"
      />
    );
  }

  return (
    <div>
      <p className="eyebrow mb-4">Members</p>
      <h1 className="mb-2 font-serif text-4xl font-light text-ivory">Sign In</h1>
      <p className="mb-8 text-sm text-stone">
        Access your saved residences and appointments.
      </p>

      <form onSubmit={submit} noValidate className="space-y-6">
        <AuthField
          label="Email"
          type="email"
          value={email}
          onChange={(v) => {
            setEmail(v);
            setErrors((e) => ({ ...e, email: undefined }));
          }}
          error={errors.email}
          placeholder="you@email.com"
          autoComplete="email"
        />
        <AuthField
          label="Password"
          type="password"
          value={password}
          onChange={(v) => {
            setPassword(v);
            setErrors((e) => ({ ...e, password: undefined }));
          }}
          error={errors.password}
          placeholder="••••••••"
          autoComplete="current-password"
        />

        <div className="flex items-center justify-between text-xs">
          <button
            type="button"
            onClick={() => setRemember((r) => !r)}
            className="flex items-center gap-2 text-stone transition-colors hover:text-ivory"
          >
            <span
              className={`flex h-4 w-4 items-center justify-center border ${
                remember ? "border-gold bg-gold" : "border-line"
              }`}
            >
              {remember && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="h-1.5 w-1.5 bg-ink"
                />
              )}
            </span>
            Remember me
          </button>
          <button
            type="button"
            onClick={() => alert("Password reset is a demo in this portfolio project.")}
            className="text-stone transition-colors hover:text-gold"
          >
            Forgot password?
          </button>
        </div>

        <Button type="submit" variant="primary" disabled={submitting} className="w-full">
          {submitting ? "Signing in…" : "Sign In"}
        </Button>
      </form>

      <div className="my-7 flex items-center gap-4 text-xs text-stone-dark">
        <span className="h-px flex-1 bg-line" />
        OR
        <span className="h-px flex-1 bg-line" />
      </div>

      <GoogleButton label="Continue with Google" />

      <p className="mt-8 text-center text-sm text-stone">
        New to Aurelis?{" "}
        <button
          onClick={onSwitch}
          className="text-gold underline-offset-4 transition-colors hover:underline"
        >
          Create account
        </button>
      </p>
    </div>
  );
}
