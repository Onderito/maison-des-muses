import gsap from "gsap";

type PriceNailsRefs = {
  section: HTMLElement | null;
  image: HTMLDivElement | null;
};

export function createPriceNailsAnimation({ section, image }: PriceNailsRefs) {
  if (!section || !image) return () => {};

  const media = gsap.matchMedia();

  media.add("(prefers-reduced-motion: no-preference)", () => {
    let observer: IntersectionObserver | null = null;

    const ctx = gsap.context(() => {
      const intro =
        section.querySelector<HTMLElement>("[data-price-intro]");
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
          duration: 1,
        })
        .from(
          photo,
          { scale: 1.07, duration: 1.25, ease: "power2.out" },
          "<",
        )
        .from(
          intro,
          {
            autoAlpha: 0,
            y: 12,
            filter: "blur(4px)",
            duration: 0.5,
          },
          0.08,
        );

      lists.forEach((list, index) => {
        const title = list.querySelector<HTMLElement>("[data-price-title]");
        const rows = list.querySelectorAll<HTMLElement>("[data-price-row]");
        const position = index === 0 ? 0.28 : 0.58;

        timeline
          .from(
            title,
            {
              autoAlpha: 0,
              y: 12,
              filter: "blur(4px)",
              duration: 0.45,
            },
            position,
          )
          .from(
            rows,
            {
              autoAlpha: 0,
              y: 12,
              filter: "blur(4px)",
              stagger: 0.06,
              duration: 0.4,
            },
            position + 0.08,
          );
      });

      if (cta) {
        timeline.from(
          cta,
          {
            autoAlpha: 0,
            y: 12,
            filter: "blur(4px)",
            duration: 0.45,
          },
          0.78,
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
  });

  media.add("(prefers-reduced-motion: reduce)", () => {
    gsap.set(
      section.querySelectorAll(
        "[data-price-intro], [data-price-title], [data-price-row], [data-price-cta]",
      ),
      {
        autoAlpha: 1,
        clearProps: "transform,filter",
      },
    );
    gsap.set(image, {
      autoAlpha: 1,
      clearProps: "clipPath,transform,filter",
    });
  });

  return () => media.revert();
}
