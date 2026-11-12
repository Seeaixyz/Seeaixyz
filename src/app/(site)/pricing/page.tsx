import type { Metadata } from 'next';
import PricingPageBody from '@/components/PricingPageBody';
import { pageMetadata, webPageJsonLd } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Pricing | See Image AI',
  description:
    'Pricing — See Image: Starter $7 a month and Pro $14 a month. Payment processing fees are added at checkout and paid by the subscriber.',
  path: '/pricing',
  jsonLdName: 'Pricing | See Image AI',
});

export default function PricingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            webPageJsonLd('Pricing | See Image AI', 'https://seeai.xyz/pricing'),
          ),
        }}
      />
      <PricingPageBody />
    </>
  );
}
