import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import WhyTrustedSection from "@/components/WhyTrustedSection";
import TeamSection from "@/components/TeamSection";
import ObjectsSection from "@/components/ObjectsSection";
import GallerySection from "@/components/GallerySection";
import ServicesSection from "@/components/ServicesSection";
import OurServicesSection from "@/components/OurServicesSection";
import ReviewsSection from "@/components/ReviewsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import PageLoader from "@/components/PageLoader";

export default function Home() {
  return (
    <>
      <PageLoader />
      <main className="relative">
        <Header />
        <HeroSection />
        <WhyTrustedSection />
        <TeamSection />
        <ObjectsSection />
        <GallerySection />
        <ServicesSection />
        <OurServicesSection />
        <ReviewsSection />
        <ContactSection />
        <Footer />
      </main>
    </>
  );
}
