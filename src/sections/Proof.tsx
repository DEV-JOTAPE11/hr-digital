"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { PROOFS } from "@/lib/site";
import { gsap } from "@/lib/gsap";
import { useGsap } from "@/lib/useGsap";
import { IconPlay, IconStar } from "@/components/Icons";

/** embed leve: só a miniatura até o toque — o iframe do YouTube pesa ~1 MB */
function VideoCard({ id, thumb }: { id: string; thumb: string }) {
  const [play, setPlay] = useState(false);
  return (
    <div className="proof__media">
      {play ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
          title="Depoimento de cliente da HR Digital"
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button className="proof__play" onClick={() => setPlay(true)} aria-label="Assistir depoimento">
          <Image src={thumb} alt="" width={622} height={1280} sizes="340px" />
          <span className="proof__btn">
            <IconPlay />
          </span>
        </button>
      )}
    </div>
  );
}

export default function Proof() {
  const ref = useRef<HTMLElement>(null);

  useGsap(ref, () => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 900px)", () => {
      gsap.fromTo(".proof__card:nth-child(2)", { y: 120 }, { y: -40, ease: "none", scrollTrigger: { trigger: ".proof__grid", start: "top bottom", end: "bottom top", scrub: true } });
      gsap.fromTo(".proof__card:nth-child(odd)", { y: 40 }, { y: -20, ease: "none", scrollTrigger: { trigger: ".proof__grid", start: "top bottom", end: "bottom top", scrub: true } });
    });
    gsap.from(".proof__card", {
      opacity: 0,
      y: 80,
      rotate: (i) => (i - 1) * 4,
      duration: 1.3,
      ease: "expo.out",
      stagger: 0.1,
      scrollTrigger: { trigger: ".proof__grid", start: "top 85%", once: true },
    });
  });

  return (
    <section ref={ref} id="resultados" className="proof section" aria-labelledby="proof-title">
      <div className="wrap">
        <div className="section-head center">
          <p className="eyebrow" data-reveal>
            O que dizem sobre o trabalho
          </p>
          <h2 id="proof-title" className="h2" data-words>
            Resultados reais de <span className="fire-text">negócios reais.</span>
          </h2>
          <div className="proof__rating" data-reveal>
            <span className="proof__stars">
              {Array.from({ length: 5 }, (_, i) => (
                <IconStar key={i} />
              ))}
            </span>
            Conversas de verdade, direto do WhatsApp dos clientes.
          </div>
        </div>
      </div>

      <div className="proof__grid">
        {PROOFS.map((p) => (
          <article key={p.who} className="proof__card">
            {p.type === "video" ? (
              <VideoCard id={p.id} thumb={p.thumb} />
            ) : (
              <div className="proof__media">
                <Image src={p.src} alt={`Depoimento: ${p.what}`} width={828} height={1530} sizes="340px" />
              </div>
            )}
            <footer className="proof__who">
              <b>{p.who}</b>
              <span>{p.what}</span>
            </footer>
          </article>
        ))}
      </div>
    </section>
  );
}
