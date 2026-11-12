import type { Metadata } from 'next';
import DocPageBody from '@/components/DocPageBody';
import { pageMetadata, webPageJsonLd } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Refund Policy | See Image AI',
  description:
    'Refund Policy — See Image: how monthly subscriptions, cancellations and refunds work.',
  path: '/refund',
  jsonLdName: 'Refund Policy | See Image AI',
});

export default function RefundPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            webPageJsonLd('Refund Policy | See Image AI', 'https://seeai.xyz/refund'),
          ),
        }}
      />
      <DocPageBody kind="refund" />
    </>
  );
}
