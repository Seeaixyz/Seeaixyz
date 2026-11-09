import type { Metadata } from 'next';

const SITE = 'https://seeai.xyz';
const OG_IMAGE = `${SITE}/assets/og-image.jpg`;

const KEYWORDS = [
  'See AI',
  'See Image AI',
  'See Image',
  'Arabic image generation',
  'AI image generator',
  'Arabic text to image',
  'text to image Arabic',
  'See Image 1.0',
];

export interface PageSeo {
  title: string;
  description: string;
  /** Route path, e.g. '/' or '/waitlist'. */
  path: string;
  /** OG/Twitter description when it differs from the meta description. */
  ogDescription?: string;
  /** Name used in the WebPage JSON-LD. */
  jsonLdName: string;
}

export function pageMetadata(opts: PageSeo): Metadata {
  const url = opts.path === '/' ? `${SITE}/` : `${SITE}${opts.path}`;
  const desc = opts.ogDescription ?? opts.description;
  return {
    title: opts.title,
    description: opts.description,
    keywords: KEYWORDS,
    robots: { index: true, follow: true, 'max-image-preview': 'large' },
    alternates: {
      canonical: url,
      languages: { en: url, 'x-default': url },
    },
    openGraph: {
      type: 'website',
      siteName: 'See AI',
      title: opts.title,
      description: desc,
      url,
      images: [{ url: OG_IMAGE }],
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: opts.title,
      description: desc,
      images: [OG_IMAGE],
    },
  };
}

export function webPageJsonLd(name: string, url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name,
    url,
    inLanguage: ['en'],
    isPartOf: { '@type': 'WebSite', name: 'See AI', url: `${SITE}/` },
  };
}

export const HOME_JSON_LD = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      name: 'See AI',
      alternateName: ['See Image AI', 'See Image'],
      url: `${SITE}/`,
      logo: `${SITE}/assets/logo.png`,
      email: 'See@seeai.xyz',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Faqous',
        addressRegion: 'Sharqia',
        addressCountry: 'EG',
      },
    },
    {
      '@type': 'WebSite',
      name: 'See AI',
      alternateName: 'See Image AI',
      url: `${SITE}/`,
      inLanguage: ['en'],
    },
    {
      '@type': 'SoftwareApplication',
      name: 'See Image AI',
      alternateName: 'See AI',
      applicationCategory: 'MultimediaApplication',
      operatingSystem: 'Web',
      description:
        'See AI — See Image AI: a testing platform for image generation with accurate Arabic text.',
    },
  ],
};
