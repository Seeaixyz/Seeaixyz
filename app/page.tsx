import type { Metadata } from "next";
import HomeContent from "@/components/pages/HomeContent";

export const metadata: Metadata = {
  title: "See Image 1.0 — Images that read, write, and feel real",
  description:
    "See Image 1.0 by See AI — precise Arabic lettering inside images. Mini for drafts, Large for final images. In intensive training, not yet released. Expected output resolution up to 2K.",
  alternates: { canonical: "https://seeai.xyz/" },
  openGraph: {
    title: "See Image 1.0 — Images that read, write, and feel real",
    description:
      "See Image 1.0 by See AI — precise Arabic lettering inside images. Mini for drafts, Large for final images.",
    url: "https://seeai.xyz/",
  },
};

export default function HomePage() {
  return <HomeContent />;
}
