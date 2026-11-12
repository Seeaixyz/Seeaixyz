'use client';

import { useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import { useLang } from './LangProvider';

type Mode = 'image' | 'img2img';

export default function CreatePageBody() {
  const { t } = useLang();
  const [mode, setMode] = useState<Mode>('image');
  const [prompt, setPrompt] = useState('');
  const [upload, setUpload] = useState<string | null>(null);
  const [notice, setNotice] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const onFile = (e: ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setUpload(URL.createObjectURL(f));
  };

  const onGenerate = (e: FormEvent) => {
    e.preventDefault();
    if (mode === 'img2img' && !upload) {
      setNotice(t('chatNoImage'));
      return;
    }
    if (!prompt.trim()) return;
    setNotice(t('createSoon'));
  };

  return (
    <div className="doc wrap">
      <h1>{t('createTitle')}</h1>
      <p className="lead" style={{ color: 'var(--mu)', fontSize: 18, maxWidth: '34em', marginBottom: 28 }}>
        {t('createSub')}
      </p>
      <div className="seg chat-modes" role="tablist" aria-label="Create modes">
        <button className={mode === 'image' ? 'on' : ''} onClick={() => setMode('image')}>
          {t('chatModeImage')}
        </button>
        <button className={mode === 'img2img' ? 'on' : ''} onClick={() => setMode('img2img')}>
          {t('chatModeImg2Img')}
        </button>
      </div>
      {mode === 'img2img' && (
        <div style={{ margin: '20px 0 4px', display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
          <input ref={fileRef} type="file" accept="image/*" hidden onChange={onFile} />
          <button type="button" className="btn" onClick={() => fileRef.current?.click()}>
            {t('chatUpload')}
          </button>
          {upload && (
            <img src={upload} alt="" style={{ width: 72, height: 72, objectFit: 'cover', borderRadius: 12 }} />
          )}
        </div>
      )}
      <form onSubmit={onGenerate} style={{ marginTop: 20 }}>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder={mode === 'image' ? t('createPromptPh') : t('chatPhImg2Img')}
          aria-label={t('createPromptPh')}
          rows={4}
          style={{
            width: '100%',
            background: 'var(--s2)',
            border: '1px solid var(--line)',
            borderRadius: 16,
            padding: 16,
            color: '#fff',
            fontSize: 16,
            resize: 'vertical',
          }}
        />
        <div style={{ marginTop: 14 }}>
          <button type="submit" className="btn light big">
            {t('createGenerate')}
          </button>
        </div>
      </form>
      <div className="chat-box" style={{ marginTop: 24 }}>
        <p className="mu" style={{ textAlign: 'center', padding: '48px 16px' }}>
          {notice || t('createResult')}
        </p>
      </div>
    </div>
  );
}
