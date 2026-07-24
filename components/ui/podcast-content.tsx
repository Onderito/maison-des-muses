"use client";

import Image from "next/image";
import useDeferredAnimation from "@/app/hook/use-deferred-animation";
import { useRef } from "react";

export default function PodcastContent() {
  const containerRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const greenFlowerRef = useRef<HTMLImageElement>(null);
  const pinkFlowerRef = useRef<HTMLImageElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useDeferredAnimation(containerRef, async () => {
    const { createPodcastContentAnimation } = await import(
      "@/app/animations/podcast-content-gsap"
    );
    return createPodcastContentAnimation({
      container: containerRef.current,
      label: labelRef.current,
      title: titleRef.current,
      desc: descRef.current,
      greenFlower: greenFlowerRef.current,
      pinkFlower: pinkFlowerRef.current,
      buttons: buttonsRef.current,
    });
  });
  return (
    <section
      id="podcasts"
      ref={containerRef}
      aria-labelledby="podcast-title"
      className="relative my-10 flex min-h-[440px] w-full items-center justify-center overflow-hidden rounded-[52px] outline outline-1 -outline-offset-1 outline-black/10 shadow-[0_0_0_1px_rgba(0,0,0,0.04),0_2px_4px_rgba(0,0,0,0.04),0_18px_48px_rgba(0,0,0,0.08)] sm:min-h-[460px] xl:min-h-[520px]"
    >
      <Image
        src="/images/podcast-bg-mds.webp"
        alt=""
        fill
        sizes="(min-width: 1280px) calc(100vw - 96px), (min-width: 768px) calc(100vw - 64px), calc(100vw - 32px)"
        className="object-cover"
      />

      {/* Fleurs décoratives */}
      <Image
        ref={greenFlowerRef}
        className="
          absolute 
          bottom-[-140px] 
          md:bottom-[-160px]
          xl:bottom-[-180px]
          left-[-140px] 
          w-[300px] 
          sm:w-[380px] 
          xl:w-[520px] 
          h-auto
          object-contain 
          pointer-events-none
          z-[2]
        "
        src="/images/green-flower.webp"
        alt=""
        width={796}
        height={833}
      />

      <Image
        ref={pinkFlowerRef}
        className="
          absolute 
          top-[-170px]
          sm:top-[-230px]
          xl:top-[-310px]
          right-[-120px]
          sm:right-[-130px]
          xl:right-[-150px]
          w-[280px] 
          sm:w-[380px] 
          xl:w-[520px] 
          h-auto
          object-contain 
          rotate-[-15deg]
          pointer-events-none
          z-[2]
        "
        src="/images/pink-flower.webp"
        alt=""
        width={796}
        height={995}
      />

      {/* Contenu par-dessus */}
      <div className="relative z-10 flex w-full flex-col items-center px-6 py-14 sm:px-10 xl:px-16 xl:py-16">
        <p
          ref={labelRef}
          className="font-seasons text-[13px] uppercase tracking-[0.16em] text-accent sm:text-[14px]"
        >
          Entre Muses
        </p>

        <div className="flex max-w-2xl flex-col items-center">
          <h2
            id="podcast-title"
            ref={titleRef}
            className="mt-4 max-w-[760px] text-balance text-center font-ahsing text-[38px] leading-[0.92] tracking-[-0.025em] text-title sm:text-[46px] xl:text-[52px]"
          >
            Le podcast qui met les entrepreneuses à l&apos;honneur
          </h2>

          <p
            ref={descRef}
            className="mt-5 max-w-[560px] text-pretty text-center font-seasons text-[15px] leading-relaxed text-desc sm:text-[17px] xl:text-[18px]"
          >
            Des conversations sincères avec des femmes qui osent entreprendre :
            leurs débuts, leurs doutes et leurs plus belles victoires. À
            retrouver dès maintenant sur TikTok, et bientôt sur YouTube.
          </p>
        </div>

        <div
          ref={buttonsRef}
          className="mt-8 flex flex-col items-center justify-center gap-3 font-seasons sm:flex-row"
        >
          <a
            href="https://www.tiktok.com/@juliialeduc?lang=fr"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 min-w-[154px] cursor-pointer items-center justify-center gap-2 rounded-full bg-black pl-4 pr-3.5 text-white shadow-[0_8px_20px_rgba(0,0,0,0.16)] transition-[scale,box-shadow] duration-150 ease-out hover:scale-[1.02] hover:shadow-[0_10px_24px_rgba(0,0,0,0.2)] active:scale-[0.96] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            <Image
              src="/images/tiktok-icon.webp"
              alt="tiktok icon"
              width={20}
              height={20}
            />
            <span className="text-sm">TikTok</span>
            <svg
              aria-hidden="true"
              viewBox="0 0 16 16"
              className="ml-px size-3.5"
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
          </a>

          <span
            aria-disabled="true"
            className="inline-flex h-12 min-w-[194px] items-center justify-center gap-2 rounded-full bg-white/75 px-4 text-title shadow-[0_6px_18px_rgba(0,0,0,0.08)] backdrop-blur-md"
          >
            <Image
              src="/images/youtubee-icon.webp"
              alt="youtube icon"
              width={20}
              height={20}
            />
            <span className="text-sm">YouTube</span>
            <span className="rounded-full bg-accent/10 px-2 py-0.5 text-[10px] uppercase tracking-[0.08em] text-accent">
              Bientôt
            </span>
          </span>
        </div>
      </div>
    </section>
  );
}
