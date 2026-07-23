"use client";

import Image from "next/image";
import { createPodcastContentAnimation } from "@/app/animations/podcast-content-gsap";
import { useRef, useLayoutEffect } from "react";

export default function PodcastContent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const greenFlowerRef = useRef<HTMLImageElement>(null);
  const pinkFlowerRef = useRef<HTMLImageElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    return createPodcastContentAnimation({
      container: containerRef.current,
      title: titleRef.current,
      desc: descRef.current,
      greenFlower: greenFlowerRef.current,
      pinkFlower: pinkFlowerRef.current,
      buttons: buttonsRef.current,
    });
  }, []);
  return (
    <div
      id="podcasts"
      ref={containerRef}
      className="relative h-[400px] w-full overflow-hidden flex justify-center items-center rounded-[52px] border-[1.5px] border-white xl:h-[460px] mt-10 mb-10"
    >
      <Image
        src="/images/podcast-bg-mds.webp"
        alt=""
        fill
        unoptimized
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
        "
        src="/images/green-flower-mds.png"
        alt=""
        width={796}
        height={833}
      />

      <Image
        ref={pinkFlowerRef}
        className="
          absolute 
          bottom-[-160px]
          md:bottom-[-200px] 
          xl:bottom-[-240px]
          right-[-140px] 
          w-[280px] 
          sm:w-[380px] 
          xl:w-[520px] 
          h-auto
          object-contain 
          rotate-[-20deg]
          pointer-events-none
        "
        src="/images/pink-flower-mds.png"
        alt=""
        width={796}
        height={995}
      />

      {/* Contenu par-dessus */}
      <div className="relative z-10 p-2">
        <div className="flex flex-col gap-4 max-w-2xl">
          <h3
            ref={titleRef}
            className="heading-3 font-ahsing text-center text-title"
          >
            Le podcast qui met les entrepreneuses à l&apos;honneur
          </h3>

          <p
            ref={descRef}
            className="card-text text-desc text-center font-seasons"
          >
            Des conversations sincères avec des femmes qui osent entreprendre :
            leurs débuts, leurs doutes et leurs plus belles victoires. À
            retrouver sur TikTok et YouTube.
          </p>
        </div>

        <div
          ref={buttonsRef}
          className="flex gap-2 justify-center items-center mt-10 font-seasons"
        >
          <a
            href="https://www.tiktok.com/@juliialeduc?lang=fr"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-black p-2 w-[120px] rounded-lg text-white flex items-center gap-2 justify-center cursor-pointer [transition-property:scale] duration-200 ease-out hover:scale-[1.03] active:scale-[0.97]"
          >
            <Image
              src="/images/tiktok-icon.webp"
              alt="Tiktok icon"
              width={20}
              height={20}
            />
            Tiktok
          </a>

          <a className="bg-[#F2F2F2] p-2 w-[120px] rounded-lg flex items-center gap-2 justify-center cursor-pointer [transition-property:scale] duration-200 ease-out hover:scale-[1.03] active:scale-[0.97]">
            <Image
              src="/images/youtubee-icon.webp"
              alt="Youtube icon"
              width={20}
              height={20}
            />
            Youtube
          </a>
        </div>
      </div>
    </div>
  );
}
