import type { Metadata } from "next";
import ApiContent from "@/components/pages/ApiContent";

export const metadata: Metadata = {
  title: "API Access",
  description:
    "Use See Image 1.0 in your product through third-party providers or the See AI API. The API is not live yet.",
  alternates: { canonical: "https://seeai.xyz/api" },
  openGraph: {
    title: "API Access — See Image 1.0",
    description: "Third-party providers or the See AI API. Not live yet.",
    url: "https://seeai.xyz/api",
  },
};

export default function ApiPage() {
  return <ApiContent />;
}
