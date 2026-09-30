"use client";

import { useEffect, useRef, useState } from "react";
import Wordmark from "./Wordmark";
import { IconClose, IconMenu, IconWhatsApp } from "./Icons";
import { NAV, SITE, waLink } from "@/lib/site";
import { gsap, reducedMotion } from "@/lib/gsap";
import { getLenis } from "./SmoothScroll";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const sheet = useRef<HTMLDivElement>(null);

  // barra de vidro depois do topo; some rolando para baixo, volta subindo
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      setHidden(y > window.innerHeight * 0.9 && y > last + 2);
      if (y < last - 2) setHidden(false);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // menu do celular: trava a rolagem e entra em cascata
  useEffect(() => {
    const lenis = getLenis();
    if (open) {
      lenis?.stop();
      document.body.style.overflow = "hidden";
      if (!reducedMotion() && sheet.current) {
        gsap.fromTo(
          sheet.current.querySelectorAll(".sheet__item"),
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.06, ease: "expo.out", delay: 0.12 },
        );
      }
    } else {
      lenis?.start();
      document.body.style.overflow = "";
    }
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header className={`nav${scrolled ? " is-scrolled" : ""}${hidden && !open ? " is-hidden" : ""}`}>
        <div className="nav__in">
          <a href="#inicio" className="nav__brand" aria-label="HR Digital — início">
            <Wordmark compact />
          </a>

          <nav className="nav__links" aria-label="Principal">
            {NAV.map((l) => (
              <a key={l.href} href={l.href}>
                {l.label}
              </a>
            ))}
          </nav>

          <div className="nav__cta">
            <a className="btn btn-fire nav__btn" href="#agendar">
              <span className="nav__btn-long">Diagnóstico gratuito</span>
              <span className="nav__btn-short">Agendar</span>
            </a>
            <button
              className="nav__burger"
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              aria-expanded={open}
              onClick={() => setOpen((o) => !o)}
            >
              {open ? <IconClose /> : <IconMenu />}
            </button>
          </div>
        </div>
      </header>

      <div ref={sheet} className={`sheet${open ? " is-open" : ""}`} aria-hidden={!open}>
        <nav className="sheet__nav" aria-label="Menu">
          {NAV.map((l, i) => (
            <a key={l.href} className="sheet__item" href={l.href} onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}>
              <span>0{i + 1}</span>
              {l.label}
            </a>
          ))}
        </nav>
        <div className="sheet__foot sheet__item">
          <a className="btn btn-wpp btn-block" href={waLink()} target="_blank" rel="noopener noreferrer" tabIndex={open ? 0 : -1}>
            <IconWhatsApp /> Falar com o Hiago
          </a>
          <p>
            {SITE.phoneLabel} · {SITE.instagramHandle}
          </p>
        </div>
      </div>
    </>
  );
}
