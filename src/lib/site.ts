/* Tudo que é conteúdo mora aqui — textos do site atual (hrdigitalmkt.com.br)
 * e do Instagram (@hrdigitalmkt), organizados por seção. */

export const SITE = {
  url: "https://hrdigitalmkt.com.br",
  name: "HR Digital",
  tagline: "O renascimento do marketing local",
  founder: "Hiago Ribeiro",
  phone: "5511989449242",
  phoneLabel: "(11) 98944-9242",
  instagram: "https://www.instagram.com/hrdigitalmkt/",
  instagramHandle: "@hrdigitalmkt",
  city: "São Paulo",
} as const;

export const waLink = (msg = "Olá, Hiago! Vim pelo site e quero o meu diagnóstico gratuito do Google.") =>
  `https://wa.me/${SITE.phone}?text=${encodeURIComponent(msg)}`;

export const NAV = [
  { label: "Método", href: "#metodo" },
  { label: "Serviços", href: "#servicos" },
  { label: "Resultados", href: "#resultados" },
  { label: "Quem somos", href: "#fundador" },
  { label: "Dúvidas", href: "#duvidas" },
] as const;

/* ------------------------------------------------------------------ hero */

export type Sprite = {
  kind: "review" | "call" | "route" | "wpp" | "rank";
  title: string;
  text: string;
  /** posição em % do palco (desktop) */
  x: number;
  y: number;
  /** posição em % do palco (mobile) — ausente = não aparece no celular */
  mx?: number;
  my?: number;
  dur: number;
};

export type Niche = {
  id: string;
  word: string;
  query: string;
  business: string;
  category: string;
  rating: string;
  reviews: number;
  distance: string;
  closes: string;
  photo: string;
  accent: string;
  /** cor do texto sobre o acento (botões) */
  onAccent: string;
  sprites: Sprite[];
};

