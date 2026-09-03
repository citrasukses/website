"use client";

import { useEffect } from "react";
import { initializeInquiryAttribution } from "@/lib/inquiry-attribution";

export function AttributionInitializer() {
  useEffect(() => {
    initializeInquiryAttribution();
  }, []);

  return null;
}
