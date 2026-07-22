"use client";

import { useId, type ReactNode } from "react";

type GreenButtonProps = {
  children: ReactNode;
  className?: string;
  /** Si fourni, le bouton devient un lien (ouvre dans un nouvel onglet). */
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
};

export default function GreenButton({
  children,
  className,
  href,
  onClick,
  type = "button",
}: GreenButtonProps) {
  const filterId = useId();

  const classes = `relative inline-flex cursor-pointer items-center justify-center gap-2.5 overflow-hidden rounded-4xl border border-[color-mix(in_srgb,var(--title)_85%,white)] bg-title p-2.5 transition-[transform,filter] duration-200 ease-out hover:scale-[1.03] hover:brightness-110 active:scale-[0.97] ${className ?? ""}`;

  const content = (
    <>
      <span className="relative z-10 whitespace-nowrap font-seasons text-[16px] tracking-[-0.32px] text-white">
        {children}
      </span>
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute left-[-3.5px] top-[20px] blur-sm  w-full mix-blend-plus-lighter"
        viewBox="0 0 216.757 59.9589"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter={`url(#${filterId})`}>
          <path
            d="M21.4083 21.4588C32.6986 52.2475 142.779 34.2874 196.408 21.4588"
            stroke="white"
            strokeWidth="3"
          />
        </g>
        <defs>
          <filter
            id={filterId}
            x="-1"
            y="-1"
            width="216.757"
            height="59.9589"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur stdDeviation="10" />
          </filter>
        </defs>
      </svg>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
        className={classes}
      >
        {content}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {content}
    </button>
  );
}