export const NICHES: Niche[] = [
  {
    id: "restaurante",
    word: "Restaurante",
    query: "restaurante perto de mim",
    business: "Cantina Bella Nonna",
    category: "Restaurante italiano",
    rating: "4,9",
    reviews: 312,
    distance: "850 m",
    closes: "Fecha às 23:00",
    photo: "/img/niches/restaurante.webp",
    accent: "#fb5436",
    onAccent: "#fff",
    sprites: [
      { kind: "review", title: "Nova avaliação", text: "“A melhor massa da região!”", x: 17, y: 30, mx: 29, my: 35.5, dur: 5.2 },
      { kind: "call", title: "Ligação recebida", text: "via Google · agora", x: 82, y: 34, mx: 72, my: 82, dur: 6.1 },
      { kind: "route", title: "+38 pedidos de rota", text: "hoje, pelo Google Maps", x: 20, y: 70, dur: 5.6 },
      { kind: "rank", title: "1º no Google", text: "“restaurante perto de mim”", x: 80, y: 72, dur: 6.6 },
    ],
  },
  {
    id: "clinica",
    word: "Clínica",
    query: "dentista perto de mim",
    business: "Clínica Sorriso Vivo",
    category: "Clínica odontológica",
    rating: "5,0",
    reviews: 248,
    distance: "1,2 km",
    closes: "Fecha às 19:00",
    photo: "/img/niches/clinica.webp",
    accent: "#4285f4",
    onAccent: "#fff",
    sprites: [
      { kind: "wpp", title: "WhatsApp", text: "“Vi vocês no Google, tem horário?”", x: 18, y: 32, mx: 29, my: 35.5, dur: 5.4 },
      { kind: "review", title: "Nova avaliação", text: "“Atendimento impecável.”", x: 82, y: 30, mx: 72, my: 82, dur: 6.2 },
      { kind: "call", title: "3 agendamentos", text: "vindos do Google hoje", x: 19, y: 72, dur: 5.8 },
      { kind: "rank", title: "1º no Google", text: "“dentista perto de mim”", x: 81, y: 70, dur: 6.4 },
    ],
  },
  {
    id: "advocacia",
    word: "Advocacia",
    query: "advogado trabalhista",
    business: "Mendes & Rocha Advocacia",
    category: "Escritório de advocacia",
    rating: "4,9",
    reviews: 187,
    distance: "2,4 km",
    closes: "Fecha às 18:00",
    photo: "/img/niches/advocacia.webp",
    accent: "#fbbc05",
    onAccent: "#15192b",
    sprites: [
      { kind: "call", title: "Ligação recebida", text: "“Preciso de uma consulta”", x: 17, y: 31, mx: 29, my: 35.5, dur: 5.6 },
      { kind: "review", title: "Nova avaliação", text: "“Sério, rápido e humano.”", x: 83, y: 33, mx: 72, my: 82, dur: 6.0 },
      { kind: "route", title: "Site visitado", text: "+126 cliques neste mês", x: 20, y: 71, dur: 5.3 },
      { kind: "rank", title: "1º no Google", text: "“advogado trabalhista”", x: 80, y: 71, dur: 6.8 },
    ],
  },
  {
    id: "academia",
    word: "Academia",
    query: "academia perto de mim",
    business: "Iron House Academia",
    category: "Academia",
    rating: "4,8",
    reviews: 431,
    distance: "600 m",
    closes: "Aberto 24 horas",
    photo: "/img/niches/academia.webp",
    accent: "#34a853",
    onAccent: "#fff",
    sprites: [
      { kind: "wpp", title: "WhatsApp", text: "“Quanto é a mensalidade?”", x: 18, y: 30, mx: 29, my: 35.5, dur: 5.1 },
      { kind: "route", title: "+54 pedidos de rota", text: "nesta semana", x: 82, y: 32, mx: 72, my: 82, dur: 6.3 },
      { kind: "review", title: "Nova avaliação", text: "“Estrutura top, equipe nota 10.”", x: 19, y: 71, dur: 5.7 },
      { kind: "rank", title: "1º no Google", text: "“academia perto de mim”", x: 81, y: 72, dur: 6.5 },
    ],
  },
  {
    id: "barbearia",
    word: "Barbearia",
    query: "barbearia perto de mim",
    business: "Barbearia Dom Corte",
    category: "Barbearia",
    rating: "4,9",
    reviews: 529,
    distance: "400 m",
    closes: "Fecha às 21:00",
    photo: "/img/niches/barbearia.webp",
    accent: "#ea4335",
    onAccent: "#fff",
    sprites: [
      { kind: "review", title: "Nova avaliação", text: "“Melhor degradê da cidade.”", x: 17, y: 32, mx: 29, my: 35.5, dur: 5.3 },
      { kind: "wpp", title: "WhatsApp", text: "“Tem vaga hoje às 18h?”", x: 83, y: 31, mx: 72, my: 82, dur: 6.4 },
      { kind: "call", title: "Ligação recebida", text: "via Google · 2 min", x: 20, y: 72, dur: 5.5 },
      { kind: "rank", title: "1º no Google", text: "“barbearia perto de mim”", x: 80, y: 70, dur: 6.2 },
    ],
  },
];

/* ---------------------------------------------------------------- subida */

export const COMPETITORS = [
  { name: "Concorrente Premium", rating: 4.6, reviews: 198 },
  { name: "Empresa Tradicional", rating: 4.4, reviews: 121 },
  { name: "Loja do Centro", rating: 4.2, reviews: 86 },
  { name: "Concorrente sem otimização", rating: 3.4, reviews: 17 },
  { name: "Outro concorrente", rating: 3.1, reviews: 9 },
  { name: "Negócio da Esquina", rating: 2.8, reviews: 5 },
];

