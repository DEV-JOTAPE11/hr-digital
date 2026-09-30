"use client";

import Image from "next/image";
import { useState, useSyncExternalStore } from "react";
import { SITE, waLink } from "@/lib/site";
import { IconCheck, IconWhatsApp } from "@/components/Icons";

const TIMES = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00", "18:00"];
const DOW = ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"];
const MON = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];

type Day = { key: string; dow: string; d: number; mon: string; label: string };

/** próximos 10 dias úteis (seg–sáb) — calculados no navegador, na data de quem visita */
function nextDays(): Day[] {
  const out: Day[] = [];
  const now = new Date();
  const cur = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  // depois das 17h o dia de hoje já não tem horário
  if (now.getHours() >= 17) cur.setDate(cur.getDate() + 1);
  while (out.length < 10) {
    if (cur.getDay() !== 0) {
      const dd = String(cur.getDate()).padStart(2, "0");
      const mm = String(cur.getMonth() + 1).padStart(2, "0");
      out.push({
        key: `${cur.getFullYear()}-${mm}-${dd}`,
        dow: DOW[cur.getDay()],
        d: cur.getDate(),
        mon: MON[cur.getMonth()],
        label: `${DOW[cur.getDay()]}, ${dd}/${mm}`,
      });
    }
    cur.setDate(cur.getDate() + 1);
  }
  return out;
}

// as datas dependem do relógio de quem visita: no servidor a lista sai vazia
// (esqueleto) e o navegador preenche na hidratação, sem divergir do HTML
const NO_DAYS: Day[] = [];
let cache: Day[] | null = null;
const clientDays = () => (cache ??= nextDays());
const noop = () => () => {};

export default function Booking() {
  const days = useSyncExternalStore(noop, clientDays, () => NO_DAYS);
  const [day, setDay] = useState("");
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [tried, setTried] = useState(false);

  const chosen = days.find((d) => d.key === day);
  const valid = !!chosen && !!time && name.trim().length > 1 && company.trim().length > 1;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setTried(true);
    if (!valid || !chosen) return;
    const msg = [
      "Olá, Hiago! Quero agendar o meu diagnóstico gratuito do Google.",
      "",
      `Dia: ${chosen.label}`,
      `Horário: ${time}`,
      `Nome: ${name.trim()}`,
      `Empresa: ${company.trim()}`,
    ].join("\n");
    window.open(waLink(msg), "_blank", "noopener,noreferrer");
  };

  return (
    <section id="agendar" className="booking section" aria-labelledby="booking-title">
      <div className="wrap booking__grid">
        <div className="booking__copy">
          <p className="eyebrow" data-reveal>
            Agende agora · vagas limitadas
          </p>
          <h2 id="booking-title" className="h2" data-words>
            Escolha o dia. <span className="fire-text">Garanta o seu horário.</span>
          </h2>
          <p className="lead" data-reveal>
            A sua confirmação chega ao WhatsApp do Hiago já pronta para o envio. A conversa é gratuita e sem compromisso.
          </p>
          <ul className="booking__trust" data-reveal-group>
            <li>
              <IconCheck /> Conversa direta com o fundador
            </li>
            <li>
              <IconCheck /> 10 a 15 minutos, pelo WhatsApp
            </li>
            <li>
              <IconCheck /> Você vê o seu perfil na hora
            </li>
            <li>
              <IconCheck /> Atendemos todo o Brasil
            </li>
          </ul>
          <div className="booking__host" data-reveal>
            <Image src="/img/photos/hiago.webp" alt="" width={112} height={112} sizes="56px" />
            <span>
              <b>{SITE.founder}</b>
              Fundador da HR Digital
            </span>
          </div>
        </div>

        <form className="book" onSubmit={submit} noValidate data-reveal>
          <div className="book__head">
            <b>Agende a sua conversa</b>
            <span>Escolha o dia e o horário que preferir.</span>
          </div>

          <fieldset className="book__field">
            <legend>Dia</legend>
            <div className="book__days" role="radiogroup" aria-label="Dia">
              {days.length === 0
                ? Array.from({ length: 6 }, (_, i) => <span key={i} className="day day--ghost" />)
                : days.map((d) => (
                    <button
                      type="button"
                      key={d.key}
                      role="radio"
                      aria-checked={day === d.key}
                      className={`day${day === d.key ? " is-sel" : ""}`}
                      onClick={() => setDay(d.key)}
                    >
                      <span className="day__dow">{d.dow}</span>
                      <span className="day__d">{d.d}</span>
                      <span className="day__mon">{d.mon}</span>
                    </button>
                  ))}
            </div>
            {tried && !chosen && <p className="book__err">Escolha um dia.</p>}
          </fieldset>

          <fieldset className="book__field">
            <legend>Horário</legend>
            <div className="book__times" role="radiogroup" aria-label="Horário">
              {TIMES.map((t) => (
                <button
                  type="button"
                  key={t}
                  role="radio"
                  aria-checked={time === t}
                  className={`time${time === t ? " is-sel" : ""}`}
                  onClick={() => setTime(t)}
                >
                  {t}
                </button>
              ))}
            </div>
            {tried && !time && <p className="book__err">Escolha um horário.</p>}
          </fieldset>

          <div className="book__row">
            <label className="book__input">
              <span>Seu nome</span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Como podemos te chamar?"
                autoComplete="given-name"
                aria-invalid={tried && name.trim().length < 2}
              />
            </label>
            <label className="book__input">
              <span>Nome da empresa</span>
              <input
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Ex.: Cantina Bella Nonna"
                autoComplete="organization"
                aria-invalid={tried && company.trim().length < 2}
              />
            </label>
          </div>

          <button type="submit" className="btn btn-wpp btn-block book__submit">
            <IconWhatsApp /> Confirmar pelo WhatsApp
          </button>
          <p className="book__note">
            {chosen && time ? (
              <>
                Selecionado: <b>{chosen.label}</b> às <b>{time}</b>
              </>
            ) : (
              "Você será direcionado ao WhatsApp com a mensagem pronta. Basta enviar."
            )}
          </p>
        </form>
      </div>
    </section>
  );
}
