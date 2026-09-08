"use client";

import { MessageCircle } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type Language, withLang } from "@/lib/i18n";
import { trackLeadEvent } from "@/lib/inquiry-attribution";

export function WhatsAppFloatingButton({ lang }: { lang: Language }) {
  const pathname = usePathname();
  const href = withLang("/contact#whatsapp-inquiry", lang);
  const label = lang === "en" ? "Start a WhatsApp inquiry" : "Mulai inquiry WhatsApp";

  return (
    <Link
      href={href}
      onClick={() =>
        trackLeadEvent("whatsapp_floating_click", {
          inquiryType: "general",
          language: lang,
          context: pathname
        })
      }
      className="focus-ring fixed bottom-5 right-5 z-40 inline-flex min-h-14 items-center gap-2 rounded-full bg-[#128c4a] px-4 text-sm font-bold text-white shadow-[0_12px_30px_rgba(18,140,74,0.32)] transition hover:-translate-y-0.5 hover:bg-[#0f7a40] sm:px-5"
      aria-label={label}
      title={label}
    >
      <MessageCircle className="h-6 w-6" aria-hidden="true" />
      <span className="hidden sm:inline">WhatsApp</span>
    </Link>
  );
}
