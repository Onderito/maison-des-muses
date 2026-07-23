"use client";

import Image from "next/image";
import GreenButton from "@/components/ui/green-button";
import { createFooterAnimation } from "../animations/footer-gsap";
import { useRef, useLayoutEffect } from "react";

const socials = [
  {
    label: "Tiktok",
    href: "https://www.tiktok.com/@juliialeduc?lang=fr",
    icon: (
      <svg
        viewBox="0 0 448 512"
        className="h-[18px] w-[18px]"
        aria-hidden="true"
      >
        <path
          fill="#000000"
          d="M448 209.9a210.1 210.1 0 0 1-122.8-39.3v178.8A162.6 162.6 0 1 1 185 188.3v89.9a74.6 74.6 0 1 0 52.2 71.2V0h88a121.2 121.2 0 0 0 1.9 22.2 122.2 122.2 0 0 0 53.9 80.2 121.4 121.4 0 0 0 67 20.1z"
        />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/maisondesmuses_julia/",
    icon: (
      <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" aria-hidden="true">
        <defs>
          <radialGradient id="ig-gradient" cx="0.3" cy="1" r="1.2">
            <stop offset="0" stopColor="#FED576" />
            <stop offset="0.26" stopColor="#F47133" />
            <stop offset="0.61" stopColor="#BC3081" />
            <stop offset="1" stopColor="#4C63D2" />
          </radialGradient>
        </defs>
        <rect
          x="2"
          y="2"
          width="20"
          height="20"
          rx="5"
          fill="url(#ig-gradient)"
        />
        <circle
          cx="12"
          cy="12"
          r="4"
          fill="none"
          stroke="#fff"
          strokeWidth="2"
        />
        <circle cx="17.5" cy="6.5" r="1.2" fill="#fff" />
      </svg>
    ),
  },
  {
    label: "Youtube",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" className="h-[16px] w-[16px]" aria-hidden="true">
        <rect x="1" y="5" width="22" height="14" rx="4" fill="#FF0000" />
        <path d="M10 8.5v7l6-3.5z" fill="#fff" />
      </svg>
    ),
  },
];

export default function Footer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const socialMediaRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    return createFooterAnimation({
      container: containerRef.current,
      title: titleRef.current,
      desc: descRef.current,
      socialMedia: socialMediaRef.current,
      button: buttonRef.current,
    });
  }, []);
  return (
    <footer
      ref={containerRef}
      className="relative w-full min-h-svh overflow-hidden"
    >
      <Image
        src="/images/footer-bg-mobile.webp"
        alt=""
        fill
        priority
        unoptimized
        sizes="100vw"
        className="object-cover xl:hidden block"
      />{" "}
      <Image
        src="/images/footer-mds.webp"
        alt=""
        fill
        priority
        unoptimized
        sizes="100vw"
        className="object-cover hidden xl:block"
      />
      {/* Contenu centré */}
      <div className="relative z-10 flex min-h-svh flex-col items-center justify-center px-4">
        <div className="flex w-full max-w-[602px] flex-col items-center gap-10">
          <div className="flex w-full flex-col items-center gap-6">
            <div className="flex w-full flex-col items-center gap-4 text-center">
              <h2
                ref={titleRef}
                className="font-ahsing text-[40px] tracking-[-1.12px] text-title md:text-[56px]"
              >
                Maison des muses
              </h2>
              <p
                ref={descRef}
                className="font-seasons text-[18px] tracking-[-0.40px] text-desc"
              >
                Là où la beauté rencontre le bien-être. Ongles, Head Spa et
                sérénité à Saint-Martin-sur-Nohain, dans un lieu pensé pour
                ralentir, respirer et prendre soin de vous
              </p>
            </div>

            <div
              ref={socialMediaRef}
              className="flex flex-wrap items-center justify-center gap-x-[17px] gap-y-2"
            >
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href === "#" ? undefined : "_blank"}
                  rel={s.href === "#" ? undefined : "noopener noreferrer"}
                  className="flex items-center gap-2 font-seasons text-[16px] tracking-[-0.32px] text-desc"
                >
                  {s.icon}
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          <div ref={buttonRef}>
            <GreenButton
              className="h-[52px]"
              href="https://www.instagram.com/maisondesmuses_julia/"
            >
              Réserver sur Instagram
            </GreenButton>
          </div>
        </div>
      </div>
      {/* Barre légale en bas */}
      <div className="absolute inset-x-0 bottom-4 z-10 flex flex-col items-center gap-1.5 px-6 text-center font-seasons text-[12px] tracking-[-0.24px] text-desc md:bottom-6 md:px-8 md:text-[14px] md:tracking-[-0.28px] xl:flex-row xl:items-end xl:justify-between xl:gap-4 xl:px-[100px] xl:text-left xl:text-[16px] xl:tracking-[-0.32px]">
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
          <a href="#">Mentions légales</a>
          <a href="#">Politique de confidentialité</a>
        </div>
        <p>© 2026 Maison des muses. Tous droits réservés</p>
      </div>
    </footer>
  );
}
