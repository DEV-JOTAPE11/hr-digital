"use client";

import Image from "next/image";
import { useRef } from "react";
import { VIDA } from "@/lib/site";
import { gsap } from "@/lib/gsap";
import { useGsap } from "@/lib/useGsap";

const C = 200;
const R = 160;
const GAP = 7; // graus de respiro entre os arcos

const polar = (deg: number, r = R) => {
  const a = ((deg - 90) * Math.PI) / 180;
  return [C + r * Math.cos(a), C + r * Math.sin(a)] as const;
};

const arc = (i: number) => {
  const [x1, y1] = polar(i * 90 + GAP / 2);
  const [x2, y2] = polar((i + 1) * 90 - GAP / 2);
  return `M ${x1.toFixed(2)} ${y1.toFixed(2)} A ${R} ${R} 0 0 1 ${x2.toFixed(2)} ${y2.toFixed(2)}`;
};

/**
 * MÉTODO VIDA — o ciclo em torno da empresa. A seção fica presa enquanto a
 * rolagem desenha um arco por etapa (nas cores do Google, como no Funil VIDA
 * do Instagram); no fim o anel dá a volta: cada cliente alimenta o próximo.
 */
export default function Vida() {
  const ref = useRef<HTMLElement>(null);

  useGsap(ref, (root) => {
    const arcs = gsap.utils.toArray<SVGPathElement>(".vida__arc", root);
    const nodes = gsap.utils.toArray<SVGGElement>(".vida__node", root);
    gsap.set(arcs, { strokeDashoffset: 1 });
    gsap.set(nodes, { opacity: 0.25, scale: 0.8, transformOrigin: "50% 50%" });
    root.dataset.active = "-1";

    const tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: root,
        start: "top top",
        end: () => `+=${window.innerHeight * 3}`,
        pin: ".vida__pin",
        scrub: 0.7,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const a = self.progress < 0.04 ? -1 : Math.min(3, Math.floor(self.progress * 4.4));
          if (root.dataset.active !== String(a)) root.dataset.active = String(a);
        },
      },
    });

    // cada etapa tem dois traços (brilho + linha) e um nó
    nodes.forEach((_, i) => {
      tl.to([arcs[i * 2], arcs[i * 2 + 1]], { strokeDashoffset: 0, duration: 0.8, ease: "power1.inOut" }, i * 1 + 0.1).to(
        nodes[i],
        { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(2)" },
        i * 1 + 0.1,
      );
    });
    // o ciclo fecha: o anel inteiro gira e a fênix acende
    tl.to(".vida__ring", { rotation: 360, svgOrigin: "200 200", duration: 1.2, ease: "power2.inOut" }, 4)
      .to(".vida__nodes text", { rotation: -360, svgOrigin: "0 0", duration: 1.2, ease: "power2.inOut" }, 4)
      .fromTo(".vida__core", { scale: 0.85 }, { scale: 1.08, duration: 1.2, ease: "power2.inOut" }, 4)
      .to({}, { duration: 0.4 });
  });

  return (
    <section ref={ref} id="metodo" className="vida" aria-labelledby="vida-title">
      <div className="vida__pin">
        <div className="wrap vida__grid">
          <div className="vida__head">
            <p className="eyebrow">A virada · Método VIDA</p>
            <h2 id="vida-title" className="h2 vida__title">
              O seu Google para de ser uma página parada e vira um <span className="fire-text">sistema que gira sozinho.</span>
            </h2>
          </div>

          <div className="vida__visual" aria-hidden>
            <svg className="vida__svg" viewBox="0 0 400 400">
              <defs>
                <filter id="vidaGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="6" />
                </filter>
              </defs>
              <circle cx={C} cy={C} r={R + 26} className="vida__orbit" />
              <circle cx={C} cy={C} r={R - 34} className="vida__orbit vida__orbit--in" />
              <g className="vida__ring">
                {VIDA.map((v, i) => (
                  <g key={v.letter}>
                    <path d={arc(i)} className="vida__track" />
                    <path d={arc(i)} className="vida__arc vida__arc--glow" pathLength={1} stroke={v.color} filter="url(#vidaGlow)" />
                    <path d={arc(i)} className="vida__arc" pathLength={1} stroke={v.color} />
                  </g>
                ))}
                <g className="vida__nodes">
                  {VIDA.map((v, i) => {
                    const [x, y] = polar(i * 90 + 45);
                    return (
                      <g key={v.letter} className="vida__node" transform={`translate(${x} ${y})`}>
                        <circle r="25" fill="#0b0e18" stroke={v.color} strokeWidth="3" />
                        <text textAnchor="middle" dominantBaseline="central" fill={v.color}>
                          {v.letter}
                        </text>
                      </g>
                    );
                  })}
                </g>
              </g>
            </svg>
            <div className="vida__core">
              <Image src="/brand/fenix-400.webp" alt="" width={400} height={400} sizes="(min-width: 900px) 240px, 160px" />
              <span>Funil VIDA</span>
            </div>
          </div>

          <ol className="vida__list">
            {VIDA.map((v, i) => (
              <li key={v.letter} className="vida__item" style={{ "--c": v.color } as React.CSSProperties}>
                <span className="vida__letter">{v.letter}</span>
                <div>
                  <h3>
                    <span className="vida__step">0{i + 1}</span> {v.title}
                  </h3>
                  <p>{v.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
