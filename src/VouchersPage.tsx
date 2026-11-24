import { useEffect } from "react";
import { Layout } from "@/components/Layout";
import { VouchersSection } from "@/components/VouchersSection";
import { pageByPath } from "@/seo";

export default function VouchersPage() {
  useEffect(() => {
    document.title = pageByPath("/poukazy").title;
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <VouchersSection />
    </Layout>
  );
}
