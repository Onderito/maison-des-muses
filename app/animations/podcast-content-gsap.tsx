import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type PodcastContentRefs = {
  container: HTMLElement | null;
  label: HTMLParagraphElement | null;
  title: HTMLHeadingElement | null;
  desc: HTMLParagraphElement | null;
  greenFlower: HTMLImageElement | null;
  pinkFlower: HTMLImageElement | null;
  buttons: HTMLDivElement | null;
};

export function createPodcastContentAnimation(refs: PodcastContentRefs) {
  const { container, label, title, desc, greenFlower, pinkFlower, buttons } =
    refs;
  if (!container) return () => {};

  const ctx = gsap.context(() => {
    const buttonsArray = buttons
      ? gsap.utils.toArray<HTMLElement>(buttons.children)
      : [];
    const media = gsap.matchMedia();

    media.add("(prefers-reduced-motion: no-preference)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top 85%",
          once: true,
        },
        defaults: {
          ease: "power3.out",
        },
      });

      tl.from(container, {
        y: 48,
        duration: 0.65,
        autoAlpha: 0,
      })
        .from(
          greenFlower,
          {
            autoAlpha: 0,
            x: -48,
            y: 32,
            duration: 0.75,
          },
          "<0.05",
        )
        .from(
          pinkFlower,
          {
            autoAlpha: 0,
            x: 48,
            y: -32,
            duration: 0.75,
          },
          "<0.08",
        )
        .from(
          label,
          {
            autoAlpha: 0,
            y: 12,
            filter: "blur(4px)",
            duration: 0.45,
          },
          "-=0.45",
        )
        .from(
          title,
          {
            autoAlpha: 0,
            y: 20,
            filter: "blur(4px)",
            duration: 0.55,
          },
          "-=0.28",
        )
        .from(
          desc,
          {
            autoAlpha: 0,
            y: 12,
            filter: "blur(4px)",
            duration: 0.5,
          },
          "-=0.3",
        )
        .from(
          buttonsArray,
          {
            autoAlpha: 0,
            y: 12,
            filter: "blur(4px)",
            duration: 0.45,
            stagger: 0.1,
          },
          "-=0.25",
        );

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    });

    media.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(
        [
          container,
          label,
          title,
          desc,
          greenFlower,
          pinkFlower,
          ...buttonsArray,
        ],
        {
          autoAlpha: 1,
          clearProps: "transform,filter",
        },
      );
    });

    return () => media.revert();
  }, container);

  return () => ctx.revert();
}
