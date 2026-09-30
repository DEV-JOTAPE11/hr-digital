"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, reducedMotion } from "@/lib/gsap";

let instance: Lenis | null = null;
export const getLenis = () => instance;

/**
 * Rolagem suave (Lenis) batendo no mesmo relógio do GSAP: o ScrollTrigger lê
 * a posição no mesmo quadro em que o Lenis a atualiza, então os scrubs não
 * tremem. No toque o Lenis deixa a rolagem nativa do celular (syncTouch
 * desligado) — é ela que o polegar espera, e os pins continuam funcionando.
 */
export default function SmoothScroll() {
  useEffect(() => {
    // fontes e imagens mudam a altura das seções depois do primeiro layout
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    window.addEventListener("load", refresh);

    if (reducedMotion()) return () => window.removeEventListener("load", refresh);

    const lenis = new Lenis({ duration: 1.15, anchors: { offset: -64 } });
    instance = lenis;
    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      window.removeEventListener("load", refresh);
      gsap.ticker.remove(tick);
      gsap.ticker.lagSmoothing(500, 33);
      lenis.destroy();
      instance = null;
    };
  }, []);

  return null;
}
