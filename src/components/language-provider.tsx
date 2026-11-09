'use client';

import type { ReactNode } from 'react';
import { getText } from '@/lib/content';

/** English-only copy. No browser-language or localStorage override. */
export function LanguageProvider({ children }: { children: ReactNode }) { return children; }
export function useLanguage() { return { t: getText }; }
