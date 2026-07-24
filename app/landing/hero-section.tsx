"use client";

import PinkButton from "@/components/ui/pink-button";
import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import {
  createHeroIntroAnimation,
  createHeroScrollAnimation,
} from "../animations/hero-section-gsap";

export default function HeroSection() {
  const contentRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const imageRevealRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const greenFlowerRef = useRef<HTMLImageElement>(null);
  const pinkFlowerRef = useRef<HTMLImageElement>(null);
  const heroRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    return createHeroIntroAnimation({
      label: labelRef.current,
      title: titleRef.current,
      desc: descRef.current,
      button: buttonRef.current,
      imageReveal: imageRevealRef.current,
      pinkFlower: pinkFlowerRef.current,
      greenFlower: greenFlowerRef.current,
    });
  }, []);

  useLayoutEffect(() => {
    return createHeroScrollAnimation({
      hero: heroRef.current,
      content: contentRef.current,
      image: imageRef.current,
      pinkFlower: pinkFlowerRef.current,
      greenFlower: greenFlowerRef.current,
    });
  }, []);

  return (
    <section
      id="accueil"
      ref={heroRef}
      aria-labelledby="hero-title"
      className="relative min-h-screen overflow-hidden"
    >
      <div className="container flex flex-col items-center justify-center pb-0">
        <div ref={contentRef} className="flex flex-col items-center">
          <p
            ref={labelRef}
            className="font-seasons text-[13px] uppercase tracking-[0.16em] text-accent sm:text-[14px] text-center"
          >
            Institut de beauté · Saint-Martin-sur-Nohain
          </p>
          <h1
            id="hero-title"
            ref={titleRef}
            className="heading-1 mt-4 max-w-[1040px] text-balance text-center text-title"
          >
            Bienvenue chez Maison des Muses
          </h1>
          <p
            ref={descRef}
            className="body-text mt-5 max-w-[620px] text-pretty text-center font-seasons text-desc"
          >
            Chaque muse mérite un lieu à son image. Un espace où chaque geste
            est pensé avec précision et chaque instant, avec intention.
          </p>
          <div ref={buttonRef} className="mt-6 flex gap-4">
            <PinkButton
              className="min-h-12 w-full border-0 pl-4 pr-3.5 shadow-[0_0_0_1px_rgba(0,0,0,0.05),0_8px_20px_rgba(238,94,138,0.2)] duration-150 hover:scale-[1.02] active:scale-[0.96]"
              href="https://www.instagram.com/maisondesmuses_julia/"
            >
              <span className="inline-flex items-center gap-2">
                Prendre rendez-vous
                <svg
                  aria-hidden="true"
                  viewBox="0 0 16 16"
                  className="size-3.5"
                  fill="none"
                >
                  <path
                    d="M5 11 11 5m0 0H6.5M11 5v4.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </PinkButton>
          </div>
        </div>

        <div
          ref={imageRevealRef}
          className="relative mt-10 h-[clamp(300px,45vw,620px)] w-full"
        >
          <Image
            ref={imageRef}
            className="absolute left-0 top-0 z-10 h-full w-full max-w-none rounded-[48px] object-cover object-[center_38%] outline outline-1 -outline-offset-1 outline-black/10 shadow-[0_2px_4px_rgba(0,0,0,0.04),0_18px_48px_rgba(74,85,5,0.1)] md:object-center"
            src="/images/about-me/julia-home.webp"
            alt="Julia, fondatrice de Maison des Muses dans son institut"
            width={1920}
            height={1080}
            fetchPriority="high"
            sizes="(min-width: 1280px) calc(100vw - 96px), (min-width: 768px) calc(100vw - 96px), calc(100vw - 32px)"
            loading="eager"
          />
        </div>

        <Image
          ref={pinkFlowerRef}
          className="absolute h-auto w-[250px] -right-30 top-70 -rotate-10 xl:-rotate-20 z-20 md:w-[350px] md:top-50 md:-right-35 lg:w-[550px] lg:-right-60 xl:w-[795px] xl:top-0 xl:-right-70"
          src="/images/pink-flower.webp"
          alt=""
          width={796}
          height={995}
          sizes="(min-width: 1280px) 795px, (min-width: 1024px) 550px, (min-width: 768px) 350px, 250px"
          fetchPriority="low"
        />
        <Image
          ref={greenFlowerRef}
          className="absolute h-auto w-[250px] -left-28 top-70 z-0 md:w-[350px] md:top-50 lg:w-[550px] lg:-left-60 xl:w-[795px]"
          src="/images/green-flower.webp"
          alt=""
          width={796}
          height={833}
          sizes="(min-width: 1280px) 795px, (min-width: 1024px) 550px, (min-width: 768px) 350px, 250px"
          fetchPriority="low"
        />
      </div>
    </section>
  );
}
