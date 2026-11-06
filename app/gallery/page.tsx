import type { Metadata } from "next";
import GalleryContent from "@/components/pages/GalleryContent";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Thirteen pictures from the See Image 1.0 launch gallery — nights on the Nile, old Cairo, the desert, and portraits that feel alive.",
  alternates: { canonical: "https://seeai.xyz/gallery" },
  openGraph: {
    title: "Gallery — See Image 1.0",
    description: "Thirteen pictures from the See Image 1.0 launch gallery.",
    url: "https://seeai.xyz/gallery",
    images: [{ url: "/images/giza-pyramids.jpg", width: 1600, height: 900 }],
  },
};

export default function GalleryPage() {
  return <GalleryContent />;
}
