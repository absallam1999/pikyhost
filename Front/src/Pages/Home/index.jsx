import Layout from "../../Components/Layout";
import Hero from "../../Components/Hero";
import WhyChoose from "../../Components/WHY";
import Features from "../../Components/Features";
import Pricing from "../../Components/Pricing";
import WhoAudience from "../../Components/WHO";
import CtaSection from "../../Components/CTA";

export default function Home() {
  return (
    <Layout>
      <Hero />
      <WhyChoose />
      <Features />
      <Pricing />
      <WhoAudience />
      <CtaSection />
    </Layout>
  );
}
