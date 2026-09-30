"use client";

import { useState } from "react";
import { FAQ, waLink } from "@/lib/site";
import { IconPlus, IconWhatsApp } from "@/components/Icons";

export default function Faq() {
  const [open, setOpen] = useState<number>(0);

  return (
    <section id="duvidas" className="faq section theme-light" aria-labelledby="faq-title">
      <div className="wrap faq__grid">
        <div className="faq__head">
          <p className="eyebrow" data-reveal>
            Perguntas frequentes
          </p>
          <h2 id="faq-title" className="h2" data-words>
            Ficou com alguma dúvida?
          </h2>
          <p className="lead" data-reveal>
            Se a sua não estiver aqui, pergunte direto para o Hiago.
          </p>
          <a className="btn btn-dark faq__cta" href={waLink("Olá, Hiago! Tenho uma dúvida sobre o diagnóstico.")} target="_blank" rel="noopener noreferrer" data-reveal>
            <IconWhatsApp /> Tirar dúvida no WhatsApp
          </a>
        </div>

        <div className="faq__list" data-reveal-group>
          {FAQ.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className={`qa${isOpen ? " is-open" : ""}`}>
                <h3>
                  <button aria-expanded={isOpen} aria-controls={`qa-${i}`} id={`qa-btn-${i}`} onClick={() => setOpen(isOpen ? -1 : i)}>
                    {f.q}
                    <span className="qa__ic">
                      <IconPlus />
                    </span>
                  </button>
                </h3>
                <div className="qa__panel" id={`qa-${i}`} role="region" aria-labelledby={`qa-btn-${i}`}>
                  <div>
                    <p>{f.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
