import type { Metadata } from "next";
import StudioContent from "@/components/pages/StudioContent";

export const metadata: Metadata = {
  title: "Studio",
  description:
    "Try the See Image 1.0 generation studio preview — ready prompts, styles, and aspect ratios. Front-end preview only; the model is in intensive training.",
  alternates: { canonical: "https://seeai.xyz/studio" },
  openGraph: {
    title: "Studio — See Image 1.0",
    description: "Generation studio preview for See Image 1.0.",
    url: "https://seeai.xyz/studio",
  },
};

export default function StudioPage() {
  return <StudioContent />;
}
