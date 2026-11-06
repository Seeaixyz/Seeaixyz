"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/lib/i18n";
import LanguageToggle from "@/components/LanguageToggle";

const links = [
  { href: "/", key: "nav.home" },
  { href: "/studio", key: "nav.studio" },
  { href: "/capabilities", key: "nav.capabilities" },
  { href: "/gallery", key: "nav.gallery" },
  { href: "/models", key: "nav.models" },
  { href: "/pricing", key: "nav.pricing" },
  { href: "/api", key: "nav.api" },
  { href: "/company", key: "nav.company" },
];

export default function HeaderPill() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onClick = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open ]);

  return (
    <>
      <button
        type="button"
        className="pill"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-label={t("nav.open")}
      >
        <Image src="/logo.png" alt="See Image logo" width={22} height={22} priority />
        <span>See Image</span>
        <span className="pill-chevron" aria-hidden="true">
          ⌄
        </span>
      </button>

      {open && (
        <div className="nav-overlay" role="dialog" aria-label={t("nav.open")}>
          <div className="nav-window" ref={panelRef}>
            <div className="nav-brand-row">
              <Link href="/" className="nav-brand" onClick={() => setOpen(false)}>
                <Image src="/logo.png" alt="See Image logo" width={30} height={30} />
                <span>See Image</span>
              </Link>
              <div className="nav-top-actions">
                <LanguageToggle />
                <button
                  type="button"
                  className="nav-close"
                  onClick={() => setOpen(false)}
                  aria-label={t("nav.close")}
                >
                  ⌃
                </button>
              </div>
            </div>

            <p className="nav-status">
              <span className="status-dot" aria-hidden="true" />
              {t("nav.status")} · {t("common.notReleased")}
            </p>

            <nav className="nav-grid" aria-label="Site">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="nav-link"
                  onClick={() => setOpen(false)}
                >
                  {t(l.key)}
                </Link>
              ))}
            </nav>

            <Link href="/models" className="btn btn-white nav-cta" onClick={() => setOpen(false)}>
              {t("nav.cta")}
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
