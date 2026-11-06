"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n";
import ModelCard from "@/components/ModelCard";

export default function ModelsContent() {
  const { t } = useLanguage();
  return (
    <div className="page container">
      <header className="page-head">
        <p className="eyebrow">{t("models.eyebrow")}</p>
        <h1>{t("models.title")}</h1>
        <p className="lede">{t("models.body")}</p>
      </header>

      <div className="grid-2">
        <ModelCard
          name={t("models.miniTitle")}
          tag={t("models.miniTag")}
          body={t("models.miniBody")}
          note={t("models.statusValue")}
        />
        <ModelCard
          name={t("models.largeTitle")}
          tag={t("models.largeTag")}
          body={t("models.largeBody")}
          note={t("models.statusValue")}
        />
      </div>

      <section className="section">
        <div className="section-head">
          <h2>{t("models.compareTitle")}</h2>
          <p>{t("models.compareBody")}</p>
        </div>
        <table className="spec-table">
          <thead>
            <tr>
              <th>{t("models.colModel")}</th>
              <th>{t("models.colUse")}</th>
              <th>{t("models.resRow")}</th>
              <th>{t("models.colStatus")}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>See Image 1.0 Mini</td>
              <td>{t("models.miniTag")}</td>
              <td>{t("models.resValue")}</td>
              <td>{t("common.notReleased")}</td>
            </tr>
            <tr>
              <td>See Image 1.0 Large</td>
              <td>{t("models.largeTag")}</td>
              <td>{t("models.resValue")}</td>
              <td>{t("common.notReleased")}</td>
            </tr>
          </tbody>
        </table>
        <p style={{ color: "var(--muted)", marginTop: 16 }}>
          {t("models.statusRow")}: {t("models.statusValue")} · {t("models.accessRow")}:{" "}
          {t("models.accessValue")}
        </p>
        <div style={{ marginTop: 24 }}>
          <Link href="/studio" className="btn btn-white">
            {t("common.tryStudio")}
          </Link>
        </div>
      </section>
    </div>
  );
}
