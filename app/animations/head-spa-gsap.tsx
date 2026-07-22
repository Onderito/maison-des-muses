import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(SplitText, ScrollTrigger);

type HeadSpaRefs = {
  container: HTMLDivElement | null;
  title: HTMLHeadingElement | null;
  desc: HTMLParagraphElement | null;
  track: HTMLDivElement | null;
};

export function createHeadSpaAnimation(refs: HeadSpaRefs) {
  const { title, desc, container, track } = refs;

  const split = new SplitText(title, { type: "words" });
  const cards = track ? gsap.utils.toArray<HTMLElement>(track.children) : [];

  const tl = gsap.timeline({
    defaults: { ease: "power3.out", duration: 0.9 },
    scrollTrigger: {
      trigger: container,
      start: "top 80%",
      once: true,
    },
  });

  tl.from(split.words, {
    opacity: 0,
    y: 50,
    rotate: 6,
    scale: 0.8,
    stagger: 0.08,
    ease: "back.out(1.7)",
    duration: 0.7,
  })
    .from(
      desc,
      { opacity: 0, y: 30, ease: "back.out(1.7)", duration: 0.7 },
      "-=0.4",
    )
    .from(
      cards,
      {
        opacity: 0,
        y: 60,
        scale: 0.96,
        stagger: 0.15,
        ease: "power3.out",
        duration: 0.8,
      },
      "-=0.3",
    );

  return () => {
    tl.scrollTrigger?.kill();
    tl.kill();
    split.revert();
  };
}

type HeadSpaFlowerRefs = {
  section: HTMLDivElement | null;
  flower: HTMLImageElement | null;
};

export function createHeadSpaFlower(refs: HeadSpaFlowerRefs) {
  const { section, flower } = refs;
  if (!flower) return () => {};

  const mm = gsap.matchMedia();

  mm.add("(min-width: 1280px)", () => {
    const ctx = gsap.context(() => {
      gsap.set(flower, { transformOrigin: "center center", rotation: -135 });

      // Entrée douce à l'arrivée sur la section.
      gsap.from(flower, {
        opacity: 0,
        scale: 0.9,
        duration: 1.3,
        ease: "power3.out",
        scrollTrigger: { trigger: section, start: "top 80%", once: true },
      });

      // Flottement continu, smooth et clean.
      gsap.to(flower, {
        y: "+=24",
        rotation: -129,
        duration: 4.5,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    }, section ?? undefined);

    return () => ctx.revert();
  });

  return () => mm.revert();
}

type HeadSpaHorizontalRefs = {
  section: HTMLDivElement | null;
  wrapper: HTMLDivElement | null;
  track: HTMLDivElement | null;
};

export function createHeadSpaHorizontalScroll(refs: HeadSpaHorizontalRefs) {
  const { section, wrapper, track } = refs;

  const mm = gsap.matchMedia();

  mm.add("(min-width: 1280px)", () => {
    const ctx = gsap.context(() => {
      if (!section || !wrapper || !track) return;

      const getScrollAmount = () =>
        Math.max(0, track.scrollWidth - wrapper.offsetWidth);

      gsap.to(track, {
        x: () => -getScrollAmount(),
        ease: "none",
        force3D: true,
        scrollTrigger: {
          trigger: section,
          pin: section,
          start: "top top",
          end: () => `+=${getScrollAmount()}`,
          scrub: 0.6,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    }, section ?? undefined);

    return () => ctx.revert();
  });

  return () => {
    mm.revert();
  };
}
