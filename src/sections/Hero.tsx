"use client";

import Image from "next/image";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { NICHES, type Sprite } from "@/lib/site";
import { gsap, ScrollTrigger, reducedMotion } from "@/lib/gsap";
import {
  GoogleG,
  IconArrow,
  IconGlobe,
  IconMic,
  IconPhone,
  IconPin,
  IconRoute,
  IconSearch,
  IconStar,
  IconWhatsApp,
} from "@/components/Icons";

const N = NICHES.length;
const AUTOPLAY = 4800;
const wrap = (i: number) => ((i % N) + N) % N;

/** palavras longas encolhem para caber — mas continuam gigantes */
const wordSize = (w: string) => Math.min(22, 188 / w.length);

/* ─────────────────────────────── sprites ─────────────────────────────── */

function SpriteIcon({ kind }: { kind: Sprite["kind"] }) {
  if (kind === "review") return <IconStar />;
  if (kind === "call") return <IconPhone />;
  if (kind === "route") return <IconRoute />;
  if (kind === "wpp") return <IconWhatsApp />;
  return <GoogleG />;
}

function SpriteCard({ s }: { s: Sprite }) {
  return (
    <div
      className={`sprite sprite--${s.kind}${s.mx === undefined ? " sprite--desk" : ""}`}
      style={
        {
          "--x": `${s.x}%`,
          "--y": `${s.y}%`,
          "--mx": `${s.mx ?? s.x}%`,
          "--my": `${s.my ?? s.y}%`,
          "--dur": `${s.dur}s`,
        } as React.CSSProperties
      }
    >
      <div className="sprite__float">
        <span className="sprite__ic">
          <SpriteIcon kind={s.kind} />
        </span>
        <span className="sprite__txt">
          <b>{s.title}</b>
          <span>{s.text}</span>
        </span>
        {s.kind === "review" && <span className="sprite__stars">★★★★★</span>}
      </div>
    </div>
  );
}

/* ──────────────────────────────── phone ──────────────────────────────── */

function Stars({ value }: { value: string }) {
  return (
    <span className="serp__stars" aria-label={`${value} estrelas`}>
      ★★★★★
    </span>
  );
}

