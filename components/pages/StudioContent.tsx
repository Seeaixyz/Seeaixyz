"use client";

import { useLanguage } from "@/lib/i18n";
import StudioPreview from "@/components/StudioPreview";

export default function StudioContent() {
  const { t } = useLanguage();
  return (
    <div className="page container">
      <header className="page-head">
        <p className="eyebrow">{t("studio.eyebrow")}</p>
        <h1>{t("studio.title")}</h1>
        <p className="lede">{t("studio.body")}</p>
      </header>
      <div className="preview-banner">{t("studio.previewNote")}</div>
      <StudioPreview />
    </div>
  );
}
