import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(SplitText, ScrollTrigger);

type NailsIntroRefs = {
  section: HTMLDivElement | null;
  title: HTMLHeadingElement | null;
  desc: HTMLParagraphElement | null;
};

export function createNailsIntroAnimation(refs: NailsIntroRefs) {
  const { section, title, desc } = refs;
  if (!section || !title) return () => {};

  const split = new SplitText(title, { type: "words" });
  const tl = gsap.timeline({
    paused: true,
    defaults: { ease: "power3.out", duration: 0.9 },
  });

  tl.from(split.words, {
    opacity: 0,
    y: 50,
    rotate: 6,
    scale: 0.8,
    stagger: 0.08,
    ease: "back.out(1.7)",
    duration: 0.7,
  }).from(
    desc,
    { opacity: 0, y: 30, ease: "back.out(1.7)", duration: 0.7 },
    "-=0.4",
  );

  const st = ScrollTrigger.create({
    trigger: section,
    start: "top 80%",
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
}

type NailsScrollRefs = {
  section: HTMLDivElement | null;
  cards: HTMLDivElement | null;
  cardEls: HTMLDivElement[];
  title: HTMLHeadingElement | null;
  desc: HTMLParagraphElement | null;
};

export function createNailsScrollAnimation(refs: NailsScrollRefs) {
  const { section, cards, cardEls, title, desc } = refs;
  const mm = gsap.matchMedia();

  const baseTrigger = {
    trigger: section,
    pin: true,
    pinSpacing: true,
    invalidateOnRefresh: true,
  } as const;

  mm.add("(max-width: 1023px)", () => {
    const ctx = gsap.context(() => {
      const travel = () =>
        (window.innerHeight + (cards?.offsetHeight ?? 0)) / 2;

      gsap.set(cards, { y: travel });

      const tl = gsap.timeline({
        scrollTrigger: {
          ...baseTrigger,
          start: "top top",
          end: "+=650",
          scrub: 0.6,
        },
      });

      tl.to(cards, { y: () => -travel(), ease: "none", duration: 1 }, 0).to(
        [title, desc],
        { opacity: 0, ease: "none", duration: 0.5 },
        0,
      );
    }, section ?? undefined);

    return () => ctx.revert();
  });

  mm.add("(min-width: 1024px)", () => {
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
          start: "top center",
          end: () =>
            `+=${Math.max(window.innerHeight * 1.6, furthestCardBottom() * 0.64)}`,
          scrub: 0.8,
        },
      });

      tl.to(items, {
        y: (i, target) =>
          -(target.offsetTop + target.offsetHeight + window.innerHeight * 0.15),
        ease: "none",
        stagger: 0.045,
      }).to(
        [title, desc],
        { opacity: 0, ease: "none", duration: 0.2 },
        ">-0.3",
      );
    }, section ?? undefined);

    return () => ctx.revert();
  });

  return () => mm.revert();
}
