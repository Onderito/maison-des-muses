"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";

import { createAboutMeAnimation } from "../animations/about-me-gsap";
import GreenButton from "@/components/ui/green-button";

type Story = {
  label: string;
  title: [string, string?];
  paragraphs: string[];
  note: string;
  image: string;
  decoration: string;
  decorationClassName: string;
  decorationWidth: number;
  decorationHeight: number;
  alt: string;
  imageCaption: string;
};

const stories: Story[] = [
  {
    label: "Mon histoire",
    title: ["Enchantée, moi", "c’est Julia."],
    paragraphs: [
      "Maison des Muses est née d’un cheminement personnel. Pendant plusieurs années, j’ai travaillé dans le salariat. Même si cette expérience m’a beaucoup appris, je ressentais qu’il me manquait quelque chose.",
      "J’avais besoin de créer, de donner du sens à mon travail et de me sentir pleinement épanouie dans ce que je faisais au quotidien.",
    ],
    note: "Après quelques détours…\nme voilà.",
    image: "/images/test-julia.webp",
    decoration: "/images/monstera.webp",
    decorationClassName: "-right-[7%] -top-[4%] w-[52%] rotate-[8deg] lg:block",
    decorationWidth: 1241,
    decorationHeight: 827,
    alt: "Julia, fondatrice de Maison des Muses",
    imageCaption: "Julia · fondatrice de Maison des Muses",
  },
  {
    label: "Créer, prendre soin",
    title: ["Une évidence", "depuis toujours."],
    paragraphs: [
      "Créer de mes mains et prendre soin des autres ont toujours été deux évidences pour moi. C’est dans l’univers de l’onglerie que j’ai trouvé un métier qui me ressemblait.",
      "Un métier où la créativité, la précision et le contact humain se rencontrent.",
    ],
    note: "Tout commence\npar une attention.",
    image: "/images/georges.webp",
    decoration: "/images/nails.webp",
    decorationClassName: "-right-[2%] -top-[4%] w-[34%] rotate-[8deg] lg:block",
    decorationWidth: 737,
    decorationHeight: 1105,
    alt: "Un moment de soin à Maison des Muses",
    imageCaption: "Le geste au cœur du métier",
  },
  {
    label: "Entre Muses",
    title: ["Les histoires", "qui nous inspirent."],
    paragraphs: [
      "Les plus belles rencontres naissent souvent d’une simple conversation. C’est de cette envie qu’est né Entre Muses, un podcast qui donne la parole à des femmes inspirantes.",
      "Parce que derrière chaque parcours se cache une muse capable d’inspirer une autre.",
    ],
    note: "Écouter, partager,\ns’inspirer.",
    image: "/images/podcast-img-1.webp",
    decoration: "/images/microphone.webp",
    decorationClassName:
      "-right-[5%] -top-[6%] w-[39%] rotate-[-8deg] lg:block",
    decorationWidth: 737,
    decorationHeight: 1105,
    alt: "L’univers du podcast Entre Muses",
    imageCaption: "Des voix qui résonnent",
  },
  {
    label: "La maison",
    title: ["Un cocon,", "avec Georges."],
    paragraphs: [
      "J’ai aménagé cet espace à mon domicile pour qu’il devienne bien plus qu’une simple pièce : un lieu où l’on oublie le quotidien pendant quelques instants.",
      "Et vous croiserez sûrement Georges, mascotte officielle de la maison, toujours prêt à accueillir les clientes avec bonne humeur.",
    ],
    note: "Bienvenue\nchez nous.",
    image: "/images/georges.webp",
    decoration: "/images/cushion.webp",
    decorationClassName: "-right-[4%] top-[6%] w-[46%] rotate-[8deg] lg:block",
    decorationWidth: 1084,
    decorationHeight: 723,
    alt: "Le cocon de Maison des Muses",
    imageCaption: "Georges · mascotte officielle",
  },
];

