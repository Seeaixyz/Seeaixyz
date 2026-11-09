import type { Metadata } from 'next';

const pages = {
  "index": {
    "title": "See AI | See Image AI \u2014 Arabic Image Generation",
    "description": "See Image 1.0 \u2014 an image model that writes Arabic accurately, in the right place."
  },
  "about": {
    "title": "About us | See Image AI",
    "description": "See Image is a simple testing platform for image generation, for individual users. It was built by an Arab team led by Mahmoud Saad, based in Faqous, Sharqia Governorate, Egypt."
  },
  "privacy": {
    "title": "Privacy Policy | See Image AI",
    "description": "How See AI handles your data and protects the platform."
  },
  "terms": {
    "title": "User Agreement | See Image AI",
    "description": "Terms of use for the See Image platform."
  },
  "updates": {
    "title": "What\u2019s new | See Image AI",
    "description": "Latest See Image updates and launch plans."
  },
  "waitlist": {
    "title": "Join the waitlist | See Image AI",
    "description": "Leave your email and we will notify you as soon as See Image 1.0 launches."
  }
} as const;
export function pageMetadata(page: keyof typeof pages): Metadata {
  const path = page === 'index' ? '/' : `/${page}`;
  const data = pages[page];
  return { ...data, alternates: { canonical: path, languages: { en: path, 'x-default': path } }, openGraph: { ...data, url: path, type: 'website', siteName: 'See AI', locale: 'en_US', images: ['/assets/og-image.jpg'] }, twitter: { card: 'summary_large_image', ...data, images: ['/assets/og-image.jpg'] } };
}
