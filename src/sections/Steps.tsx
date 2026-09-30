"use client";

import { useRef } from "react";
import { STEPS, waLink } from "@/lib/site";
import { gsap } from "@/lib/gsap";
import { useGsap } from "@/lib/useGsap";
import { IconChat, IconClock, IconEye, IconSpark, IconWhatsApp } from "@/components/Icons";

const ICONS = [IconChat, IconClock, IconEye, IconSpark];

export default function Steps() {
  const ref = useRef<HTMLElement>(null);

  useGsap(ref, (root) => {
    gsap.fromTo(
      ".steps__fill",
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: "none",
        scrollTrigger: { trigger: ".steps__list", start: "top 65%", end: "bottom 60%", scrub: 0.5 },
      },
    );
    gsap.utils.toArray<HTMLElement>(".step", root).forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0.25, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "expo.out",
          scrollTrigger: {
            trigger: el,
            start: "top 62%",
            toggleActions: "play none none reverse",
            onEnter: () => el.classList.add("is-on"),
            onLeaveBack: () => el.classList.remove("is-on"),
          },
        },
      );
    });
  });

  return (
    <section ref={ref} className="steps section" aria-labelledby="steps-title">
      <div className="wrap steps__grid">
        <div className="steps__head">
          <p className="eyebrow" data-reveal>
            Como funciona o diagnóstico
          </p>
          <h2 id="steps-title" className="h2" data-words>
            Quinze minutos pelo WhatsApp que mudam a sua <span className="fire-text">perspectiva.</span>
          </h2>
          <p className="lead" data-reveal>
            Ao final da conversa, você enxerga o seu negócio sob uma perspectiva inteiramente nova — e sente o alívio de quem finalmente
            encontrou alguém que entende o que está em jogo.
          </p>
          <div className="steps__ctas" data-reveal>
            <a className="btn btn-fire" href="#agendar">
              Escolher meu horário
            </a>
            <a className="btn btn-glass" href={waLink()} target="_blank" rel="noopener noreferrer">
              <IconWhatsApp /> Chamar agora
            </a>
          </div>
        </div>

        <ol className="steps__list">
          <span className="steps__line" aria-hidden>
            <i className="steps__fill" />
          </span>
          {STEPS.map((s, i) => {
            const Icon = ICONS[i];
            return (
              <li key={s.title} className="step">
                <span className="step__node">
                  <Icon />
                </span>
                <div className="step__body">
                  <span className="step__n">Passo 0{i + 1}</span>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
