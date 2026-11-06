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
    primary: "bg-signal-500 text-white hover:bg-signal-600",
    secondary: "bg-industrial-600 text-white hover:bg-industrial-700",
    ghost: "border border-industrial-200 bg-white text-industrial-700 hover:border-industrial-600 hover:bg-industrial-50"
  };

  return (
    <Link
      href={href}
      className={`focus-ring cse-button ${variants[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