function Phone({ idx }: { idx: number }) {
  return (
    <div className="phone" aria-hidden>
      <div className="phone__frame">
        <div className="phone__screen">
          <div className="phone__status">
            <span>9:41</span>
            <span className="phone__island" />
            <span className="phone__sig">
              <i />
              <i />
              <i />
              <i />
            </span>
          </div>

          <div className="serp">
            <div className="serp__logo">
              <span style={{ color: "#4285f4" }}>G</span>
              <span style={{ color: "#ea4335" }}>o</span>
              <span style={{ color: "#fbbc05" }}>o</span>
              <span style={{ color: "#4285f4" }}>g</span>
              <span style={{ color: "#34a853" }}>l</span>
              <span style={{ color: "#ea4335" }}>e</span>
            </div>

            <div className="serp__bar">
              <IconSearch />
              <span className="serp__q">
                <span className="serp__qtext">{NICHES[idx].query}</span>
                <span className="serp__caret" />
              </span>
              <IconMic />
            </div>

            <div className="serp__tabs">
              <span className="on">Tudo</span>
              <span>Maps</span>
              <span>Imagens</span>
              <span>Notícias</span>
            </div>

            <div className="serp__cards">
              {NICHES.map((n, i) => (
                <div key={n.id} className="serp__card" data-i={i}>
                  <span className="serp__badge">1º no Google</span>
                  <div className="serp__top">
                    <Image src={n.photo} alt="" className="serp__thumb" width={144} height={144} sizes="72px" loading="eager" />
                    <div className="serp__info">
                      <b className="serp__name">{n.business}</b>
                      <span className="serp__rate">
                        {n.rating} <Stars value={n.rating} /> ({n.reviews})
                      </span>
                      <span className="serp__meta">
                        {n.category} · {n.distance}
                      </span>
                      <span className="serp__open">
                        Aberto agora <em>· {n.closes}</em>
                      </span>
                    </div>
                  </div>
                  <div className="serp__acts">
                    <span>
                      <IconPhone /> Ligar
                    </span>
                    <span>
                      <IconRoute /> Rotas
                    </span>
                    <span>
                      <IconGlobe /> Site
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="serp__ghost">
              <i />
              <span>
                <b />
                <em />
              </span>
            </div>
            <div className="serp__ghost g2">
              <i />
              <span>
                <b />
                <em />
              </span>
            </div>

            <div className="serp__map">
              <span className="serp__pin">
                <IconPin />
              </span>
              <span className="serp__dot d1" />
              <span className="serp__dot d2" />
              <span className="serp__dot d3" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────── hero ──────────────────────────────── */

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const [idx, setIdx] = useState(0);
  const idxRef = useRef(0);
  const busy = useRef(false);
  const lastUser = useRef(0);
  const inView = useRef(true);

  const q = (sel: string) => root.current?.querySelectorAll<HTMLElement>(sel) ?? [];

  /* ── estado inicial: só o nicho 0 à vista ── */
  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    gsap.set(q(".hero__word"), { xPercent: (i) => (i === 0 ? 0 : 100), autoAlpha: (i) => (i === 0 ? 1 : 0) });
    gsap.set(q(".serp__card"), { xPercent: (i) => (i === 0 ? 0 : 112), autoAlpha: (i) => (i === 0 ? 1 : 0) });
    gsap.set(q(".sprites"), { autoAlpha: (i) => (i === 0 ? 1 : 0) });

    if (reducedMotion()) return;

    const ctx = gsap.context(() => {
      /* entrada: fundo acende, palavra sobe, o celular nasce de baixo */
      const tl = gsap.timeline({ defaults: { ease: "expo.out" }, delay: 0.1 });
      tl.from(".hero__glow", { opacity: 0, scale: 0.6, duration: 2 }, 0)
        .from(".hero__title .split-line > span", { yPercent: 110, duration: 1.3, stagger: 0.09 }, 0.15)
        .from(".hero__sub", { y: 24, opacity: 0, duration: 1.2 }, 0.45)
        .from(".hero__words", { yPercent: 35, opacity: 0, duration: 1.6 }, 0.2)
        .from(".phone", { yPercent: 38, opacity: 0, rotateX: 18, duration: 1.8 }, 0.3)
        .from(".hero__radar", { scale: 0.4, opacity: 0, duration: 1.8 }, 0.6)
        .from(".sprites:first-child .sprite", { y: -window.innerHeight * 0.7, duration: 1.3, stagger: 0.1, ease: "back.out(1.1)" }, 0.7)
        .from(".hero__foot > *", { y: 30, opacity: 0, duration: 1.1, stagger: 0.08 }, 0.8);

      /* saída na rolagem: o palco recua como nas páginas da Apple */
      const mm = gsap.matchMedia();
      mm.add("(min-width: 0px)", () => {
        gsap
          .timeline({
            scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: 0.6 },
            defaults: { ease: "none" },
          })
          .to(".hero__stage", { yPercent: -10, scale: 0.9 }, 0)
          .to(".hero__words", { yPercent: 40, opacity: 0.2 }, 0)
          .to(".hero__copy", { y: -60, opacity: 0 }, 0)
          .to(".hero__foot", { opacity: 0 }, 0);
      });
    }, el);

    return () => ctx.revert();
  }, []);

  /* ── troca de nicho: palavra e card deslizam, sprites entram por cima ── */
  const go = useCallback((dir: 1 | -1, target?: number) => {
    const el = root.current;
    if (!el || busy.current) return;
    const from = idxRef.current;
    const to = target ?? wrap(from + dir);
    if (to === from) return;
    idxRef.current = to;
    setIdx(to);

    const words = el.querySelectorAll<HTMLElement>(".hero__word");
    const cards = el.querySelectorAll<HTMLElement>(".serp__card");
    const groups = el.querySelectorAll<HTMLElement>(".sprites");
    const qtext = el.querySelector<HTMLElement>(".serp__qtext");

    if (reducedMotion()) {
      gsap.set([words, cards], { xPercent: 0, autoAlpha: (i) => (i % N === to ? 1 : 0) });
      gsap.set(groups, { autoAlpha: (i) => (i === to ? 1 : 0) });
      if (qtext) qtext.textContent = NICHES[to].query;
      return;
    }

    busy.current = true;
    const vh = window.innerHeight;
    const D = 1.05;
    const tl = gsap.timeline({ onComplete: () => void (busy.current = false) });

    tl.to(words[from], { xPercent: -100 * dir, autoAlpha: 0, duration: D, ease: "expo.inOut" }, 0)
      .fromTo(words[to], { xPercent: 100 * dir, autoAlpha: 1 }, { xPercent: 0, duration: D, ease: "expo.inOut" }, 0)
      .to(cards[from], { xPercent: -112 * dir, duration: D * 0.9, ease: "expo.inOut" }, 0)
      .fromTo(cards[to], { xPercent: 112 * dir, autoAlpha: 1 }, { xPercent: 0, duration: D * 0.9, ease: "expo.inOut" }, 0.05)
      .set(cards[from], { autoAlpha: 0 })
      // sprites: os antigos caem pela base, os novos chegam pelo topo
      .to(groups[from].querySelectorAll(".sprite"), { y: vh * 0.95, duration: 0.9, ease: "power3.in", stagger: 0.04 }, 0)
      .set(groups[from], { autoAlpha: 0 })
      .set(groups[from].querySelectorAll(".sprite"), { y: 0 })
      .set(groups[to], { autoAlpha: 1 }, 0.35)
      .fromTo(
        groups[to].querySelectorAll(".sprite"),
        { y: -vh * 0.95 },
        { y: 0, duration: 1.15, ease: "back.out(1.15)", stagger: 0.07 },
        0.35,
      )
      .fromTo(".phone__frame", { rotateY: 0 }, { rotateY: -7 * dir, duration: D / 2, ease: "power2.out", yoyo: true, repeat: 1 }, 0);

    // a busca é redigitada, como se alguém acabasse de pesquisar
    if (qtext) {
      const text = NICHES[to].query;
      const proxy = { n: 0 };
      tl.set(qtext, { textContent: "" }, 0.15).to(
        proxy,
        {
          n: text.length,
          duration: text.length * 0.035,
          ease: "none",
          onUpdate: () => void (qtext.textContent = text.slice(0, Math.round(proxy.n))),
        },
        0.3,
      );
    }
  }, []);

  const user = (fn: () => void) => {
    lastUser.current = Date.now();
    fn();
  };

  /* ── autoplay: só com o hero à vista e fora de interação recente ── */
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top bottom",
      end: "bottom top",
      onToggle: (s) => void (inView.current = s.isActive),
    });
    const t = window.setInterval(() => {
      if (!inView.current || document.hidden) return;
      if (Date.now() - lastUser.current < 9000) return;
      go(1);
    }, AUTOPLAY);
    const onKey = (e: KeyboardEvent) => {
      if (!inView.current || window.scrollY > window.innerHeight * 0.6) return;
      if (e.key === "ArrowRight") user(() => go(1));
      if (e.key === "ArrowLeft") user(() => go(-1));
    };
    window.addEventListener("keydown", onKey);
    return () => {
      st.kill();
      window.clearInterval(t);
      window.removeEventListener("keydown", onKey);
    };
  }, [go]);

  /* ── arrastar/deslizar: a palavra acompanha o dedo, a rolagem vertical segue livre ── */
  const drag = useRef<{ x: number; y: number; dx: number; axis: "x" | "y" | null; id: number } | null>(null);

  const onDown = (e: React.PointerEvent) => {
    if (busy.current) return;
    drag.current = { x: e.clientX, y: e.clientY, dx: 0, axis: null, id: e.pointerId };
  };
  const onMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    const dx = e.clientX - d.x;
    const dy = e.clientY - d.y;
    if (!d.axis && Math.hypot(dx, dy) > 8) d.axis = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
    if (d.axis !== "x") return;
    d.dx = dx;
    const el = root.current!;
    const w = el.clientWidth;
    const i = idxRef.current;
    gsap.set(el.querySelectorAll(".hero__word")[i], { xPercent: (dx / w) * 60 });
    gsap.set(el.querySelectorAll(".serp__card")[i], { xPercent: (dx / w) * 90 });
  };
  const onUp = (e: React.PointerEvent) => {
    const d = drag.current;
    drag.current = null;
    if (!d || d.id !== e.pointerId) return;
    const el = root.current!;
    if (d.axis === "x" && Math.abs(d.dx) > 50) {
      user(() => go(d.dx < 0 ? 1 : -1));
      return;
    }
    const i = idxRef.current;
    gsap.to([el.querySelectorAll(".hero__word")[i], el.querySelectorAll(".serp__card")[i]], {
      xPercent: 0,
      duration: 0.7,
      ease: "expo.out",
    });
    // toque simples no celular avança, como o pote do Fruity
    if (!d.axis && (e.target as HTMLElement).closest(".phone")) user(() => go(1));
  };

  const n = NICHES[idx];

  return (
    <header
      id="inicio"
      ref={root}
      className="hero"
      style={{ "--accent": n.accent, "--on-accent": n.onAccent } as React.CSSProperties}
    >
      <div className="hero__bg" aria-hidden>
        <div className="hero__glow" />
        <div className="hero__grid" />
      </div>

      <div className="hero__copy wrap">
        <p className="eyebrow hero__eyebrow">O renascimento do marketing local</p>
        <h1 className="hero__title display">
          <span className="split-line">
            <span>Seu negócio em</span>
          </span>
          <span className="split-line">
            <span>
              <em className="fire-text">primeiro lugar</em> no Google.
            </span>
          </span>
        </h1>
        <p className="hero__sub">
          Quem procura <b>{n.word.toLowerCase()}</b> na sua região precisa encontrar <b>você</b> — não o concorrente.
        </p>
      </div>

      <div className="hero__words" aria-hidden>
        {NICHES.map((it) => (
          <span key={it.id} className="hero__word poster" style={{ fontSize: `${wordSize(it.word)}vw` }}>
            {it.word}
          </span>
        ))}
      </div>

      <div
        className="hero__stage"
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={() => (drag.current = null)}
      >
        <div className="hero__radar" aria-hidden>
          <i />
          <i />
          <i />
        </div>

        <div className="hero__sprites" aria-hidden>
          {NICHES.map((it) => (
            <div key={it.id} className="sprites">
              {it.sprites.map((s, i) => (
                <SpriteCard key={i} s={s} />
              ))}
            </div>
          ))}
        </div>

        <Phone idx={idx} />
      </div>

      <div className="hero__foot wrap">
        <a className="btn btn-fire hero__cta" href="#agendar">
          Quero meu diagnóstico gratuito <IconArrow />
        </a>

        <div className="hero__switch" role="group" aria-label="Escolha um segmento">
          <button className="hero__arrow" aria-label="Segmento anterior" onClick={() => user(() => go(-1))}>
            <IconArrow style={{ transform: "scaleX(-1)" }} />
          </button>
          <div className="hero__now">
            <span className="hero__count">
              {String(idx + 1).padStart(2, "0")} <i>/ {String(N).padStart(2, "0")}</i>
            </span>
            <div className="hero__dots">
              {NICHES.map((it, i) => (
                <button
                  key={it.id}
                  className={i === idx ? "on" : ""}
                  aria-label={it.word}
                  aria-current={i === idx}
                  onClick={() => user(() => go(i > idxRef.current ? 1 : -1, i))}
                />
              ))}
            </div>
          </div>
          <button className="hero__arrow" aria-label="Próximo segmento" onClick={() => user(() => go(1))}>
            <IconArrow />
          </button>
        </div>
      </div>
    </header>
  );
}
