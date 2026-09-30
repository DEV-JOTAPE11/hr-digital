"use client";

import { useLayoutEffect } from "react";
import { gsap, ScrollTrigger, reducedMotion } from "@/lib/gsap";

/**
 * Entradas genéricas, ligadas por atributo — cada seção só marca o HTML:
 *  - [data-reveal]        sobe e aparece ao entrar na tela
 *  - [data-reveal-group]  os filhos diretos entram em cascata
 *  - [data-words]         título que acende palavra por palavra (sem pin)
 *  - [data-count]         número que conta até o valor final
 * Sem JS ou com reduced-motion, tudo já está no estado final.
 */
export default function Reveals() {
  useLayoutEffect(() => {
    if (reducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.from(el, {
          y: 44,
          opacity: 0,
          duration: 1.3,
          ease: "expo.out",
          delay: Number(el.dataset.delay ?? 0),
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal-group]").forEach((el) => {
        gsap.from(el.children, {
          y: 50,
          opacity: 0,
          duration: 1.2,
          ease: "expo.out",
          stagger: 0.09,
          scrollTrigger: { trigger: el, start: "top 86%", once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-words]").forEach((el) => {
        // quebra em palavras preservando <em>/<b> internos
        const words: HTMLElement[] = [];
        const walk = (node: Node) => {
          Array.from(node.childNodes).forEach((n) => {
            if (n.nodeType === 3) {
              const parts = (n.textContent ?? "").split(/(\s+)/);
              const frag = document.createDocumentFragment();
              parts.forEach((p) => {
                if (!p) return;
                if (/^\s+$/.test(p)) return void frag.appendChild(document.createTextNode(p));
                const s = document.createElement("span");
                s.className = "w";
                s.textContent = p;
                words.push(s);
                frag.appendChild(s);
              });
              n.parentNode?.replaceChild(frag, n);
            } else if (n.nodeType === 1) walk(n);
          });
        };
        walk(el);
        gsap.from(words, {
          yPercent: 60,
          opacity: 0,
          filter: "blur(8px)",
          duration: 1.1,
          ease: "expo.out",
          stagger: 0.035,
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
        const to = Number(el.dataset.count);
        const obj = { v: 0 };
        el.textContent = "0";
        gsap.to(obj, {
          v: to,
          duration: 2,
          ease: "power3.out",
          onUpdate: () => void (el.textContent = String(Math.round(obj.v))),
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
        });
      });
    });
    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, []);

  return null;
}
