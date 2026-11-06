"use client";

import { useLanguage } from "@/lib/i18n";

const cards = [
  { title: "cap.textTitle", body: "cap.textBody" },
  { title: "cap.arabicTitle", body: "cap.arabicBody" },
  { title: "cap.editTitle", body: "cap.editBody" },
  { title: "cap.refTitle", body: "cap.refBody" },
  { title: "cap.resTitle", body: "cap.resBody" },
  { title: "cap.transTitle", body: "cap.transBody" },
];

export default function CapabilitiesContent() {
  const { t } = useLanguage();
  return (
    <div className="page container">
      <header className="page-head">
        <p className="eyebrow">{t("cap.eyebrow")}</p>
        <h1>{t("cap.title")}</h1>
        <p className="lede">{t("cap.body")}</p>
      </header>
      <div className="grid-3">
        {cards.map((c) => (
          <article className="card" key={c.title}>
            <h3>{t(c.title)}</h3>
            <p>{t(c.body)}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
