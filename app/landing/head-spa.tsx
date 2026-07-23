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
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const flowerRef = useRef<HTMLImageElement>(null);

  useLayoutEffect(() => {
    return createHeadSpaAnimation({
      container: sectionRef.current,
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
    <div
      id="head-spa"
      ref={sectionRef}
      className="relative flex flex-col overflow-hidden"
    >
      <div className="container flex flex-col gap-4 pb-0">
        <div className="flex flex-col gap-4 items-center justify-center">
          <h2
            ref={titleRef}
            className="heading-2 text-center leading-[0.88] text-title"
          >
            Un rituel pensé <br /> pour tout relâcher
          </h2>
          <p
            ref={descRef}
            className="body-text text-desc font-seasons text-center"
          >
            Inspiré des head spa japonais, chaque soin mêle massages
            enveloppants et cascades d&apos;eau tiède.
            <br className="hidden md:block" /> Choisissez votre rituel, on
            s&apos;occupe du reste.
          </p>
        </div>
      </div>

      <div
        ref={wrapperRef}
        className="mt-8 px-4 sm:px-8 md:px-12 xl:px-0 xl:overflow-hidden"
      >
        <div
          ref={trackRef}
          className="flex flex-col gap-8 items-center xl:flex-row xl:items-stretch xl:w-max mt-4 lg:mt-10 xl:mt-16"
        >
          <ServiceCard
            image="/images/headspa-example.png"
            title="L'Eveil de Thalie"
            description="Une parenthèse légère pour dénouer et respirer."
            price="70€"
            duration="30 à 45 minutes"
            features={[
              "Diagnostique",
              "Massage epaule, nuque, tête cuir chevelu avec différents outils",
              "Cascade",
              "Mousse détente + rinçage",
            ]}
          />
          <ServiceCard
            image="/images/headspa-example.png"
            title="Le souffle de Calliope"
            description="Une expérience intense pour un relâchement profond"
            price="120€"
            duration="1 heure 30"
            features={[
              "Diagnostique",
              "Massage epaule, nuque, tête cuir chevelu avec différents outils",
              "Cascade",
              "Vapeur enveloppante",
              "Mousse détente + rinçage",
              "Conseils post-séance",
            ]}
          />
        </div>
      </div>
      <Image
        ref={flowerRef}
        className="hidden 2xl:block absolute w-[573px] h-[600px] -rotate-135 right-0  -top-36 z-0"
        src="/images/green-flower-mds.png"
        alt=""
        width={400}
        height={400}
      />
    </div>
  );
}
