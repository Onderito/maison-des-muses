import Image from "next/image";
import HeroSection from "./landing/hero-section";
import Nails from "./landing/nails";
import HeadSap from "./landing/head-spa";
import PodcastContent from "@/components/ui/podcast-content";
import Faq from "./landing/faq";
import Footer from "./landing/footer";
import AboutMe from "./landing/about-me";

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutMe />
      <div className="pb-0!">
        <Nails />
      </div>
      <div className="py-10 xl:py-24 ">
        <HeadSap />
      </div>
      <div className="px-4 py-10 sm:px-8 md:px-12 xl:py-24">
        <PodcastContent />
      </div>
      <div className="container">
        <Faq />
      </div>
      <Footer />
    </>
  );
}
