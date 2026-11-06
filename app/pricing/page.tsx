import type { Metadata } from "next";
import PricingContent from "@/components/pages/PricingContent";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "See Image 1.0 pricing — three plans coming soon. Official price to be announced.",
  alternates: { canonical: "https://seeai.xyz/pricing" },
  openGraph: {
    title: "Pricing — See Image 1.0",
    description: "Three plans coming soon. Official price to be announced.",
    url: "https://seeai.xyz/pricing",
  },
};

export default function PricingPage() {
  return <PricingContent />;
}
