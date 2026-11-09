import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import Script from 'next/script';
import schema from '@/data/schema.json';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://seeai.xyz'),
  title: 'See AI | See Image AI — Arabic Image Generation',
  description: 'See Image 1.0 — an image model that writes Arabic accurately, in the right place.',
  keywords: ['See AI', 'See Image AI', 'AI image generator', 'Arabic text in images', 'Arabic image generation', 'Arabic text to image', 'See Image 1.0'],
  robots: { index: true, follow: true, 'max-image-preview': 'large' },
  icons: { icon: '/assets/logo.png' },
  referrer: 'no-referrer',
};
export const viewport: Viewport = { width: 'device-width', initialScale: 1, viewportFit: 'cover', themeColor: '#000000' };

export default function RootLayout({ children }: { children: ReactNode }) {
  return <html lang="en" dir="ltr"><head>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
  </head><body>{children}<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} /><Script src="/_vercel/insights/script.js" strategy="afterInteractive" /></body></html>;
}
