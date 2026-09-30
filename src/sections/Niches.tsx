"use client";

import Image from "next/image";
import { useRef } from "react";
import { NICHE_CARDS } from "@/lib/site";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useGsap } from "@/lib/useGsap";

const ROW_A = NICHE_CARDS.slice(0, 6);
const ROW_B = NICHE_CARDS.slice(6);

function Row({ items, reverse = false }: { items: typeof NICHE_CARDS; reverse?: boolean }) {
  // duas cópias em sequência: andar -50% volta ao ponto de partida sem emenda
  const loop = [...items, ...items];
  return (
    <div className={`marquee${reverse ? " marquee--rev" : ""}`}>
      <div className="marquee__track">
        {loop.map((c, i) => (
          <figure key={i} className="ncard" aria-hidden={i >= items.length}>
            <Image src={c.src} alt={i < items.length ? c.label : ""} width={640} height={800} sizes="(min-width: 760px) 24vw, 58vw" />
            <figcaption>{c.label}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

export default function Niches() {
  const ref = useRef<HTMLElement>(null);

  useGsap(ref, (root) => {
    const tracks = gsap.utils.toArray<HTMLElement>(".marquee__track", root);
    const tweens = tracks.map((t, i) =>
      gsap.fromTo(t, { xPercent: i % 2 ? -50 : 0 }, { xPercent: i % 2 ? 0 : -50, duration: 38, ease: "none", repeat: -1 }),
    );
    // a rolagem empurra as faixas: quanto mais rápido, mais elas correm
    let boost = 1;
    ScrollTrigger.create({
      trigger: root,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        boost = 1 + Math.min(Math.abs(self.getVelocity()) / 260, 7);
        tweens.forEach((tw) => tw.timeScale(boost));
      },
      onToggle: (self) => tweens.forEach((tw) => (self.isActive ? tw.resume() : tw.pause())),
    });
    const ease = () => {
      if (boost > 1.01) {
        boost += (1 - boost) * 0.06;
        tweens.forEach((tw) => tw.timeScale(boost));
      }
    };
    gsap.ticker.add(ease);
    return () => gsap.ticker.remove(ease);
  });

  return (
    <section ref={ref} className="niches section" aria-labelledby="niches-title">
      <div className="wrap niches__head">
        <p className="eyebrow" data-reveal>
          Para quem é
        </p>
        <h2 id="niches-title" className="h2" data-words>
          Para quem tem um negócio <span className="fire-text">de verdade.</span>
        </h2>
        <p className="lead" data-reveal>
          Donos de negócio que trabalham duro, entregam qualidade e merecem ser encontrados. Atendemos empresas de todo o Brasil.
        </p>
      </div>
      <div className="niches__rows">
        <Row items={ROW_A} />
        <Row items={ROW_B} reverse />
      </div>
    </section>
  );
}
