"use client";

import Image from "next/image";
import { useRef } from "react";
import { createAboutMeAnimation } from "../animations/about-me-gsap";
import useStableLayoutAnimation from "../hook/use-stable-layout-animation";

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
    image: "/images/about-me/julia-home.webp",
    decoration: "/images/about-me/monstera.webp",
    decorationClassName:
      "-right-[18%] top-[58%] w-[62%] rotate-[8deg] sm:-right-[10%] sm:w-[48%] lg:-right-[4%] lg:top-[18%] lg:w-[30%] xl:-right-[7%] xl:-top-[8%] xl:w-[52%]",
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
    image: "/images/about-me/julia-work.webp",
    decoration: "/images/about-me/nails.webp",
    decorationClassName:
      "-right-[9%] top-[55%] w-[38%] rotate-[8deg] sm:-right-[4%] sm:w-[30%] lg:right-[1%] lg:top-[16%] lg:w-[22%] xl:-right-[10%] xl:-top-[-12%] xl:w-[34%]",
    decorationWidth: 737,
    decorationHeight: 1105,
    alt: "Un moment de soin à Maison des Muses",
    imageCaption: "Le geste au cœur du métier",
  },
  {
    label: "Entre Muses",
    title: ["Les histoires", "qui nous inspirent."],
    paragraphs: [
      "Les plus belles rencontres naissent souvent d’une simple conversation. C’est de cette envie qu’est né Entre Muses, un podcast qui donne la parole à des femmes inspirantes. Parce que derrière chaque parcours se cache une muse capable d’inspirer une autre.",
    ],
    note: "Écouter, partager,\ns’inspirer.",
    image: "/images/about-me/podcast-img-1.webp",
    decoration: "/images/about-me/microphone.webp",
    decorationClassName:
      "-right-[10%] top-[55%] w-[43%] rotate-[-8deg] sm:-right-[4%] sm:w-[34%] lg:-right-[2%] lg:top-[16%] lg:w-[27%] xl:-right-[5%] xl:-top-[6%] xl:w-[39%]",
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
    image: "/images/about-me/georges.webp",
    decoration: "/images/about-me/cushion.webp",
    decorationClassName:
      "-right-[16%] top-[48%] w-[58%] rotate-[8deg] sm:-right-[8%] sm:top-[46%] sm:w-[46%] lg:-right-[4%] lg:top-[12%] lg:w-[32%] xl:-right-[4%] xl:-top-[4%] xl:w-[46%]",
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

  useStableLayoutAnimation(() => {
    return createAboutMeAnimation({
      section: sectionRef.current,
      title: titleRef.current,
      intro: introRef.current,
      horizontal: horizontalRef.current,
      track: trackRef.current,
    });
  });

  return (
    <section id="a-propos" ref={sectionRef} className="overflow-x-clip">
      <div ref={horizontalRef}>
        <div
          ref={trackRef}
          className="flex w-full flex-col xl:w-max xl:flex-row"
        >
          <header
            data-about-panel
            className="flex min-h-[85svh] w-full shrink-0 items-center justify-center px-6 text-center sm:px-10 lg:min-h-screen xl:w-screen"
          >
            <div className="max-w-5xl">
              <h2
                ref={titleRef}
                data-scroll-intro
                className="font-ahsing text-[54px] leading-[0.88] tracking-[-0.04em] text-title md:text-[72px] lg:text-[96px] xl:text-[120px]"
              >
                Derrière Maison <br /> des Muses
              </h2>
              <p
                ref={introRef}
                data-scroll-intro
                className="mx-auto mt-7 max-w-2xl font-seasons text-[16px] leading-relaxed text-desc md:text-[18px] xl:mt-9"
              >
                Plus qu’un lieu de beauté, Maison des Muses est une histoire de
                rencontres, de créativité et de moments pensés pour vous.
              </p>
            </div>
          </header>

          {stories.map((story, index) => (
            <article
              key={story.label + index}
              data-about-panel
              className="relative flex w-full shrink-0 flex-col overflow-hidden px-5 py-16 sm:px-10 sm:py-20 lg:grid lg:min-h-[720px] lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.9fr)] lg:grid-rows-[auto_auto_auto] lg:content-center lg:gap-x-10 lg:px-12 lg:py-12 xl:block xl:h-[min(64.64vw,1117px)] xl:min-h-0 xl:w-screen xl:px-0 xl:py-0"
            >
              <p
                data-about-label
                className="relative z-10 font-seasons text-[14px] tracking-[-0.02em] text-accent lg:col-start-1 lg:row-start-1 lg:text-[16px] xl:absolute xl:left-[5.8%] xl:top-[8.95%]"
              >
                {story.label}
              </p>

              <div
                data-about-copy
                className="relative z-10 mt-7 w-full max-w-[520px] lg:col-start-1 lg:row-start-2 lg:mt-8 lg:max-w-none xl:absolute xl:left-[5.8%] xl:top-[23.55%] xl:mt-0 xl:w-[38%] xl:max-w-[625px]"
              >
                <h3 className="font-ahsing text-[38px] leading-[0.9] tracking-[-0.02em] text-title lg:text-[52px] xl:text-[56px]">
                  {story.title[0]}
                  {story.title[1] && (
                    <>
                      <br />
                      {story.title[1]}
                    </>
                  )}
                </h3>
                <div className="mt-6 space-y-4 font-seasons text-[16px] leading-[1.45] tracking-[-0.02em] text-desc lg:mt-7 lg:text-[18px] xl:mt-8 xl:space-y-0 xl:text-[18px] xl:leading-[1.32] text-pretty">
                  {story.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>

              <p
                data-about-note
                className="relative z-10 mt-6 self-end whitespace-pre-line text-right font-seasons text-[16px] italic leading-[1.05] tracking-[-0.02em] text-desc lg:col-start-1 lg:row-start-3 lg:mt-8 lg:self-start lg:text-left xl:absolute xl:left-[30.9%] xl:top-[60.7%] xl:mt-0"
              >
                {story.note}
              </p>

              <div
                data-about-media
                className="relative z-10 mx-auto mt-9 aspect-[754/701] w-full max-w-[520px] lg:col-start-2 lg:row-span-3 lg:row-start-1 lg:mt-0 lg:w-full lg:max-w-[440px] lg:self-center xl:absolute xl:left-[50.5%] xl:top-[18.7%] xl:mx-0 xl:h-[62.75%] xl:w-[43.63%] xl:max-w-none xl:aspect-auto"
              >
                <div className="absolute -left-[4%] top-[3%] h-full w-full rotate-[4deg] overflow-hidden rounded-[30px] border border-border/50 bg-white xl:-left-[6.5%] xl:top-[3.9%] xl:rotate-[5.23deg] xl:rounded-[48px]">
                  <Image
                    src={story.image}
                    alt=""
                    fill
                    unoptimized={story.image.startsWith("http")}
                    sizes="(min-width: 1280px) 44vw, (min-width: 1024px) 44vw, 88vw"
                    className="object-cover object-top"
                  />
                </div>
                <div className="relative h-full w-full overflow-hidden rounded-[30px]  bg-white xl:rounded-[48px]">
                  <Image
                    src={story.image}
                    alt={story.alt}
                    sizes="(min-width: 1024px) 44vw, 88vw"
                    quality={75}
                    fill
                    className="object-cover object-top"
                  />
                </div>
                <span className="absolute bottom-[3%] right-[2%] max-w-[88%] rounded-3xl bg-accent px-3 py-2 text-right font-ahsing text-[12px] tracking-[-0.02em] text-white sm:text-[13px] lg:text-[14px] xl:right-[1.8%] xl:text-[16px]">
                  {story.imageCaption}
                </span>
              </div>

              <Image
                data-about-img
                src={story.decoration}
                alt=""
                width={story.decorationWidth}
                height={story.decorationHeight}
                loading="eager"
                className={`pointer-events-none absolute z-20 max-w-none ${story.decorationClassName}`}
              />

              {/* {index === 0 && (
                <Image
                  src="/images/about-progress.svg"
                  alt="Progression, premier chapitre sur quatre"
                  width={60}
                  height={34}
                  className="absolute bottom-[4%] left-[47.6%] z-20 hidden h-auto w-[60px] xl:block"
                />
              )} */}
            </article>
          ))}

          <article
            data-about-panel
            data-about-final-card
            className="flex min-h-screen w-full shrink-0 items-center justify-center bg-accent px-6 py-20 text-center sm:px-10 xl:w-screen xl:py-0"
          >
            <div className="max-w-4xl">
              <p
                data-about-final-label
                className="font-seasons text-[15px] tracking-[0.14em] text-white/75 uppercase"
              >
                Maison des Muses
              </p>
              <h3
                data-about-final-title
                className="mt-8 font-ahsing text-[42px] leading-[0.9] tracking-[-0.03em] text-white md:text-[64px] lg:text-[80px] xl:text-[100px]"
              >
                Peut-être étions-nous faites pour nous rencontrer.
              </h3>
              <a
                data-about-final-cta
                href="https://www.instagram.com/maisondesmuses_julia/"
                target="_blank"
                rel="noreferrer"
                className="mt-10  inline-flex rounded-full border border-white bg-white px-7 py-3 font-seasons text-[15px] text-accent transition-transform duration-300 hover:-translate-y-1 xl:px-9 xl:py-4 xl:text-[16px]"
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
