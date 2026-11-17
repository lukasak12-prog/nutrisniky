import { useEffect } from "react";
import { Layout } from "@/components/Layout";
import { VouchersSection } from "@/components/VouchersSection";
import { useRevealOnScroll } from "@/hooks/use-reveal-on-scroll";
import { pageByPath } from "@/seo";

export default function VouchersPage() {
  useRevealOnScroll();

  useEffect(() => {
    document.title = pageByPath("/poukazy").title;
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <div className="pt-16 md:pt-20">
        <VouchersSection />
      </div>
    </Layout>
  );
}
