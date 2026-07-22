import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(SplitText, ScrollTrigger);

if (typeof window !== "undefined") {
  if ("scrollRestoration" in window.history) {
    window.history.scrollRestoration = "manual";
  }
  window.addEventListener("load", () => ScrollTrigger.refresh());
}

type HeroIntroRefs = {
  title: HTMLHeadingElement | null;
  desc: HTMLParagraphElement | null;
  button: HTMLDivElement | null;
  image: HTMLImageElement | null;
  pinkFlower: HTMLImageElement | null;
  greenFlower: HTMLImageElement | null;
};

export function createHeroIntroAnimation(refs: HeroIntroRefs) {
  const { title, desc, button, image, pinkFlower, greenFlower } = refs;

  const split = new SplitText(title, { type: "words" });

  const tl = gsap.timeline({
    defaults: { ease: "power3.out", duration: 0.9 },

    onComplete: () => ScrollTrigger.refresh(),
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
      button,
      { opacity: 0, y: 30, ease: "back.out(1.7)", duration: 0.7 },
      "-=0.5",
    )
    .from(image, { opacity: 0, y: 50, scale: 0.75 }, "-=0.5")
    .from(
      [pinkFlower, greenFlower],
      {
        y: 200,
        x: (index) => (index === 0 ? 370 : -320),
        scale: 0.75,
        ease: "power2.inOut",
        duration: 1.2,
        stagger: 0.15,
      },
      "-=0.6",
    )
    .to(pinkFlower, {
      y: "+=24",
      rotation: -29,
      duration: 4.5,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    })
    .to(
      greenFlower,
      {
        y: "+=24",
        rotation: 10,
        duration: 4.5,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      },
      "<",
    );

  return () => {
    tl.kill();
    split.revert();
  };
}

type HeroScrollRefs = {
  hero: HTMLDivElement | null;
  image: HTMLImageElement | null;
  pinkFlower: HTMLImageElement | null;
  greenFlower: HTMLImageElement | null;
  scrollHint: HTMLDivElement | null;
};

export function createHeroScrollAnimation(refs: HeroScrollRefs) {
  const { hero, image, pinkFlower, greenFlower, scrollHint } = refs;
  if (!hero || !image) return () => {};

  const ctx = gsap.context(() => {
    gsap.set(image, { force3D: true, willChange: "transform, width, height" });

    // Position layout de l'image dans le hero. Contrairement à
    // getBoundingClientRect(), offsetTop/offsetLeft ignorent les transforms :
    // même si l'intro anime encore l'image (scale/y) au moment de la mesure
    // (refresh en bas de page, scroll immédiat), les valeurs restent justes.
    // Pendant le pin (start "top top"), le hero est calé en haut du viewport,
    // donc ces offsets = position à l'écran de l'image non transformée.
    const layoutOffset = () => {
      let el: HTMLElement | null = image;
      let top = 0;
      let left = 0;
      while (el && el !== hero) {
        top += el.offsetTop;
        left += el.offsetLeft;
        el = el.offsetParent as HTMLElement | null;
      }
      return { top, left };
    };

    const zoomTl = gsap.timeline({
      scrollTrigger: {
        trigger: hero,
        start: "top top",
        end: "+=1200",
        scrub: 0.3,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        // Pas de fastScrollEnd / preventOverlaps : ils font "sauter"
        // l'animation à la fin sur un scroll rapide.
        invalidateOnRefresh: true,
      },
    });

    zoomTl
      .to(scrollHint, { opacity: 0, duration: 0.1, ease: "none" }, 0)
      .to(
        image,
        {
          width: () => window.innerWidth,
          height: () => window.innerHeight,
          maxWidth: "none",
          x: () => -layoutOffset().left,
          y: () => -layoutOffset().top,
          borderRadius: 0,
          zIndex: 50,
          ease: "power1.out",
          duration: 0.5,
        },
        0,
      )
      .to(pinkFlower, { xPercent: 100, duration: 0.3, ease: "power1.out" }, "<")
      .to(
        greenFlower,
        { xPercent: -100, duration: 0.3, ease: "power1.out" },
        "<",
      )
      .set(image, { willChange: "auto" }, ">");
  }, hero);

  return () => ctx.revert();
}
