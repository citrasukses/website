import Link from "next/link";
import type { ReactNode } from "react";

type CTAButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
};

export function CTAButton({ href, children, variant = "primary", className = "" }: CTAButtonProps) {
  const variants = {
    primary: "bg-signal-500 text-white shadow-sm hover:bg-signal-600",
    secondary: "bg-graphite-900 text-white shadow-sm hover:bg-graphite-800",
    ghost: "border border-graphite-300 bg-white text-graphite-900 shadow-sm hover:border-industrial-600 hover:text-industrial-700"
  };

  return (
    <Link
      href={href}
      className={`focus-ring inline-flex min-h-11 items-center justify-center rounded-sm px-5 py-3 text-sm font-semibold transition ${variants[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
