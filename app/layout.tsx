import type { Metadata } from "next";
import { LanguageProvider } from "@/lib/i18n";
import HeaderPill from "@/components/HeaderPill";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://seeai.xyz"),
  title: {
    default: "See Image 1.0 — Images that read, write, and feel real | See AI",
    template: "%s | See Image 1.0 — See AI",
  },
  description:
    "See Image 1.0 by See AI — a new image model family with precise Arabic lettering inside images. Mini for drafts, Large for final images. In intensive training, not yet released. Expected output resolution up to 2K.",
  keywords: [
    "See Image 1.0",
    "See AI",
    "AI image generation",
    "Arabic text in images",
    "Arabic calligraphy AI",
    "text to image",
    "image model",
  ],
  authors: [{ name: "See AI" }],
  creator: "See AI",
  publisher: "See AI",
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://seeai.xyz",
    languages: { en: "https://seeai.xyz", ar: "https://seeai.xyz" },
  },
  openGraph: {
    type: "website",
    siteName: "See Image 1.0",
    url: "https://seeai.xyz",
    title: "See Image 1.0 — Images that read, write, and feel real",
    description:
      "See Image 1.0 by See AI — precise Arabic lettering inside images. Mini for drafts, Large for final images. In intensive training.",
    images: [{ url: "/images/nile-night.jpg", width: 1600, height: 900, alt: "Nile at night, made with See Image 1.0" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "See Image 1.0 — Images that read, write, and feel real",
    description:
      "See Image 1.0 by See AI — precise Arabic lettering inside images. Mini for drafts, Large for final images.",
    images: ["/images/nile-night.jpg"],
  },
  icons: { icon: "/logo.png", apple: "/logo.png" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://seeai.xyz/#organization",
      name: "See AI",
      url: "https://seeai.xyz",
      logo: "https://seeai.xyz/logo.png",
      email: "See@seeai.xyz",
      founder: { "@type": "Person", name: "Mahmoud Saad" },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Faqous",
        addressRegion: "Sharqia Governorate",
        addressCountry: "EG",
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://seeai.xyz/#website",
      url: "https://seeai.xyz",
      name: "See Image 1.0",
      publisher: { "@id": "https://seeai.xyz/#organization" },
      inLanguage: ["en", "ar"],
    },
    {
      "@type": "Product",
      name: "See Image 1.0",
      description:
        "Image model family from See AI: Mini for drafts and Large for final images. In intensive training, not yet released. Expected output resolution up to 2K.",
      brand: { "@type": "Brand", name: "See AI" },
      manufacturer: { "@id": "https://seeai.xyz/#organization" },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <LanguageProvider>
          <HeaderPill />
          <main>{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
