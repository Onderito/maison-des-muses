"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";

import { createPriceNailsAnimation } from "@/app/animations/price-nails-gsap";
import PinkButton from "./pink-button";

const nailServices = [
  ["Pose Capsule Américaine", "50€"],
  ["Dépose + Pose + Soins", "60€"],
  ["Pose Demi Capsules + Gel", "60€"],
  ["Remplissage", "70€"],
  ["Gainage", "40€"],
  ["Semi Permanent", "30€"],
  ["Dépose Seule", "20€"],
] as const;

const nailArtServices = [
  ["Design Complexe", "5€"],
  ["Gros Strass, Charms...", "1.50 à 5€"],
] as const;

type PriceListProps = {
  title: string;
  services: ReadonlyArray<readonly [string, string]>;
};

function PriceList({ title, services }: PriceListProps) {
  return (
    <div data-price-list>
      <h2
        data-price-title
        className="font-ahsing text-[28px] leading-none text-white lg:text-[32px]"
      >
        {title}
      </h2>
      <div className="mt-8 border-t border-white/80 lg:mt-9">
        {services.map(([label, price]) => (
          <div
            key={label}
            data-price-row
            className="flex items-center justify-between gap-5 border-b border-white/80 py-2 font-seasons text-[16px] leading-normal text-white sm:text-[18px] lg:py-[7px] lg:text-[20px]"
          >
            <span>{label}</span>
            <span className="shrink-0 font-black">{price}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function PriceNails() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    return createPriceNailsAnimation({
      section: sectionRef.current,
      image: imageRef.current,
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="Tarifs des prestations d’onglerie"
      className="relative left-1/2 grid min-h-screen w-screen -translate-x-1/2 bg-[#a8ab6e] lg:grid-cols-[49.42%_50.58%]"
    >
      <div className="flex items-center px-6 py-20 sm:px-12 lg:px-[5.79vw] lg:py-[8vh]">
        <div className="w-full max-w-[645px]">
          <PriceList title="Ongles" services={nailServices} />
          <div className="mt-20 lg:mt-[105px]">
            <PriceList title="Nail art" services={nailArtServices} />
          </div>

          <div
            data-price-cta
            className="mt-9 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between"
          >
            <p className="font-seasons text-[16px] italic text-white/90 lg:text-[18px]">
              Sur rendez-vous uniquement
            </p>
            <PinkButton
              href="https://www.instagram.com/maisondesmuses_julia/"
              className="px-5 py-2.5"
            >
              Prendre rendez-vous
            </PinkButton>
          </div>
        </div>
      </div>

      <div
        ref={imageRef}
        className="relative min-h-[70vh] overflow-hidden border border-white/20 lg:min-h-screen"
      >
        <Image
          src="/images/nails/nails-price.webp"
          alt="Manucure ornée de détails dorés dans les tons bordeaux, nude et vert"
          fill
          sizes="(min-width: 1024px) 51vw, 100vw"
          className="object-cover"
          quality={100}
        />
      </div>
    </section>
  );
}