export const CLIMB_STEPS = [
  {
    tag: "Hoje",
    title: "Você está lá. Ninguém chega lá.",
    text: "Sétimo resultado, perfil incompleto, poucas avaliações. O cliente decide antes de rolar até você.",
  },
  {
    tag: "Otimização",
    title: "O Google começa a confiar em você.",
    text: "Categorias certas, fotos reais, posts, respostas e reputação. Cada ajuste empurra a sua empresa para cima.",
  },
  {
    tag: "Resultado",
    title: "Primeiro lugar. O telefone toca.",
    text: "Quem procura o que você vende encontra você primeiro. Todo dia, a qualquer hora, sem depender de anúncio.",
  },
];

/* -------------------------------------------------------------- problema */

export const STATS = [
  { value: 96, suffix: "%", label: "dos consumidores pesquisam no Google antes de comprar" },
  { value: 9, suffix: " em 10", label: "clientes escolhem entre os primeiros resultados" },
  { value: 83, suffix: "%", label: "da nova geração decide onde comprar pelo Google" },
];

export const PAINS = [
  {
    title: "Invisível na hora da decisão",
    text: "Quem aparece primeiro conquista o cliente. Sem um perfil bem construído, a sua empresa desaparece justamente no instante da escolha.",
  },
  {
    title: "Um perfil incompleto afasta",
    text: "Sem fotos, horários e avaliações, falta credibilidade. E diante da dúvida, o cliente opta por quem transmite mais segurança.",
  },
  {
    title: "Cada dia parado é venda perdida",
    text: "Não é sorte, é posicionamento. Quem está bem colocado vende todos os dias, a qualquer hora, sem depender de anúncios.",
  },
];

/* ------------------------------------------------------------ método VIDA */

export const VIDA = [
  {
    letter: "V",
    title: "Visibilidade",
    text: "Sua empresa passa a existir para quem procura exatamente o que você vende.",
    color: "#4285f4",
  },
  {
    letter: "I",
    title: "Interação",
    text: "Fotos, avaliações e conteúdo transformam curiosidade em confiança.",
    color: "#ea4335",
  },
  {
    letter: "D",
    title: "Decisão",
    text: "O cliente entra em contato, visita sua empresa e compra.",
    color: "#fbbc05",
  },
  {
    letter: "A",
    title: "Advocacia",
    text: "Clientes satisfeitos fortalecem sua reputação e fazem o Google recomendar sua empresa para novas pessoas.",
    color: "#34a853",
  },
];

/* ------------------------------------------------------------ vendedor 24h */

export const NOTIFICATIONS = [
  { app: "Google", time: "02:14", title: "Nova avaliação ★★★★★", text: "“Atendimento excelente, super recomendo!”" },
  { app: "WhatsApp", time: "06:48", title: "Novo cliente", text: "“Oi! Encontrei vocês no Google, ainda tem horário hoje?”" },
  { app: "Google", time: "07:02", title: "Pedido de rota", text: "Alguém está a caminho da sua empresa." },
  { app: "Telefone", time: "07:30", title: "Ligação recebida", text: "Cliente novo · origem: Perfil no Google" },
];

/* ---------------------------------------------------------------- serviços */

export const SERVICES = [
  {
    id: "perfil",
    kicker: "Google Meu Negócio",
    title: "Perfil em alta performance",
    text: "Categorias, palavras-chave, fotos, produtos e informações ajustados para o algoritmo local escolher você.",
  },
  {
    id: "reputacao",
    kicker: "Reputação",
    title: "Avaliações que constroem confiança",
    text: "Estratégia para gerar avaliações reais e respostas que transformam cada comentário em prova social.",
  },
  {
    id: "conteudo",
    kicker: "Conteúdo",
    title: "Postagens que convertem",
    text: "Posts, ofertas e fotos com intenção: o cliente sente a sua empresa antes mesmo de entrar.",
  },
  {
    id: "trafego",
    kicker: "Tráfego local",
    title: "Clientes de verdade, não curtidas",
    text: "Ligações, rotas, mensagens e visitas ao site. O foco é gente pronta para comprar na sua região.",
  },
  {
    id: "analise",
    kicker: "Análise",
    title: "Cada passo da jornada medido",
    text: "Relatórios claros do que mudou: onde você aparece, quantos chegaram e o que fazer a seguir.",
  },
];

