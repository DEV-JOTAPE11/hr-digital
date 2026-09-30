"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/* ponto único de registro: importe o gsap daqui para garantir que o
 * ScrollTrigger já esteja registrado */
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  /* no celular a barra de endereço some/aparece durante a rolagem e muda a
   * altura da janela — sem isso cada movimento dela recalcula os pins e a
   * página "pula" */
  ScrollTrigger.config({ ignoreMobileResize: true });
}

/** a curva "Apple": saída longa e macia */
export const EASE = "expo.out";

export const reducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export { gsap, ScrollTrigger };
