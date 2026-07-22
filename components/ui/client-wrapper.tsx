"use client";

import useLenis from "@/app/hook/use-lenis";
import { ReactNode } from "react";

interface ClientWrapperProps {
  children: ReactNode;
}

export default function ClientWrapper({ children }: ClientWrapperProps) {
  useLenis();

  return <>{children}</>;
}
