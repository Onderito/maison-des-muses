"use client";

import { useLayoutEffect, useRef } from "react";
import PriceNails from "@/components/ui/price-nails";
import {
  createNailsIntroAnimation,
  createNailsScrollAnimation,
} from "../animations/nails-gsap";

export default function Nails() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const cardEls = useRef<HTMLDivElement[]>([]);

  const nails = [
    { picture: "/images/nails/first-nails.webp" },
    { picture: "/images/nails/second-nails.webp" },
    { picture: "/images/nails/third-nails.webp" },
    { picture: "/images/nails/fourth-nails.webp" },
    { picture: "/images/nails/fiveth-nails.webp" },
    { picture: "/images/nails/sixth-nails.webp" },
    { picture: "/images/nails/seventh-nails.webp" },
    { picture: "/images/nails/heighth-nails.webp" },
    { picture: "/images/nails/nineth-nails.webp" },
    { picture: "/images/nails/tenth-nails.webp" },
  ];
  const rotations = ["-rotate-3", "rotate-2", "-rotate-2", "rotate-3"];

  useLayoutEffect(() => {
    return createNailsScrollAnimation({
      section: sectionRef.current,
      cards: cardsRef.current,
      cardEls: cardEls.current,
      title: titleRef.current,
      desc: descRef.current,
    });
  }, []);

  useLayoutEffect(() => {
    return createNailsIntroAnimation({
      section: sectionRef.current,
      title: titleRef.current,
      desc: descRef.current,
    });
  }, []);

  return (
    <>
      <div
        id="ongles"
        ref={sectionRef}
        className="relative h-screen overflow-hidden lg:overflow-visible"
      >
        <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 text-center">
          <h2 ref={titleRef} className="heading-2 text-title">
            Des créations uniques
          </h2>
          <p ref={descRef} className="body-text text-desc font-seasons">
            Découvrez les dernières créations réalisées au salon. Des poses
            soignées, <br className="hidden md:block xl:hidden" />
            des détails précieux, <br className="hidden xl:block" /> et toujours
            une touche qui vous est propre.
          </p>
        </div>
        <div className="absolute inset-0 z-50 flex items-center justify-center lg:contents">
          <div
            ref={cardsRef}
            className="flex w-full flex-col items-center gap-12 lg:relative lg:z-30 lg:grid lg:grid-cols-2 lg:items-start lg:justify-items-center lg:gap-x-16 lg:gap-y-10 xl:gap-x-[min(36vw,620px)] xl:gap-y-16"
          >
            {nails.map((nail, index) => (
              <div
                key={index}
                ref={(el) => {
                  if (el) cardEls.current[index] = el;
                }}
                className={`relative h-[440px] shrink-0 lg:h-[515px] w-[300px] lg:w-[335px] ${rotations[index % rotations.length]}`}
              >
                <img
                  src="/images/pink-card-mds.webp"
                  alt=""
                  className="absolute inset-0 h-full w-full rounded-[52px]"
                />
                <div className="absolute inset-0 z-20 overflow-hidden rounded-[52px] p-1">
                  <img
                    className="h-full w-full rounded-[46px] object-cover"
                    src={nail.picture}
                    alt="Création ongles"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <PriceNails />
    </>
  );
}
