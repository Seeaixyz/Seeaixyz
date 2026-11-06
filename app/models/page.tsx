import type { Metadata } from "next";
import ModelsContent from "@/components/pages/ModelsContent";

export const metadata: Metadata = {
  title: "Models — Mini & Large",
  description:
    "See Image 1.0 Mini for drafts and See Image 1.0 Large for final images. Both in intensive training and not yet released. Expected output resolution up to 2K.",
  alternates: { canonical: "https://seeai.xyz/models" },
  openGraph: {
    title: "Models — See Image 1.0 Mini & Large",
    description: "Mini for drafts, Large for final images. In intensive training.",
    url: "https://seeai.xyz/models",
  },
};

export default function ModelsPage() {
  return <ModelsContent />;
}
