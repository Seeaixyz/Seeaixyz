'use client';

import { Fragment } from 'react';
import { useLang } from './LangProvider';

export type DocKind = 'privacy' | 'terms' | 'about' | 'updates' | 'refund';

const TITLE_KEYS: Record<DocKind, 'privacyTitle' | 'termsTitle' | 'aboutTitle' | 'updatesTitle' | 'refundTitle'> = {
  privacy: 'privacyTitle',
  terms: 'termsTitle',
  about: 'aboutTitle',
  updates: 'updatesTitle',
  refund: 'refundTitle',
};

export default function DocPageBody({ kind }: { kind: DocKind }) {
  const { t, sections } = useLang();
  const list = sections(kind);
  return (
    <article className="doc wrap">
      <h1>{t(TITLE_KEYS[kind])}</h1>
      <div>
        {list.map(([h, b]) => (
          <Fragment key={h}>
            <h2>{h}</h2>
            <p>{b}</p>
          </Fragment>
        ))}
      </div>
    </article>
  );
}
