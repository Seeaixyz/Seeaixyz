'use client';

import { useEffect, useRef, useState } from 'react';
import { useLang } from './LangProvider';
import { useReveal } from './Reveal';
import type { ShowcaseItem } from '@/content';

function ShowCard({
  item,
  onOpen,
}: {
  item: ShowcaseItem;
  onOpen: (item: ShowcaseItem) => void;
}) {
  const [ref, visible] = useReveal<HTMLElement>();
  return (
    <figure
      ref={ref}
      className={`show-card reveal${visible ? ' in' : ''}`}
      onClick={() => onOpen(item)}
    >
      <img src={`/${item.src}`} alt={item.cap} loading="lazy" draggable={false} />
      <figcaption>
        <b>{item.cap}</b>
        <span>
          {item.sub} · {item.model}
        </span>
      </figcaption>
    </figure>
  );
}

export default function ShowcaseGrid() {
  const { showcase } = useLang();
  const [selected, setSelected] = useState<ShowcaseItem | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dlg = dialogRef.current;
    if (!dlg) return;
    if (selected) {
      if (!dlg.open) dlg.showModal();
    } else if (dlg.open) {
      dlg.close();
    }
  }, [selected]);

  useEffect(() => {
    const dlg = dialogRef.current;
    if (!dlg) return;
    const onClose = () => setSelected(null);
    dlg.addEventListener('close', onClose);
    return () => dlg.removeEventListener('close', onClose);
  }, []);

  return (
    <>
      <div className="show-grid" id="showGrid">
        {showcase.map((s) => (
          <ShowCard key={s.src} item={s} onOpen={setSelected} />
        ))}
      </div>
      <dialog
        id="lb"
        ref={dialogRef}
        onClick={(e) => {
          if (e.target === dialogRef.current) dialogRef.current?.close();
        }}
      >
        {selected && (
          <>
            <img id="lbImg" src={`/${selected.src}`} alt="" />
            <p id="lbP">{selected.cap}</p>
            <small id="lbM" className="mu">
              {selected.sub} · {selected.model}
            </small>
          </>
        )}
        <div className="row">
          <button
            className="btn"
            id="lbX"
            onClick={() => dialogRef.current?.close()}
          >
            ✕
          </button>
        </div>
      </dialog>
    </>
  );
}
