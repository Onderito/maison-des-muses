"use client";

import { useLayoutEffect, useRef } from "react";
import ServiceCard from "@/components/ui/service-card";
import Image from "next/image";
import {
  createHeadSpaAnimation,
  createHeadSpaFlower,
  createHeadSpaHorizontalScroll,
} from "../animations/head-spa-gsap";

export default function HeadSap() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const flowerRef = useRef<HTMLImageElement>(null);

  useLayoutEffect(() => {
    return createHeadSpaAnimation({
      container: sectionRef.current,
      label: labelRef.current,
      title: titleRef.current,
      desc: descRef.current,
      track: trackRef.current,
    });
  }, []);

  useLayoutEffect(() => {
    return createHeadSpaFlower({
      section: sectionRef.current,
      flower: flowerRef.current,
    });
  }, []);

  useLayoutEffect(() => {
    return createHeadSpaHorizontalScroll({
      section: sectionRef.current,
      wrapper: wrapperRef.current,
      track: trackRef.current,
    });
  }, []);

  return (
    <section
      id="head-spa"
      ref={sectionRef}
      aria-labelledby="head-spa-title"
      className="relative flex flex-col overflow-hidden"
    >
      <div className="container relative z-10 flex flex-col pb-0">
        <div className="flex flex-col items-center justify-center">
          <p
            ref={labelRef}
            className="font-seasons text-[13px] uppercase tracking-[0.16em] text-accent sm:text-[14px]"
          >
            Head Spa japonais
          </p>
          <h2
            id="head-spa-title"
            ref={titleRef}
            className="heading-2 mt-4 max-w-[720px] text-balance text-center leading-[0.88] text-title"
          >
            Un rituel pensé pour tout relâcher
          </h2>
          <p
            ref={descRef}
            className="body-text mt-5 max-w-[620px] text-pretty text-center font-seasons text-desc"
          >
            Inspiré des head spa japonais, chaque soin mêle massages
            enveloppants, vapeur et cascades d&apos;eau tiède. Choisissez
            simplement l&apos;intensité qui vous ressemble, on s&apos;occupe du
            reste.
          </p>
        </div>
      </div>

      <div
        ref={wrapperRef}
        className="relative z-10 mt-8 px-4 sm:px-8 md:px-12 xl:mt-12 xl:overflow-hidden"
      >
        <div
          ref={trackRef}
          className="mt-4 flex flex-col items-center gap-8 lg:mt-8 xl:w-max xl:flex-row xl:items-start xl:gap-8"
        >
          <ServiceCard
            image="/images/head-spa-2.webp"
            imageAlt="Rituel Head Spa L'Éveil de Thalie"
            eyebrow="Rituel découverte"
            title="L'Éveil de Thalie"
            description="Une parenthèse légère pour dénouer et respirer."
            suitability="Idéal pour découvrir le Head Spa ou s'offrir une pause essentielle."
            price="70 €"
            duration="30 à 45 minutes"
            features={[
              "Diagnostic personnalisé",
              "Massage des épaules, de la nuque, de la tête et du cuir chevelu avec différents outils",
              "Cascade d'eau tiède",
              "Mousse détente et rinçage",
            ]}
          />
          <ServiceCard
            image="/images/head-spa-1.webp"
            imageAlt="Rituel Head Spa Le Souffle de Calliope"
            eyebrow="Rituel signature"
            title="Le souffle de Calliope"
            description="Une expérience complète pour un relâchement profond."
            suitability="Idéal pour celles qui souhaitent une déconnexion longue et enveloppante."
            price="120 €"
            duration="1 h 30"
            features={[
              "Diagnostic personnalisé",
              "Massage des épaules, de la nuque, de la tête et du cuir chevelu avec différents outils",
              "Cascade d'eau tiède et vapeur enveloppante",
              "Mousse détente, rinçage et conseils post-séance",
            ]}
          />
        </div>
      </div>
      <Image
        ref={flowerRef}
        className="pointer-events-none absolute -right-24 -top-20 z-[2] hidden h-auto w-[340px] -rotate-135 opacity-90 md:block xl:-right-20 xl:-top-28 xl:w-[470px] 2xl:w-[560px]"
        src="/images/green-flower.webp"
        alt=""
        width={796}
        height={833}
        sizes="(min-width: 1536px) 560px, (min-width: 1280px) 470px, 340px"
      />
    </section>
  );
}
