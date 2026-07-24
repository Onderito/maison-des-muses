import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

type FaqRefs = {
  container: HTMLElement | null;
  label: HTMLSpanElement | null;
  title: HTMLHeadingElement | null;
  desc: HTMLParagraphElement | null;
  cta: HTMLDivElement | null;
  leftLayout: HTMLElement | null;
  rightLayout: HTMLDivElement | null;
};

export function createFaqAnimation(refs: FaqRefs) {
  const { container, label, title, desc, cta, leftLayout, rightLayout } = refs;

  if (!container || !title) return () => {};

  const ctx = gsap.context(() => {
    const media = gsap.matchMedia();

    media.add("(prefers-reduced-motion: no-preference)", () => {
      const split = new SplitText(title, { type: "words" });
      const rightLayoutItems = rightLayout
        ? gsap.utils.toArray(rightLayout.children)
        : [];

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top 78%",
          once: true,
        },
      });

      tl.from(label, {
        opacity: 0,
        y: 12,
        filter: "blur(4px)",
        ease: "power3.out",
        duration: 0.45,
      })
        .from(
          split.words,
          {
            opacity: 0,
            y: 20,
            filter: "blur(4px)",
            stagger: 0.08,
            ease: "power3.out",
            duration: 0.65,
          },
          "-=0.2",
        )
        .from(
          desc,
          {
            opacity: 0,
            y: 12,
            filter: "blur(4px)",
            ease: "power3.out",
            duration: 0.55,
          },
          "-=0.35",
        )
        .from(
          cta,
          {
            opacity: 0,
            y: 12,
            filter: "blur(4px)",
            ease: "power3.out",
            duration: 0.5,
          },
          "-=0.35",
        )
        .from(
          leftLayout,
          {
            autoAlpha: 0,
            y: 28,
            scale: 0.97,
            duration: 0.7,
            ease: "power3.out",
          },
          "-=0.2",
        )
        .from(
          rightLayoutItems,
          {
            autoAlpha: 0,
            y: 20,
            filter: "blur(4px)",
            duration: 0.55,
            ease: "power3.out",
            stagger: 0.08,
          },
          "-=0.5",
        );

      return () => {
        split.revert();
      };
    });

    media.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(
        [
          label,
          title,
          desc,
          cta,
          leftLayout,
          ...(rightLayout?.children ?? []),
        ],
        {
          clearProps: "transform,opacity,visibility,filter",
        },
      );
    });

    return () => media.revert();
  }, container);

  return () => ctx.revert();
}

export function setFaqClosed(el: HTMLElement | null) {
  if (!el) return;
  gsap.set(el, {
    height: 0,
    opacity: 0,
    y: -6,
    filter: "blur(4px)",
    overflow: "hidden",
  });
}

export function openFaqItem(el: HTMLElement | null) {
  if (!el) return;
  gsap.killTweensOf(el);

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    gsap.set(el, {
      height: "auto",
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
    });
    ScrollTrigger.refresh();
    return;
  }

  gsap.to(el, {
    height: "auto",
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    duration: 0.4,
    ease: "power3.out",
    onComplete: () => ScrollTrigger.refresh(),
  });
}

export function closeFaqItem(el: HTMLElement | null) {
  if (!el) return;
  gsap.killTweensOf(el);

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    gsap.set(el, {
      height: 0,
      opacity: 0,
      y: 0,
      filter: "blur(0px)",
    });
    ScrollTrigger.refresh();
    return;
  }

  gsap.to(el, {
    height: 0,
    opacity: 0,
    y: -6,
    filter: "blur(4px)",
    duration: 0.25,
    ease: "power2.inOut",
    onComplete: () => ScrollTrigger.refresh(),
  });
}
