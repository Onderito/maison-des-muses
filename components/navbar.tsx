"use client";

import gsap from "gsap";
import { useLayoutEffect, useRef, useState } from "react";
import PinkButton from "./ui/pink-button";

const links = [
  { label: "A propos", href: "#a-propos" },
  { label: "Ongles", href: "#ongles" },
  { label: "Head spa", href: "#head-spa" },
  { label: "Podcasts", href: "#podcasts" },
  { label: "FAQs", href: "#faqs" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const tl = gsap.timeline();

    tl.from(navRef.current, {
      opacity: 0,
      y: -30,
      ease: "power3.out",
      duration: 0.9,
      delay: 0.1,
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <nav
      ref={navRef}
      className="relative z-[100] mx-auto flex w-full items-center justify-between gap-4 rounded-[52px] border border-white/50 bg-white/30 p-2.5 shadow-sm backdrop-blur-md md:w-[70%]"
    >
      <a
        href="#accueil"
        aria-label="Revenir à l’accueil"
        className="shrink-0 cursor-pointer whitespace-nowrap font-ahsing text-[20px] tracking-[-0.8px] text-title"
      >
        Maison des Muses
      </a>

      <ul className="hidden items-center gap-4 whitespace-nowrap font-seasons text-[18px] tracking-[-0.8px] text-desc xl:flex">
        {links.map((link) => (
          <li key={link.label}>
            <a href={link.href}>{link.label}</a>
          </li>
        ))}
      </ul>

      <div className="hidden xl:block">
        <PinkButton
          className="h-[52px]"
          href="https://www.instagram.com/maisondesmuses_julia/"
        >
          Prendre rendez-vous
        </PinkButton>
      </div>

      <button
        type="button"
        aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex h-8 w-8 shrink-0 flex-col items-center justify-center gap-1.5 xl:hidden"
      >
        <span
          className={`h-0.5 w-6 rounded-full bg-title transition-transform ${open ? "translate-y-2 rotate-45" : ""}`}
        />
        <span
          className={`h-0.5 w-6 rounded-full bg-title transition-opacity ${open ? "opacity-0" : ""}`}
        />
        <span
          className={`h-0.5 w-6 rounded-full bg-title transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute inset-x-0 top-full z-[110] mt-2 flex flex-col gap-4 rounded-[42px] border border-white/50 bg-card p-4 shadow-lg backdrop-blur-md xl:hidden">
          <ul className="flex flex-col gap-3 font-seasons text-[16px] tracking-[-0.6px] text-desc">
            {links.map((link) => (
              <li key={link.label}>
                <a href={link.href} onClick={() => setOpen(false)}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <PinkButton
            className="w-full"
            href="https://www.instagram.com/maisondesmuses_julia/"
            onClick={() => setOpen(false)}
          >
            Prendre rendez-vous
          </PinkButton>
        </div>
      )}
    </nav>
  );
}
