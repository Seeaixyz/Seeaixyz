'use client';

import { useEffect, useRef, type ReactNode } from 'react';

/** Reveal-on-scroll, same behaviour as the static site: an IntersectionObserver
 * adds `.in` once an element enters the viewport (threshold 0.1). */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.1 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

/** Block-level reveal wrapper (for h2 / lead / section blocks). */
export default function Reveal({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className={`reveal${className ? ` ${className}` : ''}`}>
      {children}
    </div>
  );
}
