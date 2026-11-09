import type { Metadata } from 'next';
import DocPageBody from '@/components/DocPageBody';
import { pageMetadata, webPageJsonLd } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'What’s new | See Image AI',
  description:
    'What’s new — See Image: the waitlist is open, and the expected launch is December 2026 or January 2027.',
  path: '/updates',
  jsonLdName: 'What’s new | See Image AI',
});

export default function UpdatesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            webPageJsonLd('What’s new | See Image AI', 'https://seeai.xyz/updates'),
          ),
        }}
      />
      <DocPageBody kind="updates" />
    </>
  );
}
