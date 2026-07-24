import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(SplitText, ScrollTrigger);

type HeadSpaRefs = {
  container: HTMLElement | null;
  label: HTMLParagraphElement | null;
  title: HTMLHeadingElement | null;
  desc: HTMLParagraphElement | null;
  track: HTMLDivElement | null;
};

export function createHeadSpaAnimation(refs: HeadSpaRefs) {
  const { label, title, desc, container, track } = refs;
  if (!container || !title) return () => {};

  const split = new SplitText(title, { type: "words" });
  const cards = track ? gsap.utils.toArray<HTMLElement>(track.children) : [];
  const cardImages = cards
    .map((card) => card.querySelector<HTMLElement>("[data-service-image]"))
    .filter((element): element is HTMLElement => Boolean(element));
  const cardDetails = cards.flatMap((card) =>
    gsap.utils.toArray<HTMLElement>(
      card.querySelectorAll("[data-service-reveal]"),
    ),
  );
  const mm = gsap.matchMedia();

  mm.add("(prefers-reduced-motion: no-preference)", () => {
    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      scrollTrigger: {
        trigger: container,
        start: "top 80%",
        once: true,
      },
    });

    tl.from(label, {
      autoAlpha: 0,
      y: 12,
      filter: "blur(4px)",
      duration: 0.45,
    })
      .from(
        split.words,
        {
          autoAlpha: 0,
          y: 20,
          filter: "blur(4px)",
          stagger: 0.08,
          duration: 0.55,
        },
        "-=0.25",
      )
      .from(
        desc,
        {
          autoAlpha: 0,
          y: 12,
          filter: "blur(4px)",
          duration: 0.5,
        },
        "-=0.28",
      )
      .from(
        cards,
        {
          autoAlpha: 0,
          y: 40,
          scale: 0.98,
          stagger: 0.14,
          duration: 0.7,
        },
        "-=0.2",
      )
      .from(
        cardImages,
        {
          autoAlpha: 0,
          scale: 0.96,
          filter: "blur(4px)",
          stagger: 0.1,
          duration: 0.55,
        },
        "-=0.55",
      )
      .from(
        cardDetails,
        {
          autoAlpha: 0,
          y: 12,
          filter: "blur(4px)",
          stagger: 0.08,
          duration: 0.45,
        },
        "-=0.4",
      );

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  });

  mm.add("(prefers-reduced-motion: reduce)", () => {
    gsap.set(
      [
        label,
        ...split.words,
        desc,
        ...cards,
        ...cardImages,
        ...cardDetails,
      ],
      {
        autoAlpha: 1,
        clearProps: "transform,filter",
      },
    );
  });

  return () => {
    mm.revert();
    split.revert();
  };
}

type HeadSpaFlowerRefs = {
  section: HTMLElement | null;
  flower: HTMLImageElement | null;
};

export function createHeadSpaFlower(refs: HeadSpaFlowerRefs) {
  const { section, flower } = refs;
  if (!flower) return () => {};

  const mm = gsap.matchMedia();

  mm.add(
    "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
    () => {
      const ctx = gsap.context(() => {
        gsap.set(flower, {
          transformOrigin: "center center",
          rotation: -135,
        });

        gsap.from(flower, {
          opacity: 0,
          x: 120,
          scale: 0.94,
          filter: "blur(4px)",
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 82%", once: true },
        });

        gsap.to(flower, {
          y: "+=16",
          rotation: -131,
          duration: 6,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      }, section ?? undefined);

      return () => ctx.revert();
    },
  );

  return () => mm.revert();
}

type HeadSpaHorizontalRefs = {
  section: HTMLElement | null;
  wrapper: HTMLDivElement | null;
  track: HTMLDivElement | null;
};

export function createHeadSpaHorizontalScroll(refs: HeadSpaHorizontalRefs) {
  const { section, wrapper, track } = refs;

  const mm = gsap.matchMedia();

  mm.add(
    "(min-width: 1280px) and (prefers-reduced-motion: no-preference)",
    () => {
      const ctx = gsap.context(() => {
        if (!section || !wrapper || !track) return;

        const getScrollAmount = () =>
          Math.max(0, track.scrollWidth - wrapper.offsetWidth + 48);

        gsap.to(track, {
          x: () => -getScrollAmount(),
          ease: "none",
          force3D: true,
          scrollTrigger: {
            trigger: section,
            pin: section,
            start: "top top-=180",
            end: () => `+=${getScrollAmount()}`,
            scrub: 0.6,
            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
      }, section ?? undefined);

      return () => ctx.revert();
    },
  );

  mm.add(
    "(min-width: 1280px) and (prefers-reduced-motion: reduce)",
    () => {
      if (!track) return;

      gsap.set(track, {
        width: "auto",
        flexDirection: "column",
        alignItems: "center",
      });

      return () =>
        gsap.set(track, {
          clearProps: "width,flexDirection,alignItems",
        });
    },
  );

  return () => {
    mm.revert();
  };
}
