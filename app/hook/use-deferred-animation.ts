"use client";

import { useEffect, useRef, type RefObject } from "react";

type AnimationCleanup = void | (() => void);
type AnimationSetup = () => AnimationCleanup | Promise<AnimationCleanup>;

export default function useDeferredAnimation(
  targetRef: RefObject<Element | null>,
  setup: AnimationSetup,
  rootMargin = "75% 0px",
) {
  const setupRef = useRef(setup);

  useEffect(() => {
    setupRef.current = setup;
  }, [setup]);

  useEffect(() => {
    const target = targetRef.current;
    if (!target) return;

    let cleanup: AnimationCleanup;
    let cancelled = false;
    let started = false;
    let observer: IntersectionObserver | null = null;

    const start = async () => {
      if (started) return;
      started = true;
      observer?.disconnect();

      const animationCleanup = await setupRef.current();
      if (cancelled) {
        animationCleanup?.();
        return;
      }
      cleanup = animationCleanup;
    };

    if (!("IntersectionObserver" in window)) {
      void start();
      return () => {
        cancelled = true;
        cleanup?.();
      };
    }

    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) void start();
      },
      { rootMargin },
    );

    observer.observe(target);

    return () => {
      cancelled = true;
      observer?.disconnect();
      cleanup?.();
    };
  }, [rootMargin, targetRef]);
}
