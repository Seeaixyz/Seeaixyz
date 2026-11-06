import type { Metadata } from "next";
import CapabilitiesContent from "@/components/pages/CapabilitiesContent";

export const metadata: Metadata = {
  title: "Capabilities",
  description:
    "What See Image 1.0 does best — precise text in images, first-class Arabic lettering, plain-instruction editing, consistent characters, and up to 2K output.",
  alternates: { canonical: "https://seeai.xyz/capabilities" },
  openGraph: {
    title: "Capabilities — See Image 1.0",
    description: "Precise text, Arabic lettering, editing, and up to 2K output.",
    url: "https://seeai.xyz/capabilities",
  },
};

export default function CapabilitiesPage() {
  return <CapabilitiesContent />;
}
