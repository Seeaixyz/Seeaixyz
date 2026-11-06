"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n";
import ModelCard from "@/components/ModelCard";
import GalleryGrid from "@/components/GalleryGrid";
import { galleryImages } from "@/lib/data";

export default function HomeContent() {
  const { t } = useLanguage();
  return (
    <div className="page">
      <section className="hero container">
        <div className="hero-logo">
          <Image src="/logo.png" alt="See Image logo" width={296} height={296} priority />
        </div>
        <p className="eyebrow">{t("home.eyebrow")}</p>
        <h1>{t("home.title")}</h1>
        <p className="lede">{t("home.subtitle")}</p>
        <div className="hero-actions">
          <Link href="/models" className="btn btn-white">
            {t("home.ctaPrimary")}
          </Link>
          <Link href="/gallery" className="btn btn-ghost">
            {t("home.ctaSecondary")}
          </Link>
        </div>
        <div className="hero-banner">
          <Image
            src="/images/nile-night.jpg"
            alt="Nile at night"
            width={1600}
            height={800}
            priority
          />
        </div>
      </section>

      <section className="section container">
        <div className="grid-2">
          <article className="card">
            <span className="badge">{t("nav.status")}</span>
            <h2>{t("home.trainingTitle")}</h2>
            <p>{t("home.trainingBody")}</p>
          </article>
          <article className="card">
            <span className="badge">{t("home.resTitle")}</span>
            <h2>{t("home.resValue")}</h2>
            <p>{t("home.resBody")}</p>
          </article>
        </div>
      </section>

      <section className="section container">
        <div className="section-head">
          <h2>{t("home.modelsTitle")}</h2>
          <p>{t("home.modelsBody")}</p>
        </div>
        <div className="grid-2">
          <ModelCard
            name="See Image 1.0 Mini"
            tag={t("models.miniTag")}
            body={t("models.miniBody")}
            note={`${t("common.notReleased")} · ${t("home.resValue")}`}
          />
          <ModelCard
            name="See Image 1.0 Large"
            tag={t("models.largeTag")}
            body={t("models.largeBody")}
            note={`${t("common.notReleased")} · ${t("home.resValue")}`}
          />
        </div>
      </section>

      <section className="section container">
        <div className="grid-2">
          <article className="card">
            <h2>{t("home.arabicTitle")}</h2>
            <p>{t("home.arabicBody")}</p>
          </article>
          <article className="card">
            <h2>{t("home.accessTitle")}</h2>
            <p>{t("home.accessBody")}</p>
          </article>
        </div>
      </section>

      <section className="section container">
        <div className="section-head">
          <h2>{t("home.galleryTitle")}</h2>
          <p>{t("home.galleryBody")}</p>
        </div>
        <GalleryGrid images={galleryImages.slice(0, 6)} />
        <div style={{ marginTop: 24, textAlign: "center" }}>
          <Link href="/gallery" className="btn btn-white">
            {t("common.viewGallery")}
          </Link>
        </div>
      </section>
    </div>
  );
}
