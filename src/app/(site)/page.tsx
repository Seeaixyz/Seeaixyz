import type { Metadata } from 'next';
import HomePage from '@/components/HomePage';
import { HOME_JSON_LD, pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'See AI | See Image AI — Images with Correct Arabic Text',
  description:
    'See Image 1.0 — an image model that writes Arabic accurately, in the right place. Join the waitlist. Launching soon.',
  path: '/',
  ogDescription:
    'See Image 1.0 — an image model that writes Arabic accurately, in the right place. Launching soon.',
  jsonLdName: 'See AI',
});

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(HOME_JSON_LD) }}
      />
      <HomePage />
    </>
  );
}
