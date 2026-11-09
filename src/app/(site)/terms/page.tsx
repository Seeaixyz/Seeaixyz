import type { Metadata } from 'next';
import DocPageBody from '@/components/DocPageBody';
import { pageMetadata, webPageJsonLd } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'User Agreement | See Image AI',
  description:
    'User Agreement — See Image: the platform’s terms of use, the service under preparation, and Egyptian law.',
  path: '/terms',
  jsonLdName: 'User Agreement | See Image AI',
});

export default function TermsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            webPageJsonLd(
              'User Agreement | See Image AI',
              'https://seeai.xyz/terms',
            ),
          ),
        }}
      />
      <DocPageBody kind="terms" />
    </>
  );
}
