"use client";

import OutlineButton from "@/components/ui/outline-button";
import PinkButton from "@/components/ui/pink-button";
import Image from "next/image";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";
import {
  createHeroIntroAnimation,
  createHeroScrollAnimation,
} from "../animations/hero-section-gsap";

export default function HeroSection() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const greenFlowerRef = useRef<HTMLImageElement>(null);
  const pinkFlowerRef = useRef<HTMLImageElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    return createHeroIntroAnimation({
      title: titleRef.current,
      desc: descRef.current,
      button: buttonRef.current,
      image: imageRef.current,
      pinkFlower: pinkFlowerRef.current,
      greenFlower: greenFlowerRef.current,
    });
  }, []);

  useLayoutEffect(() => {
    return createHeroScrollAnimation({
      hero: heroRef.current,
      image: imageRef.current,
      pinkFlower: pinkFlowerRef.current,
      greenFlower: greenFlowerRef.current,
      scrollHint: scrollHintRef.current,
    });
  }, []);

  return (
    <div ref={heroRef} className="min-h-screen overflow-hidden relative">
      <div className="flex flex-col gap-4 items-center justify-center container pb-0">
        <h1 ref={titleRef} className="heading-1 text-title text-center">
          Bienvenue chez <br /> Maison des Muses
        </h1>
        <p
          ref={descRef}
          className="body-text font-seasons text-center text-desc"
        >
          Chaque muse mérite un lieu à son image. Un espace où chaque geste est
          pensé <br className="hidden xl:block" /> avec précision et chaque
          instant, avec intention.
        </p>
        <div ref={buttonRef} className="flex gap-4 mt-6">
          <PinkButton
            className="w-full"
            href="https://www.instagram.com/maisondesmuses_julia/"
          >
            Prendre rendez-vous
          </PinkButton>
          <OutlineButton className="w-full">
            Découvrir l&apos;univers
          </OutlineButton>
        </div>

        <div className="relative w-full ">
          <img
            ref={imageRef}
            className="w-full max-w-none h-96 mt-10 rounded-[48px] relative z-10 object-cover"
            src="https://d3p3fw3rutb1if.cloudfront.net/photos/76134893-d352-4e8b-806a-6b44734a865f"
            alt="Julia"
            onLoad={() => ScrollTrigger.refresh()}
          />
        </div>

        <Image
          ref={pinkFlowerRef}
          className="absolute w-[250px] -right-30 top-70 -rotate-10 xl:-rotate-20 z-20 md:w-[350px] md:top-50 md:-right-35 lg:w-[550px] lg:-right-60 xl:w-[795px] xl:top-0 xl:-right-70"
          src="/images/pink-flower-mds.png"
          alt="rose"
          width={1000}
          height={1000}
        />
        <Image
          ref={greenFlowerRef}
          className="absolute w-[250px] -left-28 top-70 z-0 md:w-[350px] md:top-50 lg:w-[550px] lg:-left-60 xl:w-[795px]"
          src="/images/green-flower-mds.png"
          alt="rose"
          width={1000}
          height={1000}
        />
      </div>
    </div>
  );
}
