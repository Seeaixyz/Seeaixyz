import type { Metadata } from "next";
import CompanyContent from "@/components/pages/CompanyContent";

export const metadata: Metadata = {
  title: "Company",
  description:
    "See AI — founded and led by Mahmoud Saad, an Arab development team. Headquarters in Faqous, Sharqia Governorate, Arab Republic of Egypt. Contact: See@seeai.xyz.",
  alternates: { canonical: "https://seeai.xyz/company" },
  openGraph: {
    title: "Company — See AI",
    description: "Founded by Mahmoud Saad. HQ in Faqous, Sharqia, Egypt.",
    url: "https://seeai.xyz/company",
  },
};

export default function CompanyPage() {
  return <CompanyContent />;
}
