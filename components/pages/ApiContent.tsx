"use client";

import { useLanguage } from "@/lib/i18n";
import { contactEmail } from "@/lib/data";

export default function ApiContent() {
  const { t } = useLanguage();
  return (
    <div className="page container">
      <header className="page-head">
        <p className="eyebrow">{t("api.eyebrow")}</p>
        <h1>{t("api.title")}</h1>
        <p className="lede">{t("api.body")}</p>
        <p style={{ marginTop: 16 }}>
          <span className="badge">{t("api.notLive")}</span>
        </p>
      </header>

      <section className="section">
        <div className="section-head">
          <h2>{t("api.example")}</h2>
        </div>
        <pre className="code-block">
{`# ${t("api.notLive")}
curl -X POST https://api.seeai.xyz/v1/images \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "see-image-1.0-large",
    "prompt": "A felucca on the Nile at night"
  }'`}
        </pre>
      </section>

      <section className="section">
        <div className="grid-2">
          <article className="card">
            <h3>{t("api.providersTitle")}</h3>
            <p>{t("api.providersBody")}</p>
          </article>
          <article className="card">
            <h3>{t("api.docsTitle")}</h3>
            <p>{t("api.docsBody")}</p>
            <p style={{ marginTop: 14 }}>
              <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
            </p>
          </article>
        </div>
      </section>
    </div>
  );
}
