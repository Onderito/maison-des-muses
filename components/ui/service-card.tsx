import Image from "next/image";
import PinkButton from "./pink-button";

type ServiceCardProps = {
  image: string;
  imageAlt?: string;
  eyebrow: string;
  title: string;
  description: string;
  suitability: string;
  price: string;
  duration: string;
  features: string[];
  ctaLabel?: string;
};

function CheckIcon() {
  return (
    <svg
      className="h-[14px] w-[18px] shrink-0 text-desc"
      viewBox="0 0 16 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.75 5.25L5.417 9.75L14.75 0.75"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ServiceCard({
  image,
  imageAlt = "",
  eyebrow,
  title,
  description,
  suitability,
  price,
  duration,
  features,
  ctaLabel = "Prendre rendez-vous",
}: ServiceCardProps) {
  return (
    <article className="relative flex w-full max-w-[1120px] flex-col overflow-hidden rounded-[32px] bg-card shadow-[0_0_0_1px_rgba(0,0,0,0.06),0_2px_4px_rgba(0,0,0,0.04),0_18px_48px_rgba(74,85,5,0.12)] lg:flex-row lg:items-stretch xl:w-[calc(100vw-180px)] xl:max-w-[1020px] xl:rounded-[52px]">
      <div
        data-service-image
        className="relative h-[300px] w-full shrink-0 p-1.5 sm:h-[360px] lg:h-auto lg:w-[45%]"
      >
        <div className="relative h-full w-full overflow-hidden rounded-[26px] outline outline-1 -outline-offset-1 outline-black/10 xl:rounded-[46px]">
          <Image
            src={image}
            alt={imageAlt}
            fill
            sizes="(min-width: 1280px) 460px, (min-width: 1024px) 45vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>

      <div className="relative z-10 flex w-full flex-col p-5 sm:p-6 lg:w-[55%] lg:p-7 xl:p-8">
        <div data-service-reveal>
          <span className="inline-flex min-h-7 items-center rounded-full bg-white/45 px-3 font-seasons text-[11px] uppercase tracking-[0.12em] text-title shadow-[0_0_0_1px_rgba(0,0,0,0.05)]">
            {eyebrow}
          </span>
        </div>

        <div data-service-reveal className="mt-4">
          <h3 className="max-w-[460px] text-balance font-ahsing text-[31px] leading-[0.95] text-title sm:text-[36px]">
            {title}
          </h3>
          <p className="mt-2 max-w-[480px] text-pretty font-seasons text-[15px] leading-relaxed text-desc">
            {description}
          </p>
        </div>

        <div
          data-service-reveal
          className="mt-5 flex flex-wrap items-end gap-3"
        >
          <div>
            <p className="font-seasons text-[11px] uppercase tracking-[0.12em] text-desc">
              Tarif
            </p>
            <p className="mt-1 font-ahsing text-[42px] leading-none text-title">
              {price}
            </p>
          </div>
          <div className="mb-0.5 inline-flex min-h-10 items-center rounded-full bg-white/40 px-4 font-seasons text-[13px] text-title shadow-[0_0_0_1px_rgba(0,0,0,0.05)]">
            {duration}
          </div>
        </div>

        <p
          data-service-reveal
          className="mt-4 max-w-[480px] text-pretty font-seasons text-[13px] italic leading-relaxed text-desc"
        >
          {suitability}
        </p>

        <div data-service-reveal className="mt-5">
          <p className="font-seasons text-[12px] uppercase tracking-[0.12em] text-title">
            Ce rituel comprend
          </p>
          <ul className="mt-2.5 flex flex-col gap-1.5">
            {features.map((feature) => (
              <li key={feature} className="flex items-start gap-2.5">
                <CheckIcon />

                <span className="text-pretty font-seasons text-[14px] leading-5 text-desc">
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div data-service-reveal className="mt-auto pt-6">
          <PinkButton
            className="min-h-12 w-full duration-150 hover:scale-[1.02] active:scale-[0.96] sm:w-fit"
            href="https://www.instagram.com/maisondesmuses_julia/"
          >
            <span className="inline-flex items-center gap-2">
              {ctaLabel === "Prendre rendez-vous"
                ? "Réserver ce rituel"
                : ctaLabel}
              <svg
                aria-hidden="true"
                viewBox="0 0 16 16"
                className="size-3.5"
                fill="none"
              >
                <path
                  d="M3.5 8h9m0 0-3.5-3.5M12.5 8 9 11.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </PinkButton>
        </div>
      </div>

      <Image
        className="pointer-events-none absolute -bottom-14 -right-14 hidden w-[220px] -rotate-30 opacity-80 xl:block"
        src="/images/little-flower.webp"
        alt=""
        width={500}
        height={500}
      />
    </article>
  );
}
