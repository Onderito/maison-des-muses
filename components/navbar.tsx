"use client";

import gsap from "gsap";
import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import PinkButton from "./ui/pink-button";

const links = [
  { label: "A propos", href: "/#a-propos" },
  { label: "Ongles", href: "/#ongles" },
  { label: "Head spa", href: "/#head-spa" },
  { label: "Podcasts", href: "/#podcasts" },
  { label: "FAQs", href: "/#faqs" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const media = gsap.matchMedia();

    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        navRef.current,
        {
          autoAlpha: 0,
          y: -16,
          filter: "blur(4px)",
        },
        {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          ease: "power3.out",
          duration: 0.65,
          delay: 0.1,
        },
      );
    });

    return () => media.revert();
  }, []);

  useEffect(() => {
    if (!open) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    const closeOnOutsideClick = (event: PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) setOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    window.addEventListener("pointerdown", closeOnOutsideClick);

    return () => {
      window.removeEventListener("keydown", closeOnEscape);
      window.removeEventListener("pointerdown", closeOnOutsideClick);
    };
  }, [open]);

  return (
    <nav
      ref={navRef}
      data-gsap-intro
      aria-label="Navigation principale"
      className="relative z-[100] mx-auto w-full max-w-[1120px]"
    >
      <div className="flex w-full items-center justify-between gap-3 rounded-[28px] bg-white/50 p-2 shadow-[0_0_0_1px_rgba(255,255,255,0.72),0_8px_24px_rgba(74,85,5,0.08)] backdrop-blur-2xl backdrop-saturate-150 sm:rounded-[52px] sm:p-2.5">
        <Link
          href="/#accueil"
          aria-label="Revenir à l’accueil"
          onClick={() => setOpen(false)}
          className="inline-flex min-h-11 shrink-0 items-center whitespace-nowrap rounded-full px-2 font-ahsing text-[18px] tracking-[-0.7px] text-title outline-none transition-[color,background-color,transform] duration-200 ease-out hover:bg-white/45 focus-visible:bg-white/70 focus-visible:ring-2 focus-visible:ring-accent/60 active:scale-[0.96] sm:px-3 sm:text-[20px]"
        >
          Maison des Muses
        </Link>

        <ul className="hidden items-center gap-0.5 whitespace-nowrap font-seasons text-[16px] tracking-[-0.45px] text-desc xl:flex">
          {links.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="inline-flex min-h-11 items-center rounded-full px-3 outline-none transition-[color,background-color,transform] duration-200 ease-out hover:bg-white/50 hover:text-title focus-visible:bg-white/70 focus-visible:text-title focus-visible:ring-2 focus-visible:ring-accent/60 active:scale-[0.96]"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden xl:block">
          <PinkButton
            className="h-[52px] outline-none transition-[transform,filter,box-shadow] duration-200 focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 active:scale-[0.96]"
            href="https://www.instagram.com/maisondesmuses_julia/"
          >
            Prendre rendez-vous
          </PinkButton>
        </div>

        <button
          type="button"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen((v) => !v)}
          className="relative flex size-11 shrink-0 items-center justify-center rounded-full bg-white/40 outline-none transition-[background-color,transform] duration-200 ease-out hover:bg-white/65 focus-visible:ring-2 focus-visible:ring-accent/60 active:scale-[0.96] xl:hidden"
        >
          <span
            className={`absolute h-0.5 w-5 rounded-full bg-title transition-[transform] duration-200 ease-out ${open ? "rotate-45" : "-translate-y-1.5"}`}
          />
          <span
            className={`absolute h-0.5 w-5 rounded-full bg-title transition-[opacity,transform] duration-150 ease-out ${open ? "scale-x-50 opacity-0" : ""}`}
          />
          <span
            className={`absolute h-0.5 w-5 rounded-full bg-title transition-[transform] duration-200 ease-out ${open ? "-rotate-45" : "translate-y-1.5"}`}
          />
        </button>
      </div>

      <div
        id="mobile-navigation"
        aria-hidden={!open}
        inert={!open}
        className={`absolute inset-x-0 top-full z-[110] mt-2 flex origin-top flex-col gap-3 rounded-[28px] bg-white/45 p-2.5 shadow-[0_0_0_1px_rgba(255,255,255,0.75),0_18px_50px_rgba(74,85,5,0.14)] backdrop-blur-2xl backdrop-saturate-150 transition-[opacity,transform,filter,visibility] duration-200 ease-out motion-reduce:transform-none motion-reduce:transition-none sm:rounded-[38px] sm:p-3 xl:hidden ${
          open
            ? "visible translate-y-0 scale-100 opacity-100 blur-0"
            : "invisible -translate-y-2 scale-[0.98] opacity-0 blur-[4px]"
        }`}
      >
          <ul className="flex flex-col font-seasons text-[17px] tracking-[-0.45px] text-desc">
            {links.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-12 items-center rounded-[20px] px-4 outline-none transition-[color,background-color,transform] duration-200 ease-out hover:bg-white/55 hover:text-title focus-visible:bg-white/75 focus-visible:text-title focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent/60 active:scale-[0.96]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <PinkButton
            className="min-h-12 w-full outline-none transition-[transform,filter,box-shadow] duration-200 focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 active:scale-[0.96]"
            href="https://www.instagram.com/maisondesmuses_julia/"
            onClick={() => setOpen(false)}
          >
            Prendre rendez-vous
          </PinkButton>
      </div>
    </nav>
  );
}
