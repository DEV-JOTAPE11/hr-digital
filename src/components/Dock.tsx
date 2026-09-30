"use client";

import { useEffect, useState } from "react";
import { waLink } from "@/lib/site";
import { IconWhatsApp } from "./Icons";

/**
 * Barra fixa de conversão no celular: aparece depois do hero e sai de cena
 * quando o formulário de agendamento (que já é o CTA) está na tela.
 */
export default function Dock() {
  const [on, setOn] = useState(false);

  useEffect(() => {
    const booking = document.getElementById("agendar");
    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      const r = booking?.getBoundingClientRect();
      const bookingVisible = !!r && r.top < vh * 0.85 && r.bottom > vh * 0.15;
      setOn(window.scrollY > vh * 0.9 && !bookingVisible);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className={`dock${on ? " is-on" : ""}`} aria-hidden={!on}>
      <span className="dock__txt">
        <b>Diagnóstico gratuito</b>
        15 min pelo WhatsApp
      </span>
      <a className="btn btn-wpp" href={waLink()} target="_blank" rel="noopener noreferrer" tabIndex={on ? 0 : -1}>
        <IconWhatsApp /> Falar agora
      </a>
    </div>
  );
}
