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
      <div className=" pb-0!">
        <Nails />
      </div>
      <div>
        <HeadSap />
      </div>
      <div className=" container">
        <PodcastContent />
      </div>
      <div className="container">
        <Faq />
      </div>
      <Footer />
    </>
  );
}