/* ----------------------------------------------------------------- nichos */

export const NICHE_CARDS = [
  { label: "Restaurantes", src: "/img/photos/chef-smile.webp" },
  { label: "Clínicas", src: "/img/photos/dentist.webp" },
  { label: "Barbearias", src: "/img/photos/barber.webp" },
  { label: "Salões de beleza", src: "/img/photos/salon-owner.webp" },
  { label: "Cafeterias", src: "/img/photos/cafe-owner.webp" },
  { label: "Açougues e empórios", src: "/img/photos/butcher.webp" },
  { label: "Academias", src: "/img/niches/academia.webp" },
  { label: "Escritórios", src: "/img/photos/woman-exec.webp" },
  { label: "Lojas de bairro", src: "/img/photos/shop-owner.webp" },
  { label: "Advocacia", src: "/img/photos/man-exec.webp" },
  { label: "Estética", src: "/img/niches/estetica.webp" },
  { label: "Gastronomia", src: "/img/photos/chef-portrait.webp" },
];

/* ---------------------------------------------------------- como funciona */

export const STEPS = [
  { title: "Pelo WhatsApp", text: "Uma chamada com a tela compartilhada, sem que você precise sair da sua empresa." },
  { title: "10 a 15 minutos", text: "Objetiva e direta. O seu tempo é valioso e cada minuto dele é respeitado." },
  { title: "Você vê na hora", text: "O seu perfil atual, o que está afastando clientes e onde o concorrente está à frente." },
  { title: "Uma nova visão", text: "Você percebe o tamanho da oportunidade que vinha passando despercebida. Sem compromisso." },
];

/* ------------------------------------------------------------ depoimentos */

export const PROOFS = [
  { type: "video" as const, id: "Hv5peI44pws", thumb: "/img/photos/depo-video-1.webp", who: "Ponce Park & Villa", what: "Hospedagem e eventos" },
  { type: "image" as const, src: "/img/photos/depo-vassoler.webp", who: "Indicação de cliente", what: "“Um investimento que faz diferença.”" },
  { type: "video" as const, id: "qLQYJSRWyHw", thumb: "/img/photos/depo-video-2.webp", who: "Rações M&M", what: "Comércio local" },
];

/* -------------------------------------------------------------------- faq */

export const FAQ = [
  {
    q: "A conversa é paga?",
    a: "Não. A conversa é gratuita e sem compromisso. Mesmo que não avancemos para uma parceria, você sai com uma leitura nova e valiosa sobre o seu negócio.",
  },
  { q: "Quanto tempo dura?", a: "De 10 a 15 minutos. É uma conversa objetiva, focada no que realmente importa para a sua empresa." },
  {
    q: "Preciso instalar ou baixar algo?",
    a: "Nada. Acontece no seu próprio WhatsApp, em uma chamada com a tela compartilhada. Simples e direto.",
  },
  {
    q: "Vou ser obrigado a fechar alguma coisa?",
    a: "De forma alguma. O objetivo é te dar clareza. A decisão sobre os próximos passos é inteiramente sua.",
  },
  {
    q: "Atende qual região?",
    a: "Todo o Brasil. Como a conversa e o trabalho acontecem pelo Google e pelo WhatsApp, atendemos empresas de qualquer cidade do país.",
  },
  {
    q: "Em quanto tempo vejo resultado?",
    a: "Os primeiros ajustes no perfil costumam refletir em visibilidade nas semanas seguintes. O ritmo depende da sua região e da concorrência — e isso você já descobre no diagnóstico.",
  },
];
