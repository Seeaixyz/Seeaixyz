"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n";
import { contactEmail } from "@/lib/data";

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <Link href="/" className="footer-logo">
            <Image src="/logo.png" alt="See Image logo" width={34} height={34} />
            <span>See Image</span>
          </Link>
          <p>{t("footer.tag")}</p>
          <p className="footer-training">{t("footer.training")}</p>
        </div>
        <nav className="footer-col" aria-label="Footer">
          <h3>{t("footer.models")}</h3>
          <Link href="/models">See Image 1.0 Mini</Link>
          <Link href="/models">See Image 1.0 Large</Link>
          <Link href="/pricing">{t("nav.pricing")}</Link>
          <Link href="/api">{t("nav.api")}</Link>
        </nav>
        <nav className="footer-col" aria-label="Footer company">
          <h3>{t("footer.company")}</h3>
          <Link href="/company">{t("nav.company")}</Link>
          <Link href="/gallery">{t("nav.gallery")}</Link>
          <Link href="/capabilities">{t("nav.capabilities")}</Link>
          <Link href="/studio">{t("nav.studio")}</Link>
        </nav>
        <div className="footer-col">
          <h3>{t("footer.contact")}</h3>
          <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
          <p>
            Faqous — Sharqia Governorate
            <br />
            Arab Republic of Egypt
          </p>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>{t("footer.rights")}</span>
      </div>
    </footer>
  );
}
