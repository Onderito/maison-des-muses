import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(SplitText, ScrollTrigger);

type NailsIntroRefs = {
  section: HTMLElement | null;
  label: HTMLParagraphElement | null;
  title: HTMLHeadingElement | null;
  desc: HTMLParagraphElement | null;
};

export function createNailsIntroAnimation(refs: NailsIntroRefs) {
  const { section, label, title, desc } = refs;
  if (!section || !title) return () => {};

  const media = gsap.matchMedia();

  media.add("(prefers-reduced-motion: no-preference)", () => {
    const split = new SplitText(title, { type: "words" });
    const tl = gsap.timeline({
      paused: true,
      defaults: { ease: "power3.out" },
    });

    tl.set([label, title, desc], { visibility: "visible" }).from(label, {
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
      );

    const st = ScrollTrigger.create({
      trigger: section,
      start: "top 30%",
      end: () => `+=${window.innerHeight * 0.64}`,
      once: true,
      onEnter: (self) => {
        if (self.scroll() > self.start + window.innerHeight) {
          tl.progress(1);
          gsap.delayedCall(0, () => ScrollTrigger.refresh());
        } else {
          tl.play();
        }
      },
    });

    return () => {
      st.kill();
      tl.kill();
      split.revert();
    };
  });

  media.add("(prefers-reduced-motion: reduce)", () => {
    gsap.set([label, title, desc], {
      autoAlpha: 1,
      clearProps: "transform,filter",
    });
  });

  return () => media.revert();
}

type NailsScrollRefs = {
  section: HTMLElement | null;
  cards: HTMLUListElement | null;
  cardEls: HTMLLIElement[];
  content: HTMLDivElement | null;
};

export function createNailsScrollAnimation(refs: NailsScrollRefs) {
  const { section, cards, cardEls, content } = refs;
  if (!section || !cards) return () => {};

  const mm = gsap.matchMedia();

  const baseTrigger = {
    trigger: section,
    pin: true,
    pinSpacing: true,
    invalidateOnRefresh: true,
  } as const;

  mm.add(
    "(min-width: 768px) and (max-width: 1023px) and (prefers-reduced-motion: no-preference)",
    () => {
      const ctx = gsap.context(() => {
        const items = cardEls.filter(Boolean);
        const travel = () => (window.innerHeight + cards.offsetHeight) / 2;
        const scrollDistance = () =>
          Math.min(2400, Math.max(1400, cards.offsetHeight * 0.36));

        gsap.set(items, { y: travel });

        const tl = gsap.timeline({
          scrollTrigger: {
            ...baseTrigger,
            start: "top top",
            end: () => `+=${scrollDistance()}`,
            scrub: true,
            anticipatePin: 1,
          },
        });

        tl.to(items, { y: () => -travel(), ease: "none", duration: 1 }, 0);
      }, section);

      return () => ctx.revert();
    },
  );

  mm.add(
    "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
    () => {
      const ctx = gsap.context(() => {
        const items = cardEls.filter(Boolean);
        const furthestCardBottom = () =>
          Math.max(
            ...items.map((item) => item.offsetTop + item.offsetHeight),
            window.innerHeight,
          );

        gsap.set(items, { y: () => window.innerHeight });

        const tl = gsap.timeline({
          scrollTrigger: {
            ...baseTrigger,
            start: "top top",
            end: () =>
              `+=${Math.max(
                window.innerHeight * 1.6,
                furthestCardBottom() * 0.64,
              )}`,
            scrub: 0.8,
          },
        });

        tl.to(items, {
          y: (i, target) =>
            -(
              target.offsetTop +
              target.offsetHeight +
              window.innerHeight * 0.15
            ),
          ease: "none",
          duration: 1,
          stagger: 0.05,
        });
      }, section);

      return () => ctx.revert();
    },
  );

  mm.add("(prefers-reduced-motion: reduce)", () => {
    gsap.set([cards, content, ...cardEls.filter(Boolean)], {
      autoAlpha: 1,
      clearProps: "transform,filter",
    });
  });

  return () => mm.revert();
}
