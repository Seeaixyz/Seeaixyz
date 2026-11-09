import type { Metadata } from 'next';
import WaitlistPageBody from '@/components/WaitlistPageBody';
import { pageMetadata, webPageJsonLd } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Join the waitlist | See Image AI',
  description:
    'Join the See Image 1.0 waitlist — we will email you at launch. Your email only, no commitment.',
  path: '/waitlist',
  jsonLdName: 'Join the waitlist — See Image AI',
});

export default function WaitlistPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            webPageJsonLd(
              'Join the waitlist — See Image AI',
              'https://seeai.xyz/waitlist',
            ),
          ),
        }}
      />
      <WaitlistPageBody />
    </>
  );
}
