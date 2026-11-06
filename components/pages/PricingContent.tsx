"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n";

const plans = [
  { name: "pricing.plan1", body: "pricing.plan1Body" },
  { name: "pricing.plan2", body: "pricing.plan2Body" },
  { name: "pricing.plan3", body: "pricing.plan3Body" },
];

const features = ["pricing.f1", "pricing.f2", "pricing.f3", "pricing.f4"];

export default function PricingContent() {
  const { t } = useLanguage();
  return (
    <div className="page container">
      <header className="page-head">
        <p className="eyebrow">{t("pricing.eyebrow")}</p>
        <h1>{t("pricing.title")}</h1>
        <p className="lede">{t("pricing.body")}</p>
      </header>
      <div className="grid-3">
        {plans.map((p) => (
          <article className="card plan-card" key={p.name}>
            <h3>{t(p.name)}</h3>
            <p>{t(p.body)}</p>
            <div className="price">—</div>
            <p className="price-note">
              {t("pricing.perMonth")} · {t("pricing.announce")}
            </p>
            <ul className="plan-features">
              {features.map((f) => (
                <li key={f}>{t(f)}</li>
              ))}
            </ul>
            <Link href="/company" className="btn btn-white">
              {t("pricing.cta")}
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
