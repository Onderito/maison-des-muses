"use client";

import { useLayoutEffect, useRef } from "react";

type AnimationCleanup = void | (() => void);

export default function useStableLayoutAnimation(
  setup: () => AnimationCleanup,
) {
  const setupRef = useRef(setup);
  const cleanupRef = useRef<(() => void) | null>(null);
  const initializedRef = useRef(false);
  const disposeFrameRef = useRef<number | null>(null);

  useLayoutEffect(() => {
    if (disposeFrameRef.current !== null) {
      cancelAnimationFrame(disposeFrameRef.current);
      disposeFrameRef.current = null;
    }

    if (!initializedRef.current) {
      const cleanup = setupRef.current();
      cleanupRef.current = typeof cleanup === "function" ? cleanup : null;
      initializedRef.current = true;
    }

    return () => {
      disposeFrameRef.current = requestAnimationFrame(() => {
        cleanupRef.current?.();
        cleanupRef.current = null;
        initializedRef.current = false;
        disposeFrameRef.current = null;
      });
    };
  }, []);
}
