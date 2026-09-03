"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";
import type { Language } from "@/lib/i18n";
import { trackLeadEvent } from "@/lib/inquiry-attribution";

export function TrackedEmailLink({
  lang,
  context,
  children,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & {
  lang: Language;
  context: string;
  children: ReactNode;
}) {
  return (
    <a
      {...props}
      onClick={(event) => {
        props.onClick?.(event);
        if (!event.defaultPrevented) {
          trackLeadEvent("contact_email_click", {
            inquiryType: "general",
            language: lang,
            context
          });
        }
      }}
    >
      {children}
    </a>
  );
}
