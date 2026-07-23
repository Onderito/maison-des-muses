import Image from "next/image";
import PinkButton from "./pink-button";
import PodcastContent from "./podcast-content";

type ServiceCardProps = {
  image: string;
  imageAlt?: string;
  title: string;
  description: string;
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
  title,
  description,
  price,
  duration,
  features,
  ctaLabel = "Prendre rendez-vous",
}: ServiceCardProps) {
  return (
    <div className="relative flex flex-col items-center gap-2 xl:gap-0 overflow-hidden md:w-full xl:w-[1121px] rounded-[32px] border border-border/50 xl:rounded-[52px] bg-card  lg:flex-row lg:items-stretch ">
      <div className="relative h-[400px] w-full shrink-0 lg:h-auto lg:w-[45%] p-1.5">
        <div className="relative h-full w-full overflow-hidden rounded-[26px] xl:rounded-[46px]">
          <Image src={image} alt={imageAlt} fill className="object-cover" />
          <div className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-black/10" />
        </div>
      </div>
      <div className="relative z-10 flex w-full flex-col gap-10 p-1.5 lg:w-[50%] lg:p-8">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-2">
            <p className="font-ahsing text-[28px] text-title text-balance">
              {title}
            </p>
            <p className="font-seasons text-[16px] text-desc text-pretty">
              {description}
            </p>
            <p className="mt-6 font-seasons text-[14px] text-desc">
              <span className="font-ahsing text-[40px] text-title">
                {price}
              </span>
              <span className="font-seasons text-[14px] text-title">/</span>{" "}
              {duration}
            </p>
          </div>
          <ul className="flex flex-col gap-2">
            {features.map((feature) => (
              <li key={feature} className="flex items-center gap-2">
                <CheckIcon />
                <span className="font-seasons text-[16px] text-desc">
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <PinkButton
          className="w-full xl:w-fit"
          href="https://www.instagram.com/maisondesmuses_julia/"
        >
          {ctaLabel}
        </PinkButton>
      </div>
      <Image
        className="hidden xl:block absolute w-[250px] -bottom-15 -right-15 -rotate-30 "
        src="/images/little-flower.webp"
        alt="little pink flower"
        width={500}
        height={500}
      />
    </div>
  );
}
