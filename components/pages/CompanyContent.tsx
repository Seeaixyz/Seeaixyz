"use client";

import { useLanguage } from "@/lib/i18n";
import { contactEmail } from "@/lib/data";

export default function CompanyContent() {
  const { t } = useLanguage();
  return (
    <div className="page container">
      <header className="page-head">
        <p className="eyebrow">{t("company.eyebrow")}</p>
        <h1>{t("company.title")}</h1>
        <p className="lede">{t("company.body")}</p>
      </header>

      <section className="section">
        <dl className="facts">
          <div className="card">
            <dt>{t("company.founder")}</dt>
            <dd>{t("company.founderName")}</dd>
            <dd style={{ fontWeight: 400, color: "var(--muted)", fontSize: 15, marginTop: 6 }}>
              {t("company.founderBody")}
            </dd>
          </div>
          <div className="card">
            <dt>{t("company.team")}</dt>
            <dd>{t("company.teamBody")}</dd>
          </div>
          <div className="card">
            <dt>{t("company.hq")}</dt>
            <dd>{t("company.hqValue")}</dd>
          </div>
          <div className="card">
            <dt>{t("company.contact")}</dt>
            <dd>
              <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
            </dd>
            <dd style={{ fontWeight: 400, color: "var(--muted)", fontSize: 15, marginTop: 6 }}>
              {t("company.contactBody")}
            </dd>
          </div>
        </dl>
      </section>
    </div>
  );
}
