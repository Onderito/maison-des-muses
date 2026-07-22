import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

type FooterRefs = {
  container: HTMLDivElement | null;
  title: HTMLHeadingElement | null;
  desc: HTMLParagraphElement | null;
  socialMedia: HTMLDivElement | null;
  button: HTMLDivElement | null;
};

export function createFooterAnimation(refs: FooterRefs) {
  const { container, title, desc, socialMedia, button } = refs;

  if (!container) return () => {};
  const ctx = gsap.context(() => {
    const split = new SplitText(title, { type: "words" });

    const socialMediaItems = socialMedia
      ? gsap.utils.toArray(socialMedia.children)
      : [];

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top 60%",
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
        socialMediaItems,
        {
          autoAlpha: 0,
          y: 40,
          scale: 0.7,
          ease: "power2.out",
        },
        "-=0.2",
      )
      .from(
        button,
        {
          autoAlpha: 0,
          y: 40,
          scale: 0.7,
          ease: "power2.out",
          stagger: 0.02,
        },
        "-=0.2",
      );

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, container);
}
