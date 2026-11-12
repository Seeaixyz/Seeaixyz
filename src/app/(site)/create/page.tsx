import type { Metadata } from 'next';
import CreatePageBody from '@/components/CreatePageBody';
import { pageMetadata, webPageJsonLd } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Create | See Image AI',
  description:
    'Create — See Image: describe an image or upload one and describe the change.',
  path: '/create',
  jsonLdName: 'Create | See Image AI',
});

export default function CreatePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            webPageJsonLd('Create | See Image AI', 'https://seeai.xyz/create'),
          ),
        }}
      />
      <CreatePageBody />
    </>
  );
}
