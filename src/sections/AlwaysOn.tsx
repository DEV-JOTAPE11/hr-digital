"use client";

import Image from "next/image";
import { useRef } from "react";
import { NOTIFICATIONS } from "@/lib/site";
import { gsap } from "@/lib/gsap";
import { useGsap } from "@/lib/useGsap";
import { GoogleG, IconPhone, IconWhatsApp } from "@/components/Icons";

function AppIcon({ app }: { app: string }) {
  if (app === "WhatsApp")
    return (
      <span className="notif__app notif__app--wpp">
        <IconWhatsApp />
      </span>
    );
  if (app === "Telefone")
    return (
      <span className="notif__app notif__app--tel">
        <IconPhone />
      </span>
    );
  return (
    <span className="notif__app notif__app--g">
      <GoogleG />
    </span>
  );
}

/**
 * VENDEDOR 24H — o "Ativando seu vendedor 24/7" do Instagram virou gesto:
 * a rolagem liga o interruptor, a foto cresce até ocupar a tela e as
 * notificações da madrugada começam a chegar.
 */
export default function AlwaysOn() {
  const ref = useRef<HTMLElement>(null);

  useGsap(ref, (root) => {
    const mm = gsap.matchMedia();
    mm.add({ mobile: "(max-width: 767px)", desktop: "(min-width: 768px)" }, (ctx) => {
      const { mobile } = ctx.conditions as { mobile: boolean };
      const s0 = mobile ? 0.6 : 0.42;

      // estado inicial explícito: tweens que começam no meio de um scrub não
      // se aplicam antes da hora, então a cena ficaria visível cedo demais
      gsap.set(".always__content > *, .notif", { opacity: 0 });
      gsap.set(".switch__label--on", { opacity: 0 });
      gsap.set(".always__card", { scale: s0, borderRadius: 32 / s0 });
      gsap.set(".always__photo", { scale: 1.4 });
      gsap.set(".switch", { "--on": 0 });

      gsap
        .timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: root, start: "top top", end: "bottom bottom", scrub: 0.7 },
        })
        .to({}, { duration: 1 }, 0)
        // o interruptor liga
        .fromTo(".switch__knob", { x: 0 }, { x: () => root.querySelector<HTMLElement>(".switch")!.clientWidth - 64, duration: 0.1, ease: "power2.inOut" }, 0.02)
        .fromTo(".switch", { "--on": 0 }, { "--on": 1, duration: 0.1 }, 0.02)
        .fromTo(".switch__label--off", { opacity: 1 }, { opacity: 0, duration: 0.05 }, 0.03)
        .fromTo(".switch__label--on", { opacity: 0 }, { opacity: 1, duration: 0.05 }, 0.08)
        // a foto cresce até virar a tela
        .fromTo(".always__card", { scale: s0, borderRadius: 32 / s0 }, { scale: 1, borderRadius: 0, duration: 0.42, ease: "power2.inOut" }, 0.14)
        .fromTo(".always__photo", { scale: 1.4 }, { scale: 1, duration: 0.5, ease: "power2.out" }, 0.14)
        .to(".always__before", { opacity: 0, y: -60, duration: 0.12 }, 0.24)
        // cena: título e notificações chegando
        .fromTo(".always__content > *", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.1, stagger: 0.04 }, 0.5)
        .fromTo(".notif", { opacity: 0, y: 50, scale: 0.94 }, { opacity: 1, y: 0, scale: 1, duration: 0.08, stagger: 0.07, ease: "power2.out" }, 0.6);
    });
  });

  return (
    <section ref={ref} className="always" aria-labelledby="always-title">
      <div className="always__stage">
        <div className="always__before">
          <p className="always__kicker">Ativando o seu vendedor 24/7</p>
          <div className="switch" aria-hidden>
            <span className="switch__label switch__label--off">OFF</span>
            <span className="switch__label switch__label--on">ON</span>
            <span className="switch__knob">
              <Image src="/brand/fenix-400.webp" alt="" width={96} height={96} sizes="48px" />
            </span>
          </div>
        </div>

        <div className="always__card">
          <Image className="always__photo" src="/img/photos/owner-phone.webp" alt="Dono de negócio recebendo clientes pelo celular" width={2000} height={1333} sizes="100vw" />
          <div className="always__scrim" />
        </div>

        <div className="always__scene wrap">
          <div className="always__content">
            <p className="eyebrow">Vendedor 24 horas</p>
            <h2 id="always-title" className="always__title display">
              Mesmo enquanto
              <br />
              você <span className="fire-text">dorme.</span>
            </h2>
            <p className="always__sub">
              O Google vira o seu melhor vendedor: trabalha todos os dias, a qualquer hora, atendendo quem já está procurando o que você vende.
            </p>
          </div>

          <ul className="notifs">
            {NOTIFICATIONS.map((n) => (
              <li key={n.time} className="notif">
                <AppIcon app={n.app} />
                <div className="notif__body">
                  <span className="notif__top">
                    <b>{n.app}</b>
                    <time>{n.time}</time>
                  </span>
                  <b className="notif__title">{n.title}</b>
                  <span className="notif__text">{n.text}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
