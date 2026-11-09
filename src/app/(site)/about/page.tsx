import type { Metadata } from 'next';
import DocPageBody from '@/components/DocPageBody';
import { pageMetadata, webPageJsonLd } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'About us | See Image AI',
  description:
    'About us — See Image: an image-generation testing platform, built by an Arab team led by Mahmoud Saad, Faqous, Sharqia, Egypt.',
  path: '/about',
  jsonLdName: 'About us | See Image AI',
});

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            webPageJsonLd('About us | See Image AI', 'https://seeai.xyz/about'),
          ),
        }}
      />
      <DocPageBody kind="about" />
    </>
  );
}
