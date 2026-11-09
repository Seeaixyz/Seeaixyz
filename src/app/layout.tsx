import type { Metadata, Viewport } from 'next';
import { Cairo, Inter } from 'next/font/google';
import './globals.css';

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  weight: ['400', '600', '700'],
  variable: '--font-cairo',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://seeai.xyz'),
  title: 'See AI | See Image AI — Images with Correct Arabic Text',
  description:
    'See Image 1.0 — an image model that writes Arabic accurately, in the right place. Join the waitlist. Launching soon: Mini first, then Large.',
  keywords: [
    'See AI',
    'See Image AI',
    'See Image',
    'Arabic image generation',
    'AI image generator',
    'Arabic text to image',
    'text to image Arabic',
    'See Image 1.0',
  ],
  robots: { index: true, follow: true, 'max-image-preview': 'large' },
  alternates: {
    canonical: 'https://seeai.xyz/',
    languages: {
      en: 'https://seeai.xyz/',
      'x-default': 'https://seeai.xyz/',
    },
  },
  openGraph: {
    type: 'website',
    siteName: 'See AI',
    title: 'See AI | See Image AI — Images with Correct Arabic Text',
    description:
      'See Image 1.0 — an image model that writes Arabic accurately, in the right place. Launching soon.',
    url: 'https://seeai.xyz/',
    images: [{ url: 'https://seeai.xyz/assets/og-image.jpg' }],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'See AI | See Image AI — Images with Correct Arabic Text',
    description:
      'See Image 1.0 — an image model that writes Arabic accurately, in the right place.',
    images: ['https://seeai.xyz/assets/og-image.jpg'],
  },
  icons: { icon: '/assets/logo.png' },
  other: { referrer: 'no-referrer' },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr" className={`${cairo.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
