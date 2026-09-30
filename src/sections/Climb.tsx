"use client";

import Image from "next/image";
import { useRef } from "react";
import { CLIMB_STEPS, COMPETITORS } from "@/lib/site";
import { gsap } from "@/lib/gsap";
import { useGsap } from "@/lib/useGsap";
import { IconMic, IconSearch, IconStar } from "@/components/Icons";

const ROWS = COMPETITORS.length + 1; // concorrentes + você
const START = COMPETITORS.length; // você começa em último (7º)

const KPIS = [
  { id: "calls", label: "Ligações no mês", from: 4, to: 87 },
  { id: "routes", label: "Pedidos de rota", from: 11, to: 240 },
  { id: "reviews", label: "Avaliações", from: 8, to: 312 },
];

const fmt = (v: number) => v.toFixed(1).replace(".", ",");

function Stars({ value, className = "" }: { value: number; className?: string }) {
  return (
    <span className={`rstars ${className}`} style={{ "--fill": `${(value / 5) * 100}%` } as React.CSSProperties}>
      <span className="rstars__bg">★★★★★</span>
      <span className="rstars__fg">★★★★★</span>
    </span>
  );
}

/**
 * A SUBIDA — segunda dobra. Em vez de um texto que acende com a rolagem, o
 * visitante *vê* o que a HR Digital vende: o card da empresa dele sobe do 7º
 * ao 1º lugar da busca local, ultrapassando um concorrente por vez, enquanto
 * nota, avaliações e contatos crescem junto.
 */
