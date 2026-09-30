import Image from "next/image";
import { PAINS, STATS } from "@/lib/site";
import { IconClock, IconEye, IconStar } from "@/components/Icons";

const ICONS = [IconEye, IconStar, IconClock];

export default function Problem() {
  return (
    <section className="problem section theme-light" aria-labelledby="problem-title">
      <div className="wrap">
        <div className="section-head">
          <p className="eyebrow" data-reveal>
            O problema invisível
          </p>
          <h2 id="problem-title" className="h2" data-words>
            No Google, quem não aparece <em className="problem__strike">não existe.</em> E quem não existe não vende.
          </h2>
        </div>

        <div className="stats" data-reveal-group>
          {STATS.map((s) => (
            <div key={s.label} className="stat">
              <b className="stat__n">
                <span data-count={s.value}>{s.value}</span>
                <small>{s.suffix}</small>
              </b>
              <span className="stat__l">{s.label}</span>
            </div>
          ))}
        </div>

        <div className="pains" data-reveal-group>
          {PAINS.map((p, i) => {
            const Icon = ICONS[i];
            return (
              <article key={p.title} className="pain">
                <span className="pain__n">0{i + 1}</span>
                <span className="pain__ic">
                  <Icon />
                </span>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </article>
            );
          })}
        </div>

        <div className="flip">
          <figure className="flip__media" data-reveal>
            <Image src="/img/photos/maps-hand.webp" alt="Cliente pesquisando uma empresa no Google Maps pelo celular" width={1600} height={1064} sizes="(min-width: 900px) 50vw, 100vw" />
            <figcaption className="flip__chip">
              <span className="flip__dot" /> 1º resultado · a sua empresa
            </figcaption>
          </figure>
          <div className="flip__copy">
            <p className="eyebrow" data-reveal>
              Agora imagine o oposto
            </p>
            <p className="flip__text" data-words>
              Toda vez que alguém procura o que a sua empresa oferece, é o <em className="fire-text">seu nome</em> que aparece em primeiro
              lugar. O telefone toca, as mensagens chegam, os clientes entram.
            </p>
            <p className="flip__close" data-reveal>
              Essa posição existe. <b>E ela pode ser sua.</b>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
