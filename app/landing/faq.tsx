"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import {
  closeFaqItem,
  openFaqItem,
  setFaqClosed,
  createFaqAnimation,
} from "../animations/faq-gsap";
import GreenButton from "@/components/ui/green-button";

const faqs = [
  {
    question: "Comment prendre rendez-vous ?",
    answer:
      "Les réservations se font directement sur Instagram : envoyez un message à @maisondesmuses_julia et on trouve ensemble le créneau parfait. Les boutons du site vous y emmènent en un clic.",
  },
  {
    question: "Le head spa japonais, c'est quoi exactement ?",
    answer:
      "Un rituel bien-être venu du Japon qui associe diagnostic, massages du cuir chevelu, de la nuque et des épaules, cascade d'eau tiède et mousse détente. On en ressort la tête légère, au sens propre comme au figuré.",
  },
  {
    question: "Combien de temps dure une séance ?",
    answer:
      "Comptez 30 à 45 minutes pour L'Éveil de Thalie et environ 1 heure 30 pour Le Souffle de Calliope. Côté ongles, la durée varie selon la pose et le nail art choisi — le temps de souffler, tout simplement.",
  },
  {
    question: "Combien de temps tient une pose d'ongles ?",
    answer:
      "En moyenne 3 à 4 semaines, selon votre rythme de vie et l'entretien. Un remplissage régulier permet de garder des ongles impeccables plus longtemps.",
  },
  {
    question: "Où se trouve le salon ?",
    answer:
      "À Saint-Martin-sur-Nohain, dans un petit cocon pensé pour ralentir et souffler. L'adresse exacte vous est envoyée à la confirmation du rendez-vous.",
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const panelsRef = useRef<(HTMLDivElement | null)[]>([]);
  const prevIndexRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const leftLayoutRef = useRef<HTMLElement>(null);
  const rightLayoutRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    return createFaqAnimation({
      container: containerRef.current,
      label: labelRef.current,
      title: titleRef.current,
      desc: descRef.current,
      cta: ctaRef.current,
      leftLayout: leftLayoutRef.current,
      rightLayout: rightLayoutRef.current,
    });
  }, []);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  useLayoutEffect(() => {
    panelsRef.current.forEach(setFaqClosed);
  }, []);

  useLayoutEffect(() => {
    const prev = prevIndexRef.current;

    if (prev !== null && prev !== openIndex) {
      closeFaqItem(panelsRef.current[prev]);
    }
    if (openIndex !== null) {
      openFaqItem(panelsRef.current[openIndex]);
    }

    prevIndexRef.current = openIndex;
  }, [openIndex]);
  return (
    <section
      id="faqs"
      ref={containerRef}
      aria-labelledby="faq-title"
      className="relative"
    >
      <div className="flex flex-col items-center gap-5 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
        <div className="lg:max-w-[620px]">
          <span
            ref={labelRef}
            className="mb-3 block text-center font-seasons text-[13px] uppercase tracking-[0.14em] text-accent lg:text-start"
          >
            Avant votre venue
          </span>
          <h2
            id="faq-title"
            ref={titleRef}
            className="heading-2 text-balance text-center leading-[0.88] text-title lg:text-start"
          >
            Une question ? <br /> On vous dit tout
          </h2>
        </div>

        <div className="flex max-w-[480px] flex-col items-center gap-5 lg:items-start lg:pb-1">
          <p
            ref={descRef}
            className="body-text text-pretty text-center font-seasons text-desc lg:text-start"
          >
            Les réponses aux questions qui reviennent le plus souvent. Et
            s&apos;il vous en reste une, écrivez-moi directement.
          </p>
          <div ref={ctaRef}>
            <GreenButton
              href="https://www.instagram.com/maisondesmuses_julia/"
              className="min-h-12 px-5 outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 active:scale-[0.96]"
            >
              Posez-moi votre question
            </GreenButton>
          </div>
        </div>
      </div>

      <div className="mt-10 flex flex-col gap-8 lg:w-full lg:flex-row lg:items-start lg:justify-between lg:gap-10 xl:mt-16 xl:gap-14">
        <figure
          ref={leftLayoutRef}
          className="relative h-[300px] w-full overflow-hidden rounded-[32px] shadow-[0_0_0_1px_rgba(0,0,0,0.08),0_18px_50px_rgba(74,85,5,0.12)] md:h-[400px] lg:sticky lg:top-24 lg:h-[500px] lg:w-[48%] xl:h-[600px]"
        >
          <Image
            className="object-cover"
            src="/images/julia-faq.webp"
            alt="Julia dans le salon Maison des Muses"
            fill
            sizes="(min-width: 1024px) 48vw, 100vw"
          />
          <figcaption className="absolute bottom-4 left-4 rounded-full bg-white/70 px-4 py-2 font-seasons text-[13px] text-title shadow-[0_0_0_1px_rgba(255,255,255,0.7),0_6px_18px_rgba(0,0,0,0.08)] backdrop-blur-xl">
            Saint-Martin-sur-Nohain
          </figcaption>
        </figure>

        <div
          ref={rightLayoutRef}
          className="flex flex-col gap-3 lg:w-[52%] xl:gap-4"
        >
          {faqs.map((f, index) => (
            <article
              key={f.question}
              className={`overflow-hidden rounded-[28px] font-seasons transition-[background-color,box-shadow,transform] duration-200 ease-out ${
                openIndex === index
                  ? "bg-card shadow-[0_0_0_1px_rgba(0,0,0,0.06),0_12px_32px_rgba(74,85,5,0.1)]"
                  : "bg-white/35 shadow-[0_0_0_1px_rgba(0,0,0,0.05),0_2px_6px_rgba(74,85,5,0.04)] hover:-translate-y-0.5 hover:bg-white/50 hover:shadow-[0_0_0_1px_rgba(0,0,0,0.06),0_8px_22px_rgba(74,85,5,0.08)]"
              }`}
            >
              <button
                type="button"
                id={`faq-question-${index}`}
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
                onClick={() => toggle(index)}
                className="flex min-h-[76px] w-full cursor-pointer items-center gap-4 rounded-[28px] px-5 py-4 text-left outline-none transition-transform duration-150 ease-out focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent/60 active:scale-[0.96] xl:min-h-[88px] xl:px-7"
              >
                <span className="shrink-0 self-start pt-1 text-[12px] tracking-[0.12em] text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="heading-4 flex-1 text-balance text-title">
                  {f.question}
                </h3>
                <span
                  aria-hidden="true"
                  className="relative flex size-11 shrink-0 items-center justify-center rounded-full bg-white/55 text-accent shadow-[0_0_0_1px_rgba(0,0,0,0.05)]"
                >
                  <span
                    className={`absolute font-ahsing text-[25px] leading-none transition-[opacity,scale,filter] duration-300 ease-[cubic-bezier(0.2,0,0,1)] ${
                      openIndex === index
                        ? "scale-100 opacity-100 blur-0"
                        : "scale-[0.25] opacity-0 blur-[4px]"
                    }`}
                  >
                    −
                  </span>
                  <span
                    className={`font-ahsing text-[25px] leading-none transition-[opacity,scale,filter] duration-300 ease-[cubic-bezier(0.2,0,0,1)] ${
                      openIndex === index
                        ? "scale-[0.25] opacity-0 blur-[4px]"
                        : "scale-100 opacity-100 blur-0"
                    }`}
                  >
                    +
                  </span>
                </span>
              </button>

              <div
                id={`faq-answer-${index}`}
                role="region"
                aria-labelledby={`faq-question-${index}`}
                ref={(el) => {
                  panelsRef.current[index] = el;
                }}
                className="overflow-hidden"
              >
                <p className="card-text text-pretty px-5 pb-5 pl-[64px] text-desc xl:px-7 xl:pb-7 xl:pl-[76px]">
                  {f.answer}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
