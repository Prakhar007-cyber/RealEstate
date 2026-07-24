"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import Magnet from "@/components/reactbits/Magnet";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "ghost" | "light";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  className?: string;
  magnetic?: boolean;
  type?: "button" | "submit";
  disabled?: boolean;
  "data-cursor"?: string;
};

const variants: Record<Variant, string> = {
  primary:
    "bg-gold text-ink hover:bg-gold-soft border border-gold",
  outline:
    "bg-transparent text-ivory border border-gold/50 hover:border-gold hover:text-gold",
  ghost: "bg-transparent text-ivory border border-transparent hover:text-gold",
  light: "bg-ivory text-ink border border-ivory hover:bg-transparent hover:text-ivory",
};

/**
 * The site's one button. Renders as a Next <Link> when `href` is given,
 * otherwise a native <button>. Optionally wrapped in a Magnet for the
 * magnetic-hover micro-interaction on pointer devices.
 */
export default function Button({
  children,
  href,
  onClick,
  variant = "primary",
  className,
  magnetic = false,
  type = "button",
  disabled,
  ...rest
}: ButtonProps) {
  const classes = cn(
    "group relative inline-flex items-center justify-center gap-2 overflow-hidden px-8 py-3.5 text-[0.8rem] font-medium uppercase tracking-[0.18em] transition-colors duration-500 disabled:cursor-not-allowed disabled:opacity-60",
    variants[variant],
    className
  );

  const inner = (
    <span className="relative z-10 inline-flex items-center gap-2">
      {children}
    </span>
  );

  const content = href ? (
    <Link href={href} className={classes} data-cursor={rest["data-cursor"]}>
      {inner}
    </Link>
  ) : (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
      data-cursor={rest["data-cursor"]}
    >
      {inner}
    </button>
  );

  if (!magnetic) return content;
  return <Magnet strength={4}>{content}</Magnet>;
}
