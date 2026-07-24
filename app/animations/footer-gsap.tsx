import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

type FooterRefs = {
  container: HTMLElement | null;
  title: HTMLHeadingElement | null;
  desc: HTMLParagraphElement | null;
  socialMedia: HTMLDivElement | null;
  button: HTMLDivElement | null;
};

export function createFooterAnimation(refs: FooterRefs) {
  const { container, title, desc, socialMedia, button } = refs;

  if (!container) return () => {};

  const media = gsap.matchMedia();
  const ctx = gsap.context(() => {
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const split = new SplitText(title, { type: "words" });
      const socialMediaItems = socialMedia
        ? gsap.utils.toArray(socialMedia.children)
        : [];

      const timeline = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: container,
          start: "top 72%",
          once: true,
        },
      });

      timeline
        .from(split.words, {
          opacity: 0,
          y: 20,
          filter: "blur(4px)",
          stagger: 0.08,
          duration: 0.6,
        })
        .from(
          desc,
          {
            opacity: 0,
            y: 12,
            filter: "blur(4px)",
            duration: 0.5,
          },
          "-=0.3",
        )
        .from(
          socialMediaItems,
          {
            autoAlpha: 0,
            y: 12,
            filter: "blur(4px)",
            duration: 0.45,
            stagger: 0.08,
          },
          "-=0.25",
        )
        .from(
          button,
          {
            autoAlpha: 0,
            y: 12,
            filter: "blur(4px)",
            duration: 0.45,
          },
          "-=0.2",
        );

      return () => split.revert();
    });

    media.add("(prefers-reduced-motion: reduce)", () => {
      const socialMediaItems = socialMedia
        ? gsap.utils.toArray(socialMedia.children)
        : [];

      gsap.set([title, desc, ...socialMediaItems, button], {
        autoAlpha: 1,
        clearProps: "transform,filter",
      });
    });
  }, container);

  return () => {
    media.revert();
    ctx.revert();
  };
}
