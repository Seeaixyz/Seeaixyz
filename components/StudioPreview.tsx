"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/lib/i18n";
import { galleryImages, readyPrompts, ratios, styles } from "@/lib/data";

const stageKeys = ["studio.stage1", "studio.stage2", "studio.stage3", "studio.stage4"];

export default function StudioPreview() {
  const { lang, t } = useLanguage();
  const [prompt, setPrompt] = useState(readyPrompts[0].en);
  const [style, setStyle] = useState(styles[0]);
  const [ratio, setRatio] = useState(ratios[0]);
  const [model, setModel] = useState<"Mini" | "Large">("Large");
  const [running, setRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState(0);
  const [result, setResult] = useState(0);
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, []);

  const generate = () => {
    if (running) return;
    setRunning(true);
    setProgress(0);
    setStage(0);
    let p = 0;
    timer.current = setInterval(() => {
      p += 4;
      if (p >= 100) {
        if (timer.current) clearInterval(timer.current);
        setProgress(100);
        setRunning(false);
        setResult((r) => (r + 1) % galleryImages.length);
        return;
      }
      setProgress(p);
      setStage(Math.min(3, Math.floor(p / 25)));
    }, 90);
  };

  const pickPrompt = (i: number) => {
    setPrompt(lang === "ar" ? readyPrompts[i].ar : readyPrompts[i].en);
  };

  const copyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable
    }
  };

  const img = galleryImages[result];

  return (
    <div className="studio">
      <div className="studio-controls">
        <label className="field">
          <span>{t("studio.promptLabel")}</span>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={t("studio.promptPh")}
            rows={3}
          />
        </label>

        <div className="field">
          <span>{t("studio.ready")}</span>
          <div className="chips">
            {readyPrompts.map((p, i) => (
              <button key={i} type="button" className="chip" onClick={() => pickPrompt(i)}>
                {lang === "ar" ? p.ar : p.en}
              </button>
            ))}
          </div>
        </div>

        <div className="field-row">
          <label className="field">
            <span>{t("studio.style")}</span>
            <select value={style} onChange={(e) => setStyle(e.target.value)}>
              {styles.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>
          <label className="field">
            <span>{t("studio.ratio")}</span>
            <select value={ratio} onChange={(e) => setRatio(e.target.value)}>
              {ratios.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </label>
          <label className="field">
            <span>{t("studio.model")}</span>
            <select value={model} onChange={(e) => setModel(e.target.value as "Mini" | "Large")}>
              <option value="Mini">See Image 1.0 Mini</option>
              <option value="Large">See Image 1.0 Large</option>
            </select>
          </label>
        </div>

        <p className="studio-model-note">
          {model === "Mini" ? t("studio.miniNote") : t("studio.largeNote")}
        </p>

        <div className="studio-actions">
          <button type="button" className="btn btn-white" onClick={generate} disabled={running}>
            {running ? t("studio.generating") : t("studio.generate")}
          </button>
          <button type="button" className="btn btn-ghost" onClick={copyPrompt}>
            {copied ? t("studio.copied") : t("studio.copy")}
          </button>
        </div>

        {(running || progress > 0) && (
          <div className="progress-wrap" aria-live="polite">
            <div className="progress-track">
              <div className="progress-fill" style={{ width: `${progress}%` }} />
            </div>
            <p className="progress-label">
              {t(stageKeys[stage])} · {progress}%
            </p>
          </div>
        )}
      </div>

      <figure className="studio-result">
        <Image
          src={img.src}
          alt={lang === "ar" ? img.titleAr : img.titleEn}
          width={1200}
          height={800}
        />
        <figcaption>
          <strong>{lang === "ar" ? img.titleAr : img.titleEn}</strong>
          <span>{t("studio.previewNote")}</span>
        </figcaption>
      </figure>
    </div>
  );
}
