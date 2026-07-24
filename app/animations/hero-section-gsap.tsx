import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(SplitText, ScrollTrigger);

type HeroIntroRefs = {
  label: HTMLParagraphElement | null;
  title: HTMLHeadingElement | null;
  desc: HTMLParagraphElement | null;
  button: HTMLDivElement | null;
  imageReveal: HTMLDivElement | null;
  pinkFlower: HTMLImageElement | null;
  greenFlower: HTMLImageElement | null;
};

export function createHeroIntroAnimation(refs: HeroIntroRefs) {
  const { label, title, desc, button, imageReveal, pinkFlower, greenFlower } =
    refs;
  if (!title) return () => {};

  const media = gsap.matchMedia();

  media.add("(prefers-reduced-motion: no-preference)", () => {
    const split = new SplitText(title, { type: "words" });

    gsap.set(label, {
      autoAlpha: 0,
      y: 12,
      filter: "blur(4px)",
    });
    gsap.set(title, { autoAlpha: 1 });
    gsap.set(split.words, {
      autoAlpha: 0,
      y: 20,
      filter: "blur(4px)",
    });
    gsap.set(desc, {
      autoAlpha: 0,
      y: 12,
      filter: "blur(4px)",
    });
    gsap.set(button, {
      autoAlpha: 0,
      y: 12,
      filter: "blur(4px)",
    });
    gsap.set(imageReveal, {
      autoAlpha: 0,
      y: 28,
      scale: 0.98,
      transformOrigin: "center top",
    });
    gsap.set(pinkFlower, {
      autoAlpha: 0,
      x: 120,
      y: 48,
      scale: 0.94,
    });
    gsap.set(greenFlower, {
      autoAlpha: 0,
      x: -120,
      y: 48,
      scale: 0.94,
    });

    const floating = gsap
      .timeline({ paused: true })
      .to(pinkFlower, {
        y: "+=16",
        rotation: -24,
        duration: 6,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      })
      .to(
        greenFlower,
        {
          y: "+=16",
          rotation: 5,
          duration: 6,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        },
        "<",
      );

    const intro = gsap.timeline({
      defaults: { ease: "power3.out" },
      onComplete: () => {
        floating.play();
        ScrollTrigger.refresh();
      },
    });

    intro
      .to(label, {
        autoAlpha: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.45,
      })
      .to(
        split.words,
        {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          stagger: 0.08,
          duration: 0.55,
        },
        "-=0.25",
      )
      .to(
        desc,
        {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.5,
        },
        "-=0.28",
      )
      .to(
        button,
        {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.45,
        },
        "-=0.25",
      )
      .to(
        imageReveal,
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
        },
        "-=0.28",
      )
      .to(
        pinkFlower,
        {
          autoAlpha: 1,
          x: 0,
          y: 0,
          scale: 1,
          duration: 0.8,
        },
        "-=0.3",
      )
      .to(
        greenFlower,
        {
          autoAlpha: 1,
          x: 0,
          y: 0,
          scale: 1,
          duration: 0.8,
        },
        "<0.08",
      );

    return () => {
      intro.kill();
      floating.kill();
      split.revert();
    };
  });

  media.add("(prefers-reduced-motion: reduce)", () => {
    gsap.set(
      [label, title, desc, button, imageReveal, pinkFlower, greenFlower],
      {
        autoAlpha: 1,
        clearProps: "transform,filter",
      },
    );
  });

  return () => media.revert();
}

type HeroScrollRefs = {
  hero: HTMLElement | null;
  content: HTMLDivElement | null;
  image: HTMLImageElement | null;
  pinkFlower: HTMLImageElement | null;
  greenFlower: HTMLImageElement | null;
};

export function createHeroScrollAnimation(refs: HeroScrollRefs) {
  const { hero, content, image, pinkFlower, greenFlower } = refs;
  if (!hero || !image) return () => {};

  const media = gsap.matchMedia();

  media.add(
    "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
    () => {
      const ctx = gsap.context(() => {
        gsap.set(image, {
          force3D: true,
          transformOrigin: "top left",
          willChange: "transform",
        });

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

        const viewportWidth = () => document.documentElement.clientWidth;
        const viewportHeight = () => window.innerHeight;

        const zoomTl = gsap.timeline({
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "+=1200",
            scrub: 0.3,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        zoomTl
          .to(
            content,
            {
              autoAlpha: 0,
              y: -12,
              filter: "blur(4px)",
              duration: 0.2,
              ease: "power1.in",
            },
            0,
          )
          .to(
            image,
            {
              x: () => -layoutOffset().left,
              y: () => -layoutOffset().top,
              width: viewportWidth,
              height: viewportHeight,
              borderRadius: 0,
              zIndex: 50,
              ease: "power1.out",
              duration: 0.5,
            },
            0,
          )
          .to(
            pinkFlower,
            { xPercent: 100, duration: 0.3, ease: "power1.out" },
            "<",
          )
          .to(
            greenFlower,
            { xPercent: -100, duration: 0.3, ease: "power1.out" },
            "<",
          )
          .set(image, { willChange: "auto" }, ">");
      }, hero);

      return () => ctx.revert();
    },
  );

  return () => media.revert();
}
