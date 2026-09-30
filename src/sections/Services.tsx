"use client";

import Image from "next/image";
import { useRef } from "react";
import { SERVICES } from "@/lib/site";
import { gsap } from "@/lib/gsap";
import { useGsap } from "@/lib/useGsap";
import { IconArrowUpRight, IconCheck, IconPhone, IconRoute, IconGlobe, IconStar } from "@/components/Icons";

const CHECKLIST = ["Categorias e serviços", "Fotos profissionais", "Horários e atributos", "Palavras-chave locais", "Produtos e ofertas"];

function VisualPerfil() {
  return (
    <div className="bv bv--perfil">
      <Image src="/img/photos/phone-road.webp" alt="" className="bv__photo" width={1200} height={1500} sizes="(min-width: 1100px) 60vw, 100vw" />
      <div className="bv__panel">
        <div className="bv__meter">
          <span>Perfil otimizado</span>
          <b>
            <span data-count="100">100</span>%
          </b>
        </div>
        <div className="bv__track">
          <i className="bv__fill" />
        </div>
        <ul className="bv__checks">
          {CHECKLIST.map((c) => (
            <li key={c}>
              <IconCheck /> {c}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function VisualReputacao() {
  return (
    <div className="bv bv--rep">
      <div className="bv__score">
        <b>4,9</b>
        <span className="bv__stars">
          {Array.from({ length: 5 }, (_, i) => (
            <IconStar key={i} />
          ))}
        </span>
        <small>312 avaliações</small>
      </div>
      <div className="bv__review">
        <span className="bv__avatar">M</span>
        <p>“Encontrei pelo Google e virei cliente. Atendimento nota 10!”</p>
      </div>
      <div className="bv__reply">
        <b>Resposta do proprietário</b> Obrigado, Marina! Volte sempre.
      </div>
    </div>
  );
}

function VisualConteudo() {
  return (
    <div className="bv bv--post">
      <Image src="/img/photos/chef-portrait.webp" alt="" className="bv__photo" width={1200} height={1200} sizes="(min-width: 1100px) 30vw, 100vw" />
      <div className="bv__postcard">
        <span className="bv__tag">Nova postagem</span>
        <b>Menu executivo toda terça 🍝</b>
        <span className="bv__cta">Saiba mais</span>
      </div>
    </div>
  );
}

function VisualTrafego() {
  const bars = [
    { label: "Ligações", v: 72, Icon: IconPhone },
    { label: "Rotas", v: 94, Icon: IconRoute },
    { label: "Site", v: 58, Icon: IconGlobe },
  ];
  return (
    <div className="bv bv--bars">
      {bars.map(({ label, v, Icon }) => (
        <div key={label} className="bv__bar">
          <span className="bv__barlabel">
            <Icon /> {label}
          </span>
          <span className="bv__bartrack">
            <i style={{ "--v": `${v}%` } as React.CSSProperties} />
          </span>
          <b>+{v}%</b>
        </div>
      ))}
    </div>
  );
}

function VisualAnalise() {
  return (
    <div className="bv bv--line">
      <svg viewBox="0 0 300 120" preserveAspectRatio="none">
        <defs>
          <linearGradient id="lineFill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#fb5436" stopOpacity=".35" />
            <stop offset="1" stopColor="#fb5436" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path className="bv__area" d="M0 108 C40 104 60 96 90 90 S140 80 170 62 S230 40 260 22 L300 10 L300 120 L0 120Z" fill="url(#lineFill)" />
        <path className="bv__lineP" d="M0 108 C40 104 60 96 90 90 S140 80 170 62 S230 40 260 22 L300 10" pathLength={1} />
      </svg>
      <div className="bv__legend">
        <span>Jan</span>
        <span>Fev</span>
        <span>Mar</span>
        <span>Abr</span>
        <span>Mai</span>
        <span>Jun</span>
      </div>
    </div>
  );
}

const VISUALS: Record<string, () => React.JSX.Element> = {
  perfil: VisualPerfil,
  reputacao: VisualReputacao,
  conteudo: VisualConteudo,
  trafego: VisualTrafego,
  analise: VisualAnalise,
};

export default function Services() {
  const ref = useRef<HTMLElement>(null);

  useGsap(ref, () => {
    gsap.from(".bento__tile", {
      y: 70,
      opacity: 0,
      duration: 1.3,
      ease: "expo.out",
      stagger: 0.08,
      scrollTrigger: { trigger: ".bento", start: "top 82%", once: true },
    });
    gsap.from(".bv__fill", {
      scaleX: 0.38,
      duration: 2,
      ease: "power3.out",
      scrollTrigger: { trigger: ".bv--perfil", start: "top 75%", once: true },
    });
    gsap.from(".bv__checks li", {
      opacity: 0,
      x: -16,
      stagger: 0.12,
      duration: 0.8,
      ease: "expo.out",
      scrollTrigger: { trigger: ".bv--perfil", start: "top 70%", once: true },
    });
    gsap.from(".bv__bartrack i", {
      scaleX: 0,
      duration: 1.6,
      ease: "expo.out",
      stagger: 0.12,
      scrollTrigger: { trigger: ".bv--bars", start: "top 82%", once: true },
    });
    gsap.from(".bv__lineP", {
      strokeDashoffset: 1,
      duration: 2.2,
      ease: "power2.out",
      scrollTrigger: { trigger: ".bv--line", start: "top 82%", once: true },
    });
    gsap.from(".bv__stars svg", {
      scale: 0,
      rotate: -40,
      stagger: 0.08,
      duration: 0.7,
      ease: "back.out(2.4)",
      scrollTrigger: { trigger: ".bv--rep", start: "top 82%", once: true },
    });
  });

  return (
    <section ref={ref} id="servicos" className="services section theme-light" aria-labelledby="services-title">
      <div className="wrap">
        <div className="services__head">
          <div className="section-head">
            <p className="eyebrow" data-reveal>
              O que fazemos
            </p>
            <h2 id="services-title" className="h2" data-words>
              Tudo que o seu negócio precisa para <span className="fire-text">dominar</span> a busca local.
            </h2>
          </div>
          <p className="lead services__lead" data-reveal>
            Capacitamos o comércio local para transformar o Google numa verdadeira máquina de vendas — do perfil à reputação, do conteúdo ao
            relatório.
          </p>
        </div>

        <div className="bento">
          {SERVICES.map((s) => {
            const Visual = VISUALS[s.id];
            return (
              <article key={s.id} className={`bento__tile bento__tile--${s.id}`}>
                <div className="bento__copy">
                  <span className="bento__kicker">{s.kicker}</span>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </div>
                <Visual />
              </article>
            );
          })}
          <a className="bento__tile bento__tile--cta" href="#agendar">
            <span className="bento__copy">
              <span className="bento__kicker">Próximo passo</span>
              <h3>Descubra o que falta no seu perfil.</h3>
            </span>
            <span className="bento__go">
              Diagnóstico gratuito <IconArrowUpRight />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
