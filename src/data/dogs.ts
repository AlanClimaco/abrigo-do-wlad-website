export const CORES_MAP: Record<string, string> = {
  caramelo: "Caramelo (Patrimônio Nacional)",
  pretinho: "Pretinho (Nada Básico)",
  fiapoManga: "Fiapo de Manga (Arrepiados)",
  peludinhos: "Peludinhos",
  BrasilEgito: "Mistura do Brasil com Egito",
};

export interface DogProps {
  id: number;
  nome: string;
  idade: string;
  cateIdade: "filhote" | "adulto" | "idoso";
  porte: "Pequeno" | "Médio" | "Grande";
  temperamento: string;
  tags: string[];
  status: string;
  fotos: string[];
  cor: string;
  instaLink?: string;
  descricaoCompleta?: string;
}

export const DOGS_DATA: DogProps[] = [
  {
    id: 1,
    nome: "Manu",
    idade: "1 ano e meio",
    cateIdade: "adulto",
    porte: "Médio",
    temperamento: "Dócil, Amorosa",
    tags: ["Dócil", "Sociável"],
    status: "Vacinado e Castrado",
    fotos: ["/dogs/manu1.png", "/dogs/manu2.png", "/dogs/manu3.png"],
    cor: "caramelo",
    instaLink: "https://www.instagram.com/reels/DTS7xAmEfxb/",
    descricaoCompleta:
      "A Manu é a prova viva de que o amor cura qualquer ferida. Resgatada de um sítio em estado de pura tristeza e magreza, ela renasceu. Hoje, é uma caramela radiante, cheia de vida e que carrega uma energia boa por onde passa. Apesar de tanta beleza e docilidade, ela ainda espera pelo coração especial que vai notar o quanto ela é incrível e alegre.",
  },
  {
    id: 2,
    nome: "Teka",
    idade: "1 ano e meio",
    cateIdade: "adulto",
    porte: "Grande",
    temperamento: "Doce, Energética",
    tags: ["Dócil", "Ativo"],
    status: "Vacinado e Castrado",
    fotos: ["/dogs/teka1.png", "/dogs/teka2.png", "/dogs/teka3.png"],
    cor: "caramelo",
    instaLink: "https://www.instagram.com/reels/DTTFu6PkbFb/",
    descricaoCompleta:
      "É difícil quando um cãozinho sabe o que é ter um lar e, de repente, perde tudo. A Teka tinha uma família, mas o destino levou sua tutora. Ela não é um cão que nasceu na rua; é um cão de casa que ficou órfã. Doce, querida e com uma energia contagiante, Teka vê o tempo passar no abrigo esperando alguém para preencher esse vazio e retribuir todo o amor que ela tem guardado.",
  },
  {
    id: 3,
    nome: "Flocos",
    idade: "5 - 6 anos",
    cateIdade: "adulto",
    porte: "Pequeno",
    temperamento: "Tranquilo, Amoroso",
    tags: ["Tranquilo", "Dócil", "Sociável"],
    status: "Vacinado e Castrado",
    fotos: ["/dogs/flocos1.png", "/dogs/flocos2.png", "/dogs/flocos3.png"],
    cor: "BrasilEgito",
    instaLink: "https://www.instagram.com/reels/DSIUEXyEaZc/",
    descricaoCompleta:
      "Como explicar que o Flocos espera há 4 anos? Ele é simplesmente perfeito. Um lorde que adora tomar banho, receber massagem e ganha todo mundo na doçura. O maior diferencial? Ele é super sociável, convive bem com outros cães e é tão tranquilo que se dá bem até com gatos! É um doce (creme com chocolate) que só precisa de uma chance para mostrar que é o companheiro da vida toda.",
  },
  {
    id: 4,
    nome: "Romeu",
    idade: "3 - 4 anos",
    cateIdade: "adulto",
    porte: "Pequeno",
    temperamento: "Tranquilo, Dócil",
    tags: ["Tranquilo", "Dócil"],
    status: "Vacinado e Castrado",
    fotos: ["/dogs/romeu1.png", "/dogs/romeu2.png", "/dogs/romeu3.png"],
    cor: "BrasilEgito",
    instaLink: "https://www.instagram.com/reels/DTTW2DbCVJy/",
    descricaoCompleta:
      "Romeu carrega nos olhos a profundidade de quem já sofreu muito — atropelamento, fome e abandono — mas escolheu continuar amando. Ele é calmo, delicado e tem um jeito que derrete qualquer alma boa. Enquanto tantos são adotados, ele continua invisível. Romeu não pede luxo, apenas um cantinho seguro, um colo e alguém que o faça sentir que finalmente pertence a um lar de verdade.",
  },
  {
    id: 5,
    nome: "Ruby",
    idade: "1 ano",
    cateIdade: "adulto",
    porte: "Médio",
    temperamento: "Doce, Cheia de vida",
    tags: ["Dócil", "Ativo", "Resiliente"],
    status: "Vacinada e Castrada",
    fotos: ["/dogs/ruby1.png", "/dogs/ruby2.png", "/dogs/ruby3.png"],
    cor: "pretinho",
    instaLink: "https://www.instagram.com/reels/DTX94fwEbqi/",
    descricaoCompleta:
      "Ruby é a prova viva de que o amor salva. Resgatada grávida em dias frios, ela foi uma mãe heroína e ainda venceu uma batalha contra o câncer (TVT). Com apenas 1 aninho, porte médio e jeitinho de lobinha, ela já está totalmente curada, castrada e pronta para viver. Mesmo após tudo o que passou, Ruby não perdeu a doçura: é confiante, ama carinho e seu rabinho não para de balançar. Ela só precisa de uma chance para ser a alegria da sua casa.",
  },
];