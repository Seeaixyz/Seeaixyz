'use client';

import { useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import { useLang } from './LangProvider';

type Mode = 'image' | 'img2img';

interface Msg {
  role: 'you' | 'see';
  text: string;
  img?: string;
}

export default function ChatPageBody() {
  const { t } = useLang();
  const [mode, setMode] = useState<Mode>('image');
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Msg[]>([]);
  const [upload, setUpload] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const placeholders: Record<Mode, string> = {
    image: t('chatPhImage'),
    img2img: t('chatPhImg2Img'),
  };

  const onFile = (e: ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setUpload(URL.createObjectURL(f));
  };

  const onSend = (e: FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (mode === 'img2img' && !upload) {
      setMessages((m) => [...m, { role: 'see', text: t('chatNoImage') }]);
      return;
    }
    if (!text) return;
    setMessages((m) => [
      ...m,
      { role: 'you', text, img: mode === 'img2img' ? upload ?? undefined : undefined },
      { role: 'see', text: t('chatReply') },
    ]);
    setInput('');
  };

  return (
    <div className="doc wrap">
      <h1>{t('chatTitle')}</h1>
      <p className="lead" style={{ color: 'var(--mu)', fontSize: 18, maxWidth: '34em', marginBottom: 28 }}>
        {t('chatSub')}
      </p>
      <div className="seg chat-modes" role="tablist" aria-label="Chat modes">
        <button className={mode === 'image' ? 'on' : ''} onClick={() => setMode('image')}>
          {t('chatModeImage')}
        </button>
        <button className={mode === 'img2img' ? 'on' : ''} onClick={() => setMode('img2img')}>
          {t('chatModeImg2Img')}
        </button>
      </div>
      {mode === 'img2img' && (
        <div style={{ margin: '20px 0 4px', display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            hidden
            onChange={onFile}
          />
          <button type="button" className="btn" onClick={() => fileRef.current?.click()}>
            {t('chatUpload')}
          </button>
          {upload && (
            <img src={upload} alt="" style={{ width: 72, height: 72, objectFit: 'cover', borderRadius: 12 }} />
          )}
        </div>
      )}
      <div className="chat-box">
        {messages.length === 0 ? (
          <p className="mu" style={{ textAlign: 'center', padding: '48px 16px' }}>
            {t('chatSoon')}
          </p>
        ) : (
          messages.map((m, i) => (
            <div key={i} className={`chat-msg ${m.role}`}>
              <b>{m.role === 'you' ? 'You' : 'See'}</b>
              {m.img && (
                <img src={m.img} alt="" style={{ width: 120, height: 120, objectFit: 'cover', borderRadius: 12, margin: '8px 0' }} />
              )}
              <p>{m.text}</p>
            </div>
          ))
        )}
      </div>
      <form className="wl-row chat-form" onSubmit={onSend}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={placeholders[mode]}
          aria-label={placeholders[mode]}
        />
        <button type="submit" className="btn light">
          {t('chatSend')}
        </button>
      </form>
      <p className="wl-consent">{t('chatSoon')}</p>
    </div>
  );
}