export default function Climb() {
  const ref = useRef<HTMLElement>(null);

  useGsap(ref, (root) => {
    const rows = gsap.utils.toArray<HTMLElement>(".rrow--rival", root);
    const you = root.querySelector<HTMLElement>(".rrow--you")!;
    const rankN = root.querySelector<HTMLElement>(".climb__rank-n")!;
    const rating = root.querySelector<HTMLElement>(".you-rating")!;
    const reviews = root.querySelector<HTMLElement>(".you-reviews")!;
    const youStars = you.querySelector<HTMLElement>(".rstars")!;
    const kpis = gsap.utils.toArray<HTMLElement>(".kpi__n", root);
    const steps = gsap.utils.toArray<HTMLElement>(".climb__step", root);
    const bars = gsap.utils.toArray<HTMLElement>(".climb__bar i", root);

    // cada linha anda em múltiplos da própria altura
    // o CSS posiciona o estado final via translateY; aqui o GSAP assume
    gsap.set(rows, { y: 0, yPercent: (i) => i * 100 });
    gsap.set(you, { y: 0, yPercent: START * 100 });
    gsap.set(steps, { autoAlpha: (i) => (i === 0 ? 1 : 0), y: (i) => (i === 0 ? 0 : 24) });
    gsap.set([".you-photo", ".you-open"], { opacity: 0 });
    gsap.set(".you-badge", { autoAlpha: 0 });

    const state = { slot: START, rating: 3.6, reviews: 8, k: 0 };
    const paint = () => {
      rankN.textContent = String(Math.round(state.slot) + 1);
      rating.textContent = fmt(state.rating);
      reviews.textContent = `(${Math.round(state.reviews)})`;
      youStars.style.setProperty("--fill", `${(state.rating / 5) * 100}%`);
      kpis.forEach((el, i) => {
        const { from, to } = KPIS[i];
        el.textContent = String(Math.round(from + (to - from) * state.k));
      });
    };
    paint();

    const tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: root,
        start: "top top",
        end: () => `+=${window.innerHeight * 2.6}`,
        pin: ".climb__pin",
        scrub: 0.8,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    // 0 → 1: "Hoje" — o visitante reconhece a própria posição
    tl.to(".rrow--you .rrow__card", { boxShadow: "0 0 0 2px rgba(251,84,54,.9), 0 18px 40px -16px rgba(251,84,54,.6)", duration: 0.6 }, 0.2)
      .to({}, { duration: 1 }, 0);

    // 1 → 4: otimização — ultrapassa um concorrente por vez
    tl.to(steps[0], { autoAlpha: 0, y: -24, duration: 0.3 }, 1)
      .to(steps[1], { autoAlpha: 1, y: 0, duration: 0.3 }, 1.15)
      .to(".you-photo", { opacity: 1, duration: 0.4 }, 1.3)
      .to(".you-open", { opacity: 1, duration: 0.3 }, 1.6);

    const climbStart = 1.2;
    const per = 0.5;
    for (let j = START - 1; j >= 0; j--) {
      const t = climbStart + (START - 1 - j) * per;
      tl.to(you, { yPercent: j * 100, duration: per * 0.8, ease: "power2.inOut" }, t).to(
        rows[j],
        { yPercent: (j + 1) * 100, duration: per * 0.8, ease: "power2.inOut" },
        t,
      );
    }
    const climbEnd = climbStart + START * per;

    tl.to(state, { slot: 0, rating: 4.9, reviews: 312, k: 1, duration: climbEnd - climbStart, ease: "power1.in", onUpdate: paint }, climbStart)
      // 4 → 5: primeiro lugar
      .to(steps[1], { autoAlpha: 0, y: -24, duration: 0.3 }, climbEnd - 0.4)
      .to(steps[2], { autoAlpha: 1, y: 0, duration: 0.3 }, climbEnd - 0.25)
      .fromTo(".you-badge", { scale: 0.4, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.35, ease: "back.out(2)" }, climbEnd - 0.1)
      .to(".climb__board", { "--glow": 1, duration: 0.4 }, climbEnd - 0.1)
      .to({}, { duration: 0.8 }, climbEnd);

    // barra de progresso de 3 etapas
    tl.fromTo(bars[0], { scaleX: 0 }, { scaleX: 1, duration: 1 }, 0)
      .fromTo(bars[1], { scaleX: 0 }, { scaleX: 1, duration: climbEnd - 1 }, 1)
      .fromTo(bars[2], { scaleX: 0 }, { scaleX: 1, duration: tl.duration() - climbEnd }, climbEnd);
  });

  return (
    <section ref={ref} id="subida" className="climb" aria-label="A subida no Google">
      <div className="climb__pin">
        <div className="wrap climb__grid">
          <div className="climb__copy">
            <p className="eyebrow">A subida</p>

            <div className="climb__rank" aria-hidden>
              <span className="climb__rank-n">1</span>
              <span className="climb__rank-o">º</span>
              <span className="climb__rank-l">
                lugar
                <br />
                no Google
              </span>
            </div>

            <div className="climb__steps">
              {CLIMB_STEPS.map((s) => (
                <div key={s.tag} className="climb__step">
                  <span className="climb__tag">{s.tag}</span>
                  <h2 className="climb__title display">{s.title}</h2>
                  <p className="climb__text">{s.text}</p>
                </div>
              ))}
            </div>

            <div className="climb__kpis">
              {KPIS.map((k) => (
                <div key={k.id} className="kpi">
                  <b className="kpi__n">{k.to}</b>
                  <span>{k.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="climb__board" aria-hidden>
            <div className="board__bar">
              <IconSearch />
              <span>o que você vende · perto de mim</span>
              <IconMic />
            </div>
            <div className="board__head">
              <span>Empresas</span>
              <span>Classificação</span>
            </div>
            <div className="board__body">
              <ol className="board__rail">
                {Array.from({ length: ROWS }, (_, i) => (
                  <li key={i}>{i + 1}</li>
                ))}
              </ol>
              <div className="board__list" style={{ "--rows": ROWS } as React.CSSProperties}>
                {COMPETITORS.map((c, i) => (
                  <div key={c.name} className="rrow rrow--rival" style={{ "--slot": i + 1 } as React.CSSProperties}>
                    <div className="rrow__card">
                      <span className="rrow__thumb" />
                      <span className="rrow__txt">
                        <b>{c.name}</b>
                        <span>
                          {fmt(c.rating)} <Stars value={c.rating} /> ({c.reviews})
                        </span>
                      </span>
                    </div>
                  </div>
                ))}
                <div className="rrow rrow--you" style={{ "--slot": 0 } as React.CSSProperties}>
                  <div className="rrow__card">
                    <span className="rrow__thumb">
                      <Image className="you-photo" src="/img/photos/storefront.webp" alt="" width={128} height={128} sizes="64px" />
                    </span>
                    <span className="rrow__txt">
                      <b>
                        A sua empresa <span className="you-badge">1º</span>
                      </b>
                      <span>
                        <em className="you-rating">4,9</em> <Stars value={4.9} /> <em className="you-reviews">(312)</em>
                        <i className="you-open">· Aberto agora</i>
                      </span>
                    </span>
                    <span className="rrow__star">
                      <IconStar />
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <p className="board__note">Simulação ilustrativa da busca local</p>
          </div>
        </div>

        <div className="climb__bar wrap" aria-hidden>
          {CLIMB_STEPS.map((s) => (
            <span key={s.tag}>
              <i />
              <b>{s.tag}</b>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
