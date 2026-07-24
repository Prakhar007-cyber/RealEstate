"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

/* Labelled auth input with inline error and an optional password reveal toggle. */
export default function AuthField({
  label,
  value,
  onChange,
  error,
  type = "text",
  placeholder,
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
}) {
  const [show, setShow] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword && show ? "text" : type;

  return (
    <label className="block">
      <span className="mb-2 block text-xs uppercase tracking-[0.16em] text-stone">
        {label}
      </span>
      <div className="relative">
        <input
          type={inputType}
          value={value}
          placeholder={placeholder}
          autoComplete={autoComplete}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            "w-full border-b bg-transparent pb-2.5 pr-8 text-ivory placeholder:text-stone-dark focus:outline-none",
            "[color-scheme:dark] transition-colors",
            error ? "border-red-400/70" : "border-line focus:border-gold"
          )}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            className="absolute right-0 top-0.5 text-stone transition-colors hover:text-gold"
            aria-label={show ? "Hide password" : "Show password"}
          >
            {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        )}
      </div>
      {error && <span className="mt-1.5 block text-xs text-red-400/90">{error}</span>}
    </label>
  );
}
