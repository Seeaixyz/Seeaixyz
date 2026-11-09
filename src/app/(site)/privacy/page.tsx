import type { Metadata } from 'next';
import DocPageBody from '@/components/DocPageBody';
import { pageMetadata, webPageJsonLd } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Privacy Policy | See Image AI',
  description:
    'Privacy Policy — See Image: what data we collect, why, and your rights under Egypt’s Personal Data Protection Law No. 151 of 2020.',
  path: '/privacy',
  jsonLdName: 'Privacy Policy | See Image AI',
});

export default function PrivacyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            webPageJsonLd(
              'Privacy Policy | See Image AI',
              'https://seeai.xyz/privacy',
            ),
          ),
        }}
      />
      <DocPageBody kind="privacy" />
    </>
  );
}
