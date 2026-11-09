'use client';

import { useEffect, useRef, useState, type ReactNode, type RefObject } from 'react';

/** Reveal-on-scroll: an IntersectionObserver flips `visible` once an element
 * enters the viewport (threshold 0.1). The `in` class is rendered by React
 * (not added to the DOM directly), so a later re-render — e.g. opening a
 * model card — can never wipe it out and make the element vanish. */
export function useReveal<T extends HTMLElement>(): [
  RefObject<T | null>,
  boolean,
] {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || visible) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setVisible(true);
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.1 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [visible]);
  return [ref, visible];
}

/** Block-level reveal wrapper (for h2 / lead / section blocks). */
export default function Reveal({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  const [ref, visible] = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`reveal${visible ? ' in' : ''}${className ? ` ${className}` : ''}`}
    >
      {children}
    </div>
  );
}
