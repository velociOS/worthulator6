"use client";

import { useEffect } from "react";
import { setLocale, type Locale } from "@/src/lib/locale";

/**
 * Silently forces a locale on page load.
 *
 * Place this at the top of any UK (or other regional) page that wraps an
 * existing calculator component. The component reads locale from localStorage
 * via getLocale() and listens to the "worthulator:locale" event — both of
 * which this component updates.
 *
 * Renders nothing to the DOM.
 */
export default function LocaleSetter({ locale }: { locale: Locale }) {
  useEffect(() => {
    setLocale(locale);
    window.dispatchEvent(new Event("worthulator:locale"));
  }, [locale]);

  return null;
}
