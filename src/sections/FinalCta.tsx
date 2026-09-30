"use client";

import Image from "next/image";
import { useRef } from "react";
import { NAV, SITE, waLink } from "@/lib/site";
import { gsap } from "@/lib/gsap";
import { useGsap } from "@/lib/useGsap";
import Wordmark from "@/components/Wordmark";
import { IconArrow, IconInstagram, IconPhone, IconWhatsApp } from "@/components/Icons";

/**
 * FECHAMENTO — a fênix da marca renasce com a rolagem: sobe do fundo,
 * cresce e acende. É o "renascimento do marketing local" em um gesto.
 */
export default function FinalCta() {
  const ref = useRef<HTMLElement>(null);

  useGsap(ref, () => {
    gsap.set(".final__title .split-line > span", { yPercent: 110 });
    gsap.set(".final__actions", { opacity: 0 });
    gsap
      .timeline({
        defaults: { ease: "none" },
        scrollTrigger: { trigger: ".final__stage", start: "top 85%", end: "center 55%", scrub: 0.8 },
      })
      .fromTo(".final__fenix", { yPercent: 40, scale: 0.55, opacity: 0, filter: "brightness(0.4) blur(6px)" }, { yPercent: 0, scale: 1, opacity: 1, filter: "brightness(1) blur(0px)" }, 0)
      .fromTo(".final__halo", { scale: 0.3, opacity: 0 }, { scale: 1, opacity: 1 }, 0.1)
      .fromTo(".final__title .split-line > span", { yPercent: 110 }, { yPercent: 0, stagger: 0.08 }, 0.35)
      .fromTo(".final__actions", { opacity: 0, y: 30 }, { opacity: 1, y: 0 }, 0.6);

    // brasas subindo
    gsap.utils.toArray<HTMLElement>(".ember").forEach((e) => {
      const d = gsap.utils.random(3, 6);
      gsap
        .timeline({ repeat: -1, delay: gsap.utils.random(0, 4) })
        .fromTo(e, { y: 0, x: 0 }, { y: -gsap.utils.random(180, 420), x: gsap.utils.random(-60, 60), duration: d, ease: "sine.out" }, 0)
        .fromTo(e, { opacity: 0 }, { opacity: 1, duration: d * 0.3 }, 0)
        .to(e, { opacity: 0, duration: d * 0.5 }, d * 0.5);
    });
  });

  return (
    <section ref={ref} className="final" aria-labelledby="final-title">
      <div className="final__stage">
        <div className="final__halo" aria-hidden />
        <div className="final__embers" aria-hidden>
          {Array.from({ length: 16 }, (_, i) => (
            <i key={i} className="ember" style={{ left: `${8 + ((i * 53) % 84)}%` }} />
          ))}
        </div>
        <Image className="final__fenix" src="/brand/fenix-full.webp" alt="" width={310} height={546} sizes="300px" />

        <h2 id="final-title" className="final__title poster">
          <span className="split-line">
            <span>É a sua vez de</span>
          </span>
          <span className="split-line">
            <span className="fire-text">renascer no Google.</span>
          </span>
        </h2>

        <div className="final__actions">
          <a className="btn btn-fire" href="#agendar">
            Quero meu diagnóstico gratuito <IconArrow />
          </a>
          <a className="btn btn-glass" href={waLink()} target="_blank" rel="noopener noreferrer">
            <IconWhatsApp /> {SITE.phoneLabel}
          </a>
        </div>
      </div>

      <footer className="footer">
        <div className="wrap footer__grid">
          <div className="footer__brand">
            <Wordmark />
            <p>Transformamos o Google no vendedor 24h do comércio local. Atendimento em todo o Brasil.</p>
          </div>
          <nav className="footer__col" aria-label="Rodapé">
            <b>Navegação</b>
            {NAV.map((l) => (
              <a key={l.href} href={l.href}>
                {l.label}
              </a>
            ))}
          </nav>
          <div className="footer__col">
            <b>Contato</b>
            <a href={waLink()} target="_blank" rel="noopener noreferrer">
              <IconPhone /> {SITE.phoneLabel}
            </a>
            <a href={SITE.instagram} target="_blank" rel="noopener noreferrer">
              <IconInstagram /> {SITE.instagramHandle}
            </a>
          </div>
        </div>
        <div className="wrap footer__legal">
          <span>© {new Date().getFullYear()} HR Digital · {SITE.city} · Todos os direitos reservados.</span>
          <span>{SITE.tagline}</span>
        </div>
      </footer>
    </section>
  );
}
