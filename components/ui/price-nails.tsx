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
        className="font-ahsing text-[26px] leading-[0.95] text-title md:text-[28px] xl:text-[32px]"
      >
        {title}
      </h2>
      <div className="mt-6 border-t border-border md:mt-7 xl:mt-9">
        {services.map(([label, price]) => (
          <div
            key={label}
            data-price-row
            className="flex items-center justify-between gap-5 border-b border-border py-1.5 font-seasons text-[15px] leading-normal text-desc sm:text-[16px] xl:py-[7px] xl:text-[20px]"
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
      className="relative left-1/2 grid min-h-screen w-screen -translate-x-1/2 bg-[#d7da95] lg:grid-cols-[49.42%_50.58%]"
    >
      <div className="flex items-center px-6 py-14 sm:px-10 lg:px-12 lg:py-8 xl:px-[5.79vw] xl:py-[8vh]">
        <div className="mx-auto w-full max-w-[645px] lg:mx-0">
          <PriceList title="Ongles" services={nailServices} />
          <div className="mt-14 lg:mt-12 xl:mt-[105px]">
            <PriceList title="Nail art" services={nailArtServices} />
          </div>

          <div
            data-price-cta
            className="mt-7 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between xl:mt-9"
          >
            <p className="font-seasons text-[15px] italic text-desc md:text-[16px] xl:text-[18px]">
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
        className="relative min-h-[70vh] overflow-hidden  lg:min-h-screen"
      >
        <Image
          src="/images/nails/nails-price.webp"
          alt="Manucure ornée de détails dorés dans les tons bordeaux, nude et vert"
          fill
          sizes="(min-width: 1024px) 51vw, 100vw"
          className="object-cover"
          quality={75}
        />
      </div>
    </section>
  );
}
