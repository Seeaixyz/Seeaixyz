"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useLanguage } from "@/lib/i18n";
import { galleryImages, type GalleryImage } from "@/lib/data";

export default function GalleryGrid({ images = galleryImages }: { images?: GalleryImage[] }) {
  const { lang, t } = useLanguage();
  const [selected, setSelected] = useState<number | null>(null);

  useEffect(() => {
    if (selected === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
      if (e.key === "ArrowRight") setSelected((s) => (s === null ? s : (s + 1) % images.length));
      if (e.key === "ArrowLeft")
        setSelected((s) => (s === null ? s : (s - 1 + images.length) % images.length));
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [selected, images.length]);

  const current = selected !== null ? images[selected] : null;

  return (
    <>
      <div className="gallery-grid">
        {images.map((img, i) => (
          <button
            key={img.src}
            type="button"
            className="gallery-item"
            onClick={() => setSelected(i)}
            aria-label={lang === "ar" ? img.titleAr : img.titleEn}
          >
            <Image
              src={img.src}
              alt={lang === "ar" ? img.titleAr : img.titleEn}
              width={800}
              height={533}
              loading="lazy"
            />
            <span className="gallery-caption">{lang === "ar" ? img.titleAr : img.titleEn}</span>
          </button>
        ))}
      </div>

      {current && selected !== null && (
        <div className="lightbox" role="dialog" aria-label={lang === "ar" ? current.titleAr : current.titleEn}>
          <button type="button" className="lightbox-close" onClick={() => setSelected(null)} aria-label={t("gallery.close")}>
            ✕
          </button>
          <button
            type="button"
            className="lightbox-nav lightbox-prev"
            onClick={() => setSelected((selected - 1 + images.length) % images.length)}
            aria-label="Previous"
          >
            ‹
          </button>
          <figure className="lightbox-figure">
            <Image
              src={current.src}
              alt={lang === "ar" ? current.titleAr : current.titleEn}
              width={1200}
              height={800}
            />
            <figcaption>
              <strong>{lang === "ar" ? current.titleAr : current.titleEn}</strong>
              <span>{lang === "ar" ? current.descAr : current.descEn}</span>
            </figcaption>
          </figure>
          <button
            type="button"
            className="lightbox-nav lightbox-next"
            onClick={() => setSelected((selected + 1) % images.length)}
            aria-label="Next"
          >
            ›
          </button>
        </div>
      )}
    </>
  );
}
