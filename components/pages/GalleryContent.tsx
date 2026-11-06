"use client";

import { useLanguage } from "@/lib/i18n";
import GalleryGrid from "@/components/GalleryGrid";

export default function GalleryContent() {
  const { t } = useLanguage();
  return (
    <div className="page container">
      <header className="page-head">
        <p className="eyebrow">{t("gallery.eyebrow")}</p>
        <h1>{t("gallery.title")}</h1>
        <p className="lede">{t("gallery.body")}</p>
        <p className="badge" style={{ marginTop: 16 }}>
          {t("gallery.count")}
        </p>
      </header>
      <GalleryGrid />
    </div>
  );
}
