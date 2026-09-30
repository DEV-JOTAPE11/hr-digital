"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useGsap } from "@/lib/useGsap";
import { SITE } from "@/lib/site";
import { IconInstagram } from "@/components/Icons";

export default function Founder() {
  const ref = useRef<HTMLElement>(null);

  useGsap(ref, () => {
    gsap.fromTo(
      ".founder__photo",
      { clipPath: "inset(18% 12% 18% 12% round 40px)" },
      {
        clipPath: "inset(0% 0% 0% 0% round 28px)",
        ease: "none",
        scrollTrigger: { trigger: ".founder__media", start: "top 90%", end: "top 30%", scrub: 0.6 },
      },
    );
    gsap.fromTo(
      ".founder__photo img",
      { scale: 1.3, yPercent: -6 },
      {
        scale: 1,
        yPercent: 6,
        ease: "none",
        scrollTrigger: { trigger: ".founder__media", start: "top bottom", end: "bottom top", scrub: true },
      },
    );
    gsap.from(".founder__badge", {
      y: 30,
      opacity: 0,
      duration: 1,
      ease: "back.out(1.6)",
      scrollTrigger: { trigger: ".founder__media", start: "top 45%", once: true },
    });
  });

  return (
    <section ref={ref} id="fundador" className="founder section theme-light" aria-labelledby="founder-title">
      <div className="wrap founder__grid">
        <div className="founder__media">
          <div className="founder__photo">
            <Image src="/img/photos/hiago.webp" alt="Hiago Ribeiro, fundador da HR Digital" width={760} height={760} sizes="(min-width: 900px) 40vw, 90vw" />
          </div>
          <div className="founder__badge">
            <span className="founder__live" />
            <span>
              <b>Hiago Ribeiro</b>
              Atende você pessoalmente
            </span>
          </div>
        </div>

        <div className="founder__copy">
          <p className="eyebrow" data-reveal>
            Do outro lado da conversa
          </p>
          <h2 id="founder-title" className="h2" data-words>
            Você não procura mais um colaborador. Procura um <span className="fire-text">parceiro.</span>
          </h2>
          <div className="founder__story" data-reveal-group>
            <p>
              Eu sou o Hiago, fundador da HR Digital. Minha mãe é empreendedora há anos, criou dois filhos sozinha e sempre foi muito boa no que
              faz. Mas o digital nunca foi o forte dela — e por muito tempo isso a deixou invisível para clientes que ela poderia estar
              atendendo.
            </p>
            <p>
              Ver isso de perto me fez entender que o problema não era só dela: são milhares de donos de negócio que trabalham duro, entregam
              qualidade e perdem cliente todo dia simplesmente porque ninguém os ajudou a aparecer no lugar certo.
            </p>
            <p className="founder__quote">
              “Quando conversarmos, você vai falar com alguém que trata o seu negócio com o mesmo cuidado que trata o da própria família.”
            </p>
          </div>
          <div className="founder__sign" data-reveal>
            <span className="founder__signature">Hiago Ribeiro</span>
            <span className="founder__role">Fundador da HR Digital</span>
            <a className="founder__ig" href={SITE.instagram} target="_blank" rel="noopener noreferrer">
              <IconInstagram /> {SITE.instagramHandle}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
