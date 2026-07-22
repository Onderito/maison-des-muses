import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(SplitText, ScrollTrigger);

type AboutMeRefs = {
  section: HTMLElement | null;
  title: HTMLHeadingElement | null;
  intro: HTMLParagraphElement | null;
  horizontal: HTMLDivElement | null;
  track: HTMLDivElement | null;
};

export function createAboutMeAnimation(refs: AboutMeRefs) {
  const { section, title, intro, horizontal, track } = refs;
  if (!section || !title || !horizontal || !track) return () => {};

  const split = new SplitText(title, { type: "words" });
  const ctx = gsap.context(() => {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: title,
          start: "top 80%",
          once: true,
        },
      })
      .from(split.words, {
        opacity: 0,
        y: -60,
        duration: 0.8,
        stagger: 0.07,
        ease: "power3.out",
      })
      .from(intro, { opacity: 0, y: 24, duration: 0.6 }, "-=0.4");

    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      const panels = gsap.utils.toArray<HTMLElement>("[data-about-panel]");
      const headingSplits: SplitText[] = [];
      const horizontalTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: horizontal,
          start: "top top",
          end: () => `+=${(track.scrollWidth - window.innerWidth) * 0.8}`,
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      horizontalTimeline.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth),
        ease: "none",
        duration: panels.length - 1,
      });

      panels.forEach((panel, index) => {
        const label = panel.querySelector<HTMLElement>("[data-about-label]");
        const copy = panel.querySelector<HTMLElement>("[data-about-copy]");
        const note = panel.querySelector<HTMLElement>("[data-about-note]");
        const media = panel.querySelector<HTMLElement>("[data-about-media]");
        const vine = panel.querySelector<HTMLElement>("[data-about-vine]");
        const heading = copy?.querySelector<HTMLElement>("h3");
        const headingSplit = heading
          ? new SplitText(heading, { type: "lines", mask: "lines" })
          : null;
        if (headingSplit) headingSplits.push(headingSplit);
        const revealAt = Math.max(index - 0.65, 0);

        if (label) {
          horizontalTimeline.from(
            label,
            { autoAlpha: 0, y: -20, duration: 0.24 },
            revealAt,
          );
        }
        if (copy) {
          horizontalTimeline.from(
            copy,
            { autoAlpha: 0, y: 20, duration: 0.3 },
            revealAt + 0.18,
          );
        }
        if (headingSplit) {
          horizontalTimeline.from(
            headingSplit.lines,
            {
              autoAlpha: 0,
              yPercent: 110,
              duration: 0.5,
              stagger: 0.1,
              ease: "power4.out",
            },
            revealAt,
          );
        }
        if (note) {
          horizontalTimeline.from(
            note,
            { autoAlpha: 0, y: 26, rotation: -3, duration: 0.35 },
            revealAt + 0.34,
          );
        }
        if (media) {
          horizontalTimeline.from(
            media,
            { autoAlpha: 0, y: 56, scale: 0.93, duration: 0.55 },
            revealAt + 0.2,
          );
        }
        if (vine) {
          const decorationMotion = [
            { xPercent: 18, rotation: 10, scale: 0.96 },
            { yPercent: 18, rotation: -10, scale: 0.92 },
            { xPercent: 18, yPercent: -8, rotation: -16, scale: 0.94 },
            { yPercent: 22, rotation: 14, scale: 0.9 },
          ][index - 1] ?? { xPercent: 20, rotation: 5, scale: 0.96 };

          horizontalTimeline.from(
            vine,
            { autoAlpha: 0, ...decorationMotion, duration: 0.65 },
            revealAt + 0.2,
          );
        }
      });

      const finalCard = section.querySelector<HTMLElement>(
        "[data-about-final-card]",
      );
      if (finalCard) {
        horizontalTimeline.from(
          finalCard.querySelectorAll("p, h3, a"),
          { autoAlpha: 0, y: 42, stagger: 0.12, duration: 0.55 },
          panels.length - 1 - 0.55,
        );
      }

      return () => {
        horizontalTimeline.kill();
        headingSplits.forEach((headingSplit) => headingSplit.revert());
      };
    });

    mm.add("(max-width: 1023px)", () => {
      gsap.utils.toArray<HTMLElement>("[data-about-panel]").forEach((panel) => {
        gsap.from(
          panel.querySelectorAll(
            "[data-about-label], [data-about-copy], [data-about-note], [data-about-media]",
          ),
          {
            autoAlpha: 0,
            y: 28,
            stagger: 0.08,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: {
              trigger: panel,
              start: "top 20%",
              once: true,
            },
          },
        );
      });
    });
  }, section);

  return () => {
    ctx.revert();
    split.revert();
  };
}
