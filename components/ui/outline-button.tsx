"use client";

import type { ButtonHTMLAttributes } from "react";

type OutlineButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export default function OutlineButton({
  children,
  className,
  ...props
}: OutlineButtonProps) {
  return (
    <button
      className={`inline-flex items-center cursor-pointer justify-center rounded-4xl border border-border/50 bg-transparent p-2.5 font-seasons text-[16px] tracking-[-0.32px] text-desc transition-colors duration-200 ease-out hover:border-title hover:text-title ${className ?? ""}`}
      {...props}
    >
      {children}
    </button>
  );
}