export default function AboutMe() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const introRef = useRef<HTMLParagraphElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    return createAboutMeAnimation({
      section: sectionRef.current,
      title: titleRef.current,
      intro: introRef.current,
      horizontal: horizontalRef.current,
      track: trackRef.current,
    });
  }, []);

  return (
    <section ref={sectionRef} className="overflow-x-clip">
      <div ref={horizontalRef}>
        <div ref={trackRef} className="flex w-full lg:w-max">
          <header
            data-about-panel
            className="flex min-h-screen w-full shrink-0 items-center justify-center px-6 text-center sm:px-10 lg:w-screen"
          >
            <div className="max-w-5xl">
              <h2
                ref={titleRef}
                className="font-ahsing text-[54px] leading-[0.88] tracking-[-0.04em] text-title lg:text-[120px]"
              >
                Derrière Maison des Muses
              </h2>
              <p
                ref={introRef}
                className="mx-auto mt-7 max-w-2xl font-seasons text-[17px] leading-relaxed text-desc lg:mt-9 lg:text-[20px]"
              >
                Plus qu’un lieu de beauté, Maison des Muses est une histoire de
                rencontres, de créativité et de moments pensés pour vous.
              </p>
            </div>
          </header>

          {stories.map((story, index) => (
            <article
              key={story.label}
              data-about-panel
              className="relative flex min-h-[800px] w-full shrink-0 flex-col overflow-hidden px-6 pb-14 pt-20 sm:px-10 lg:block lg:h-[min(64.64vw,1117px)] lg:min-h-0 lg:w-screen lg:px-0 lg:pb-0 lg:pt-0"
            >
              <p
                data-about-label
                className="relative z-10 font-seasons text-[14px] tracking-[-0.02em] text-accent lg:absolute lg:left-[5.8%] lg:top-[8.95%] lg:text-[16px]"
              >
                {story.label}
              </p>

              <div
                data-about-copy
                className="relative z-10 mt-12 w-full max-w-[480px] lg:absolute lg:left-[5.8%] lg:top-[23.55%] lg:mt-0 lg:w-[38%] lg:max-w-[625px]"
              >
                <h3 className="font-ahsing text-[38px] leading-[0.9] tracking-[-0.02em] text-title lg:text-[42px]">
                  {story.title[0]}
                  {story.title[1] && (
                    <>
                      <br />
                      {story.title[1]}
                    </>
                  )}
                </h3>
                <div className="mt-8 space-y-0 font-seasons text-[16px] leading-[1.32] tracking-[-0.02em] text-desc lg:mt-8 lg:text-[20px]">
                  {story.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>

              <p
                data-about-note
                className="relative z-10 ml-[38%] mt-7 whitespace-pre-line font-seasons text-[16px] italic leading-[1.05] tracking-[-0.02em] text-desc lg:absolute lg:left-[30.9%] lg:top-[60.7%] lg:ml-0 lg:mt-0"
              >
                {story.note}
              </p>

              <div
                data-about-media
                className="relative z-10 ml-auto mt-8 aspect-[754/701] w-[88%] lg:absolute lg:left-[50.5%] lg:top-[18.7%] lg:mt-0 lg:h-[62.75%] lg:w-[43.63%] lg:aspect-auto"
              >
                <div className="absolute -left-[6.5%] top-[3.9%] h-full w-full rotate-[5.23deg] overflow-hidden rounded-[48px] border border-border bg-white">
                  <Image
                    src={story.image}
                    alt={story.alt}
                    fill
                    unoptimized={story.image.startsWith("http")}
                    sizes="44vw"
                    className="object-cover object-top"
                  />
                </div>
                <div className="relative h-full w-full overflow-hidden rounded-[48px] border border-border bg-white">
                  <Image
                    src={story.image}
                    alt={story.alt}
                    sizes="(min-width: 1024px) 44vw, 88vw"
                    quality={100}
                    fill
                    className="object-cover object-top"
                  />
                </div>
                <span className="absolute bottom-[3%] right-[1.8%] rounded-3xl bg-accent px-3 py-2 font-ahsing text-[13px] tracking-[-0.02em] text-white lg:text-[16px]">
                  {story.imageCaption}
                </span>
              </div>

              <Image
                data-about-vine
                src={story.decoration}
                alt=""
                width={story.decorationWidth}
                height={story.decorationHeight}
                className={`pointer-events-none absolute z-20 hidden max-w-none ${story.decorationClassName}`}
              />

              {index === 0 && (
                <Image
                  src="/images/about-progress.svg"
                  alt="Progression, premier chapitre sur quatre"
                  width={60}
                  height={34}
                  className="absolute bottom-[4%] left-[47.6%] z-20 hidden h-auto w-[60px] lg:block"
                />
              )}
            </article>
          ))}

          <article
            data-about-panel
            data-about-final-card
            className="flex min-h-screen w-full shrink-0 items-center justify-center bg-accent px-6 text-center sm:px-10 lg:w-screen"
          >
            <div className="max-w-4xl">
              <p className="font-seasons text-[15px] tracking-[0.14em] text-white/75 uppercase">
                Maison des Muses
              </p>
              <h3 className="mt-8 font-ahsing text-[52px] leading-[0.9] tracking-[-0.03em] text-white lg:text-[100px]">
                Peut-être étions-nous faites pour nous rencontrer.
              </h3>
              <a
                href="https://www.instagram.com/maisondesmuses_julia/"
                target="_blank"
                rel="noreferrer"
                className=" inline-flex rounded-full border border-white bg-white px-7 py-3 font-seasons text-[15px] text-accent transition-transform duration-300 hover:-translate-y-1 lg:px-9 lg:py-4 lg:text-[16px]"
              >
                Prendre rendez-vous
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
