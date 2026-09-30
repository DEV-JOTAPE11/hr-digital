"use client";

import { useLayoutEffect, type RefObject } from "react";
import { gsap, reducedMotion } from "./gsap";

/**
 * Monta as animações de uma seção num gsap.context escopado ao `ref` — os
 * seletores dentro de `setup` só enxergam a própria seção e tudo é revertido
 * ao desmontar. Sob prefers-reduced-motion o `setup` não roda: o CSS base de
 * cada seção já entrega o estado final.
 */
export function useGsap<T extends HTMLElement>(ref: RefObject<T | null>, setup: (root: T) => void | (() => void)) {
  useLayoutEffect(() => {
    const root = ref.current;
    if (!root || reducedMotion()) return;
    root.classList.add("is-animated");
    const ctx = gsap.context(() => setup(root), root);
    return () => {
      ctx.revert();
      root.classList.remove("is-animated");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
