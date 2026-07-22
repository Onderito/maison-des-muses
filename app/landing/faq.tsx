"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import {
  closeFaqItem,
  openFaqItem,
  setFaqClosed,
  createFaqAnimation,
} from "../animations/faq-gsap";

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const panelsRef = useRef<(HTMLDivElement | null)[]>([]);
  const prevIndexRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const leftLayoutRef = useRef<HTMLDivElement>(null);
  const rightLayoutRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    return createFaqAnimation({
      container: containerRef.current,
      title: titleRef.current,
      desc: descRef.current,
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
  return (
    <div
      ref={containerRef}
      className="flex flex-col gap-4 items-center justify-center xl:items-start relative"
    >
      <h2
        ref={titleRef}
        className="heading-2 text-title text-center xl:text-start"
      >
        Une question ? <br /> On vous dit tout
      </h2>
      <p
        ref={descRef}
        className="body-text text-desc font-seasons text-center xl:text-start"
      >
        Les réponses aux questions qui reviennent le plus souvent.{" "}
        <br className="hidden xl:block" /> Et s&apos;il vous en reste une,
        écrivez-moi sur Instagram.
      </p>

      <div className="flex flex-col gap-8 xl:flex-row xl:justify-between xl:w-full xl:items-start xl:mt-16">
        <div
          ref={leftLayoutRef}
          className="relative w-full h-[300px] xl:h-[600px] xl:w-1/2 overflow-hidden rounded-[28px] xl:sticky xl:top-24 border border-white/20"
        >
          <Image
            className="object-cover "
            src="/images/julia-faq.webp"
            alt="image"
            fill
            unoptimized
          />
        </div>
        <div ref={rightLayoutRef} className="flex flex-col gap-6 xl:w-1/2">
          {faqs.map((f, index) => (
            <div key={index}>
              <div
                onClick={() => toggle(index)}
                className="font-seasons flex flex-col gap-2 bg-card border border-border p-4 xl:p-8 rounded-[28px] cursor-pointer "
              >
                <div className="flex justify-between items-center">
                  <h4 className="heading-4 text-title ">{f.question}</h4>
                  <span className="text-accent font-ahsing text-[24px] font-black">
                    {openIndex === index ? "-" : "+"}
                  </span>
                </div>

                <div
                  ref={(el) => {
                    panelsRef.current[index] = el;
                  }}
                  className="overflow-hidden"
                >
                  <p className="card-text text-desc pt-4">{f.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
