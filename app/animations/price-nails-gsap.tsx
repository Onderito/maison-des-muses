import gsap from "gsap";

type PriceNailsRefs = {
  section: HTMLElement | null;
  image: HTMLDivElement | null;
};

export function createPriceNailsAnimation({ section, image }: PriceNailsRefs) {
  if (!section || !image) return () => {};

  let observer: IntersectionObserver | null = null;

  const ctx = gsap.context(() => {
    const lists = section.querySelectorAll<HTMLElement>("[data-price-list]");
    const cta = section.querySelector<HTMLElement>("[data-price-cta]");
    const photo = image.querySelector("img");

    const timeline = gsap.timeline({
      paused: true,
      defaults: { ease: "power3.out" },
    });

    timeline
      .from(image, {
        autoAlpha: 0,
        clipPath: "inset(0 0 0 100%)",
        duration: 1.1,
      })
      .from(
        photo,
        { scale: 1.12, duration: 1.4, ease: "power2.out" },
        "<",
      );

    lists.forEach((list, index) => {
      const title = list.querySelector<HTMLElement>("[data-price-title]");
      const rows = list.querySelectorAll<HTMLElement>("[data-price-row]");
      const position = index === 0 ? 0.12 : 0.42;

      timeline
        .from(
          title,
          { autoAlpha: 0, y: 24, duration: 0.55 },
          position,
        )
        .from(
          rows,
          { autoAlpha: 0, x: -28, stagger: 0.07, duration: 0.45 },
          position + 0.12,
        );
    });

    if (cta) {
      timeline.from(
        cta,
        { autoAlpha: 0, y: 20, duration: 0.5 },
        0.72,
      );
    }

    observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        timeline.play();
        observer?.disconnect();
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -8% 0px",
      },
    );

    observer.observe(section);
  }, section);

  return () => {
    observer?.disconnect();
    ctx.revert();
  };
}
