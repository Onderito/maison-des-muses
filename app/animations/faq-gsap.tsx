import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

type FaqRefs = {
  container: HTMLDivElement | null;
  title: HTMLHeadingElement | null;
  desc: HTMLParagraphElement | null;
  leftLayout: HTMLDivElement | null;
  rightLayout: HTMLDivElement | null;
};

export function createFaqAnimation(refs: FaqRefs) {
  const { container, title, desc, leftLayout, rightLayout } = refs;

  if (!container) return () => {};
  const ctx = gsap.context(() => {
    const split = new SplitText(title, { type: "words" });

    const rightLayoutItems = rightLayout
      ? gsap.utils.toArray(rightLayout.children)
      : [];

    const tl = gsap.timeline({
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
        leftLayout,
        {
          autoAlpha: 0,
          y: 120,
          x: -100,
          scale: 0.5,
          duration: 0.6,
          ease: "power2.out",
        },
        "<0.3",
      )
      .from(
        rightLayoutItems,
        {
          autoAlpha: 0,
          y: 40,
          x: -40,
          scale: 0.7,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.02,
        },
        "<0.2",
      );

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
      ctx.revert();
      split.revert();
    };
  }, container);
}

export function setFaqClosed(el: HTMLElement | null) {
  if (!el) return;
  gsap.set(el, { height: 0, opacity: 0, overflow: "hidden" });
}

export function openFaqItem(el: HTMLElement | null) {
  if (!el) return;
  gsap.killTweensOf(el);
  gsap.to(el, {
    height: "auto",
    opacity: 1,
    duration: 0.45,
    ease: "power2.out",
  });
}

export function closeFaqItem(el: HTMLElement | null) {
  if (!el) return;
  gsap.killTweensOf(el);
  gsap.to(el, {
    height: 0,
    opacity: 0,
    duration: 0.35,
    ease: "power2.inOut",
  });
}
