"use client";

import { useEffect, useState } from "react";
import { MessageCircle, Minus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type Language, withLang } from "@/lib/i18n";
import { trackLeadEvent } from "@/lib/inquiry-attribution";

const MINIMIZED_KEY = "cse:whatsapp-minimized";

export function WhatsAppFloatingButton({ lang }: { lang: Language }) {
  const [minimized, setMinimized] = useState(false);
  const pathname = usePathname();
  const href = withLang("/contact#whatsapp-inquiry", lang);
  const label = lang === "en" ? "Start a WhatsApp inquiry" : "Mulai inquiry WhatsApp";
  const minimizeLabel = lang === "en" ? "Minimize WhatsApp button" : "Minimalkan tombol WhatsApp";
  const restoreLabel = lang === "en" ? "Show WhatsApp button" : "Tampilkan tombol WhatsApp";

  useEffect(() => {
    try {
      setMinimized(window.sessionStorage.getItem(MINIMIZED_KEY) === "true");
    } catch {
      // Keep the expanded default when browser storage is unavailable.
    }
  }, []);

  function updateMinimized(nextValue: boolean) {
    setMinimized(nextValue);
    try {
      window.sessionStorage.setItem(MINIMIZED_KEY, String(nextValue));
    } catch {
      // The control still works for the current page without browser storage.
    }
  }

  if (minimized) {
    return (
      <button
        type="button"
        onClick={() => updateMinimized(false)}
        className="focus-ring fixed bottom-5 right-5 z-40 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#128c4a] text-white shadow-[0_12px_30px_rgba(18,140,74,0.32)] transition hover:-translate-y-0.5 hover:bg-[#0f7a40]"
        aria-label={restoreLabel}
        title={restoreLabel}
      >
        <MessageCircle className="h-5 w-5" aria-hidden="true" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-5 right-5 z-40 inline-flex min-h-14 items-stretch overflow-hidden rounded-full bg-[#128c4a] text-white shadow-[0_12px_30px_rgba(18,140,74,0.32)] transition hover:-translate-y-0.5">
      <Link
        href={href}
        onClick={() =>
          trackLeadEvent("whatsapp_floating_click", {
            inquiryType: "general",
            language: lang,
            context: pathname
          })
        }
        className="focus-ring inline-flex items-center gap-2 px-4 text-sm font-bold transition hover:bg-[#0f7a40] sm:px-5"
        aria-label={label}
        title={label}
      >
        <MessageCircle className="h-6 w-6" aria-hidden="true" />
        <span>WhatsApp</span>
      </Link>
      <button
        type="button"
        onClick={() => updateMinimized(true)}
        className="focus-ring inline-flex w-11 items-center justify-center border-l border-white/25 transition hover:bg-[#0f7a40]"
        aria-label={minimizeLabel}
        title={minimizeLabel}
      >
        <Minus className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  );
}
