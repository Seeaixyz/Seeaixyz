"use client";

import { useLanguage } from "@/lib/i18n";

export default function LanguageToggle() {
  const { lang, setLang } = useLanguage();
  return (
    <button
      type="button"
      className="lang-toggle"
      onClick={() => setLang(lang === "en" ? "ar" : "en")}
      aria-label={lang === "en" ? "Switch to Arabic" : "Switch to English"}
    >
      {lang === "en" ? "العربية" : "EN"}
    </button>
  );
}
