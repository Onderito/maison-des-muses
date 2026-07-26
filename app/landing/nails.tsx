"use client";

import Image from "next/image";
import { useRef } from "react";
import PriceNails from "@/components/ui/price-nails";
import useStableLayoutAnimation from "../hook/use-stable-layout-animation";
import {
  createNailsIntroAnimation,
  createNailsScrollAnimation,
} from "../animations/nails-gsap";

const nailCreations = [
  "/images/nails/first-nails.webp",
  "/images/nails/second-nails.webp",
  "/images/nails/third-nails.webp",
  "/images/nails/fourth-nails.webp",
  "/images/nails/fiveth-nails.webp",
  "/images/nails/sixth-nails.webp",
  "/images/nails/seventh-nails.webp",
  "/images/nails/heighth-nails.webp",
  "/images/nails/nineth-nails.webp",
  "/images/nails/tenth-nails.webp",
] as const;

const rotations = ["-rotate-3", "rotate-2", "-rotate-2", "rotate-3"] as const;
const desktopWidths = [
  "lg:w-[320px]",
  "lg:w-[335px]",
  "lg:w-[328px]",
  "lg:w-[342px]",
] as const;

export default function Nails() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<HTMLUListElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const cardEls = useRef<HTMLLIElement[]>([]);

  useStableLayoutAnimation(() => {
    return createNailsScrollAnimation({
      section: sectionRef.current,
      cards: cardsRef.current,
      cardEls: cardEls.current,
      content: contentRef.current,
    });
  });

  useStableLayoutAnimation(() => {
    return createNailsIntroAnimation({
      section: sectionRef.current,
      label: labelRef.current,
      title: titleRef.current,
      desc: descRef.current,
    });
  });

  return (
    <>
      <section
        id="ongles"
        ref={sectionRef}
        aria-labelledby="nails-title"
        className="relative overflow-hidden motion-reduce:h-auto motion-reduce:overflow-visible md:h-screen lg:overflow-visible"
      >
        <div
          ref={contentRef}
          className="relative z-10 flex flex-col items-center px-4 pb-8 pt-16 text-center motion-reduce:relative motion-reduce:inset-auto motion-reduce:min-h-[360px] md:pointer-events-none md:absolute md:inset-0 md:justify-center md:py-0"
        >
          <p
            ref={labelRef}
            data-scroll-intro
            className="font-seasons text-[13px] uppercase tracking-[0.16em] text-accent sm:text-[14px]"
          >
            Le carnet des Muses
          </p>
          <h2
            id="nails-title"
            ref={titleRef}
            data-scroll-intro
            className="heading-2 mt-4 max-w-[720px] text-balance text-title"
          >
            Des créations uniques
          </h2>
          <p
            ref={descRef}
            data-scroll-intro
            className="body-text mt-5 max-w-[620px] text-pretty font-seasons text-desc"
          >
            Découvrez les dernières créations réalisées au salon. Des poses
            soignées, des détails précieux et toujours une touche qui vous est
            propre.
          </p>
        </div>

        <div className="relative z-20 w-full snap-x snap-mandatory overflow-x-auto scroll-px-[9vw] pb-14 pt-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:absolute md:inset-0 md:z-50 md:flex md:items-center md:justify-center md:overflow-visible md:pb-0 md:pt-0 lg:contents">
          <ul
            ref={cardsRef}
            aria-label="Galerie des créations ongulaires"
            className="flex w-max flex-row items-center gap-5 px-[9vw] md:w-full md:flex-col md:gap-10 md:px-0 lg:relative lg:z-30 lg:grid lg:grid-cols-2 lg:items-start lg:justify-items-center lg:gap-x-16 lg:gap-y-10 xl:gap-x-[min(36vw,620px)] xl:gap-y-16"
          >
            {nailCreations.map((picture, index) => (
              <li
                key={picture}
                ref={(el) => {
                  if (el) cardEls.current[index] = el;
                }}
                className={`relative aspect-[335/516] w-[min(300px,82vw)] shrink-0 snap-center rounded-[52px] shadow-[0_0_0_1px_rgba(0,0,0,0.05),0_12px_32px_rgba(74,85,5,0.12)] md:snap-none ${desktopWidths[index % desktopWidths.length]} ${rotations[index % rotations.length]}`}
              >
                <Image
                  src="/images/pink-card-mds.webp"
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 342px, 300px"
                  loading="eager"
                  className="rounded-[52px]"
                />
                <div className="absolute inset-0 z-20 overflow-hidden rounded-[52px] p-1">
                  <div className="relative h-full w-full overflow-hidden rounded-[48px] outline outline-1 -outline-offset-1 outline-black/10">
                    <Image
                      className="object-cover"
                      src={picture}
                      alt={`Création ongulaire ${index + 1} réalisée à Maison des Muses`}
                      fill
                      sizes="(min-width: 1024px) 334px, 292px"
                    />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <PriceNails />
    </>
  );
}
