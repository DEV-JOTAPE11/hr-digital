import Image from "next/image";
/**
 * Logo HR Digital refeito em código: a fênix da marca + o lettering com o "G"
 * nas cores do Google (o arquivo original tem o texto escuro e 160px — não
 * serve sobre o fundo escuro nem em tela retina).
 */
export default function Wordmark({ compact = false, className = "" }: { compact?: boolean; className?: string }) {
  return (
    <span className={`wordmark${compact ? " wordmark--compact" : ""} ${className}`}>
      <Image className="wordmark__fenix" src="/brand/fenix-full.webp" alt="" width={310} height={546} sizes="40px" loading="eager" />
      <span className="wordmark__type">
        <b>HR</b>
        <b>
          DI<i>G</i>ITAL
        </b>
        {!compact && <small>O renascimento do marketing local</small>}
      </span>
      <span className="sr-only">HR Digital</span>
    </span>
  );
}
