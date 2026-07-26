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

  const media = gsap.matchMedia();

  media.add("(prefers-reduced-motion: no-preference)", () => {
    const split = new SplitText(title, { type: "words" });
    const layoutMedia = gsap.matchMedia();
    const ctx = gsap.context(() => {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: title,
          start: "top 80%",
          once: true,
        },
      })
      .set([title, intro], { visibility: "visible" })
      .from(split.words, {
        opacity: 0,
        y: 50,
        rotate: 6,
        scale: 0.8,
        duration: 0.7,
        stagger: 0.08,
        ease: "back.out(1.7)",
      })
      .from(
        intro,
        { opacity: 0, y: 30, duration: 0.7, ease: "back.out(1.7)" },
        "-=0.4",
      );

    const decorationMotions = [
      { xPercent: 18, rotation: 10, scale: 0.96 },
      { yPercent: 18, rotation: -10, scale: 0.92 },
      { xPercent: 18, yPercent: -8, rotation: -16, scale: 0.94 },
      { yPercent: 22, rotation: 14, scale: 0.9 },
    ];
    const getDecorationMotion = (panelIndex: number) =>
      decorationMotions[panelIndex - 1] ?? {
        xPercent: 20,
        rotation: 5,
        scale: 0.96,
      };

    layoutMedia.add("(min-width: 1280px)", () => {
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
        const img = panel.querySelector<HTMLElement>("[data-about-img]");
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
        if (img) {
          horizontalTimeline.from(
            img,
            {
              autoAlpha: 0,
              ...getDecorationMotion(index),
              duration: 0.65,
            },
            revealAt + 0.2,
          );
        }
      });

      const finalCard = section.querySelector<HTMLElement>(
        "[data-about-final-card]",
      );
      if (finalCard) {
        const finalLabel = finalCard.querySelector<HTMLElement>(
          "[data-about-final-label]",
        );
        const finalTitle = finalCard.querySelector<HTMLElement>(
          "[data-about-final-title]",
        );
        const finalCta = finalCard.querySelector<HTMLElement>(
          "[data-about-final-cta]",
        );
        const finalTitleSplit = finalTitle
          ? new SplitText(finalTitle, { type: "lines", mask: "lines" })
          : null;
        if (finalTitleSplit) headingSplits.push(finalTitleSplit);
        const finalRevealAt = panels.length - 1 - 0.55;

        if (finalLabel) {
          horizontalTimeline.from(
            finalLabel,
            { autoAlpha: 0, y: -20, duration: 0.3 },
            finalRevealAt,
          );
        }
        if (finalTitleSplit) {
          horizontalTimeline.from(
            finalTitleSplit.lines,
            {
              autoAlpha: 0,
              yPercent: 110,
              stagger: 0.1,
              duration: 0.65,
              ease: "power4.out",
            },
            finalRevealAt + 0.08,
          );
        }
        if (finalCta) {
          horizontalTimeline.from(
            finalCta,
            {
              autoAlpha: 0,
              y: 28,
              scale: 0.94,
              duration: 0.45,
              ease: "back.out(1.7)",
            },
            finalRevealAt + 0.28,
          );
        }
      }

      return () => {
        horizontalTimeline.kill();
        headingSplits.forEach((headingSplit) => headingSplit.revert());
      };
    });

    layoutMedia.add("(max-width: 1279px)", () => {
      const panels = gsap.utils.toArray<HTMLElement>("[data-about-panel]");
      const headingSplits: SplitText[] = [];
      const panelTimelines: gsap.core.Timeline[] = [];

      panels.forEach((panel, index) => {
        const label = panel.querySelector<HTMLElement>("[data-about-label]");
        const copy = panel.querySelector<HTMLElement>("[data-about-copy]");
        const note = panel.querySelector<HTMLElement>("[data-about-note]");
        const media = panel.querySelector<HTMLElement>("[data-about-media]");
        const decoration =
          panel.querySelector<HTMLElement>("[data-about-img]");
        const heading = copy?.querySelector<HTMLElement>("h3");
        const paragraphs = copy
          ? gsap.utils.toArray<HTMLElement>(copy.querySelectorAll("div > p"))
          : [];
        const headingSplit = heading
          ? new SplitText(heading, { type: "lines", mask: "lines" })
          : null;

        if (!label && !headingSplit && !paragraphs.length && !note && !media) {
          return;
        }
        if (headingSplit) headingSplits.push(headingSplit);

        const panelTimeline = gsap.timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: {
            trigger: panel,
            start: "top 78%",
            once: true,
          },
        });
        panelTimelines.push(panelTimeline);

        if (label) {
          panelTimeline.from(label, {
            autoAlpha: 0,
            y: -20,
            duration: 0.35,
          });
        }
        if (headingSplit) {
          panelTimeline.from(
            headingSplit.lines,
            {
              autoAlpha: 0,
              yPercent: 110,
              duration: 0.65,
              stagger: 0.1,
              ease: "power4.out",
            },
            label ? "<0.08" : 0,
          );
        }
        if (paragraphs.length) {
          panelTimeline.from(
            paragraphs,
            {
              autoAlpha: 0,
              y: 22,
              duration: 0.5,
              stagger: 0.1,
            },
            headingSplit ? "<0.2" : "<0.08",
          );
        }
        if (note) {
          panelTimeline.from(
            note,
            {
              autoAlpha: 0,
              y: 26,
              rotation: -3,
              duration: 0.45,
            },
            ">-0.18",
          );
        }
        if (media) {
          panelTimeline.from(
            media,
            {
              autoAlpha: 0,
              y: 56,
              scale: 0.93,
              duration: 0.65,
            },
            ">-0.12",
          );
        }
        if (decoration) {
          panelTimeline.from(
            decoration,
            {
              autoAlpha: 0,
              ...getDecorationMotion(index),
              duration: 0.7,
            },
            media ? "<0.08" : ">-0.12",
          );
        }
      });

      const finalCard = section.querySelector<HTMLElement>(
        "[data-about-final-card]",
      );
      if (finalCard) {
        const finalLabel = finalCard.querySelector<HTMLElement>(
          "[data-about-final-label]",
        );
        const finalTitle = finalCard.querySelector<HTMLElement>(
          "[data-about-final-title]",
        );
        const finalCta = finalCard.querySelector<HTMLElement>(
          "[data-about-final-cta]",
        );
        const finalTitleSplit = finalTitle
          ? new SplitText(finalTitle, { type: "lines", mask: "lines" })
          : null;
        if (finalTitleSplit) headingSplits.push(finalTitleSplit);

        const finalTimeline = gsap.timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: {
            trigger: finalTitle ?? finalCard,
            start: "top 85%",
            once: true,
          },
        });
        if (finalLabel) {
          finalTimeline.from(finalLabel, {
            autoAlpha: 0,
            y: -20,
            duration: 0.4,
          });
        }
        if (finalTitleSplit) {
          finalTimeline.from(
            finalTitleSplit.lines,
            {
              autoAlpha: 0,
              yPercent: 110,
              stagger: 0.12,
              duration: 0.75,
              ease: "power4.out",
            },
            "<0.1",
          );
        }
        if (finalCta) {
          finalTimeline.from(
            finalCta,
            {
              autoAlpha: 0,
              y: 30,
              scale: 0.92,
              duration: 0.55,
              ease: "back.out(1.7)",
            },
            ">-0.2",
          );
        }
        panelTimelines.push(finalTimeline);
      }

      return () => {
        panelTimelines.forEach((timeline) => timeline.kill());
        headingSplits.forEach((headingSplit) => headingSplit.revert());
      };
    });
    }, section);

    return () => {
      layoutMedia.revert();
      ctx.revert();
      split.revert();
    };
  });

  media.add("(prefers-reduced-motion: reduce)", () => {
    gsap.set(
      section.querySelectorAll(
        "[data-about-panel], [data-about-label], [data-about-copy], [data-about-note], [data-about-media], [data-about-img], [data-about-final-label], [data-about-final-title], [data-about-final-cta]",
      ),
      {
        autoAlpha: 1,
        clearProps: "transform,filter",
      },
    );
    gsap.set(track, {
      clearProps: "transform",
    });
  });

  return () => media.revert();
}
