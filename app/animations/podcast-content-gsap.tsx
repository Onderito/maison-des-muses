import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type PodcastContentRefs = {
  container: HTMLDivElement | null;
  title: HTMLHeadingElement | null;
  desc: HTMLParagraphElement | null;
  greenFlower: HTMLImageElement | null;
  pinkFlower: HTMLImageElement | null;
  buttons: HTMLDivElement | null;
};

export function createPodcastContentAnimation(refs: PodcastContentRefs) {
  const { container, title, desc, greenFlower, pinkFlower, buttons } = refs;
  if (!container) return () => {};

  const ctx = gsap.context(() => {
    const buttonsArray = buttons
      ? gsap.utils.toArray<HTMLElement>(buttons.children)
      : [];

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top 90%",
        once: true,
      },
    });
    tl.from(container, {
      y: 150,
      duration: 0.8,
      autoAlpha: 0,
      scale: 0.8,
      ease: "power2.out",
    })
      .from(
        title,
        {
          autoAlpha: 0,
          y: 50,
          ease: "power2.out",
          duration: 0.7,
        },
        "-=0.03",
      )
      .from(
        desc,
        { autoAlpha: 0, y: 30, ease: "power2.out", duration: 0.7 },
        "<",
      )
      .from(
        buttonsArray,
        {
          autoAlpha: 0,
          y: 40,
          ease: "power2.out",
          duration: 0.7,
          stagger: 0.04,
        },
        "<",
      )
      .from(
        greenFlower,
        {
          autoAlpha: 0,
          y: 80,
          x: 40,
          ease: "elastic.out(0.7, 0.4)",
          duration: 2.4,
        },
        "-=0.2",
      )
      .from(
        pinkFlower,
        {
          autoAlpha: 0,
          y: 80,
          x: 40,
          ease: "elastic.out(0.7, 0.4)",
          duration: 2.4,
        },
        "<",
      );

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, container);

  return () => ctx.revert();
}
