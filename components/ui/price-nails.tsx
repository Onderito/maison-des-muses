"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";

import { createPriceNailsAnimation } from "@/app/animations/price-nails-gsap";
import PinkButton from "./pink-button";

const nailServices = [
  ["Pose capsules américaines", "50 €"],
  ["Dépose, pose et soins", "60 €"],
  ["Pose demi-capsules et gel", "60 €"],
  ["Remplissage", "70 €"],
  ["Gainage", "40 €"],
  ["Semi-permanent", "30 €"],
  ["Dépose seule", "20 €"],
] as const;

const nailArtServices = [
  ["Design complexe", "5 €"],
  ["Strass et charms", "1,50 à 5 €"],
] as const;

type PriceListProps = {
  title: string;
  services: ReadonlyArray<readonly [string, string]>;
};

function PriceList({ title, services }: PriceListProps) {
  return (
    <div data-price-list>
      <h3
        data-price-title
        className="text-balance font-ahsing text-[26px] leading-[0.95] text-title md:text-[28px] xl:text-[32px]"
      >
        {title}
      </h3>
      <dl className="mt-5 border-t border-black/10 md:mt-6">
        {services.map(([label, price]) => (
          <div
            key={label}
            data-price-row
            className="flex items-center justify-between gap-8 border-b border-black/10 py-2 font-seasons text-[15px] leading-normal text-desc sm:text-[16px] xl:text-[18px]"
          >
            <dt className="text-pretty">{label}</dt>
            <dd className="shrink-0 font-semibold text-title">{price}</dd>
          </div>
        ))}
      </dl>
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
      aria-labelledby="price-nails-title"
      className="relative left-1/2 grid w-screen -translate-x-1/2 bg-[#d7da95] lg:min-h-[720px] lg:grid-cols-[49.42%_50.58%] xl:min-h-[760px]"
    >
      <div className="flex items-center px-6 py-12 sm:px-10 lg:px-12 lg:py-10 xl:px-[5.79vw] xl:py-12">
        <div className="mx-auto w-full max-w-[645px] lg:mx-0">
          <div data-price-intro>
            <p className="font-seasons text-[13px] uppercase tracking-[0.16em] text-accent sm:text-[14px]">
              La carte
            </p>
            <h2
              id="price-nails-title"
              className="mt-3 max-w-[520px] text-balance font-ahsing text-[34px] leading-[0.92] text-title sm:text-[40px] xl:text-[46px]"
            >
              Des prestations pensées pour vos envies
            </h2>
            <p className="mt-3 max-w-[520px] text-pretty font-seasons text-[15px] leading-relaxed text-desc sm:text-[16px]">
              De la pose naturelle aux détails les plus créatifs, choisissez
              la prestation qui vous ressemble.
            </p>
          </div>

          <div className="mt-8">
            <PriceList title="Ongles" services={nailServices} />
          </div>
          <div className="mt-10 lg:mt-12 xl:mt-14">
            <PriceList title="Nail art" services={nailArtServices} />
          </div>

          <div
            data-price-cta
            className="mt-7 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between"
          >
            <p className="font-seasons text-[15px] italic text-desc md:text-[16px] xl:text-[18px]">
              Sur rendez-vous uniquement
            </p>
            <PinkButton
              href="https://www.instagram.com/maisondesmuses_julia/"
              className="min-h-12 w-full border-0 pl-5 pr-[18px] shadow-[0_0_0_1px_rgba(0,0,0,0.05),0_8px_20px_rgba(238,94,138,0.18)] duration-150 hover:scale-[1.02] active:scale-[0.96] sm:w-auto"
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
      </div>

      <div
        ref={imageRef}
        className="relative min-h-[52vh] overflow-hidden lg:min-h-0"
      >
        <Image
          src="/images/nails/nails-price.webp"
          alt="Manucure ornée de détails dorés dans les tons bordeaux, nude et vert"
          fill
          sizes="(min-width: 1024px) 51vw, 100vw"
          className="object-cover"
          quality={75}
        />
        <div className="pointer-events-none absolute inset-0 outline outline-1 -outline-offset-1 outline-black/10" />
      </div>
    </section>
  );
}
