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
    nome: "Teka",
    idade: "1 ano e meio",
    cateIdade: "adulto",
    porte: "Grande",
    temperamento: "Doce, Energética",
    tags: ["Dócil", "Ativo"],
    status: "Vacinado e Castrado",
    fotos: [
      "https://res.cloudinary.com/dx2hevcud/image/upload/v1768489293/teka1_zz4noo.png", 
      "https://res.cloudinary.com/dx2hevcud/image/upload/v1768489294/teka2_s5yyot.png", 
      "https://res.cloudinary.com/dx2hevcud/image/upload/v1768489294/teka3_d3ksve.png"],
    cor: "caramelo",
    instaLink: "https://www.instagram.com/reels/DTTFu6PkbFb/",
    descricaoCompleta:
      "É difícil quando um cãozinho sabe o que é ter um lar e, de repente, perde tudo. A Teka tinha uma família, mas o destino levou sua tutora. Ela não é um cão que nasceu na rua; é um cão de casa que ficou órfã. Doce, querida e com uma energia contagiante, Teka vê o tempo passar no abrigo esperando alguém para preencher esse vazio e retribuir todo o amor que ela tem guardado.",
  },
  {
    id: 2,
    nome: "Flocos",
    idade: "5 - 6 anos",
    cateIdade: "adulto",
    porte: "Pequeno",
    temperamento: "Tranquilo, Amoroso",
    tags: ["Tranquilo", "Dócil", "Sociável"],
    status: "Vacinado e Castrado",
    fotos: [
      "https://res.cloudinary.com/dx2hevcud/image/upload/v1768489291/flocos1_b4aarf.png", 
      "https://res.cloudinary.com/dx2hevcud/image/upload/v1768489291/flocos2_wld995.png", 
      "https://res.cloudinary.com/dx2hevcud/image/upload/v1768489291/flocos3_jqntg7.png"],
    cor: "BrasilEgito",
    instaLink: "https://www.instagram.com/reels/DSIUEXyEaZc/",
    descricaoCompleta:
      "Como explicar que o Flocos espera há 4 anos? Ele é simplesmente perfeito. Um lorde que adora tomar banho, receber massagem e ganha todo mundo na doçura. O maior diferencial? Ele é super sociável, convive bem com outros cães e é tão tranquilo que se dá bem até com gatos! É um doce (creme com chocolate) que só precisa de uma chance para mostrar que é o companheiro da vida toda.",
  },
  {
    id: 3,
    nome: "Romeu",
    idade: "3 - 4 anos",
    cateIdade: "adulto",
    porte: "Pequeno",
    temperamento: "Tranquilo, Dócil",
    tags: ["Tranquilo", "Dócil"],
    status: "Vacinado e Castrado",
    fotos: [
      "https://res.cloudinary.com/dx2hevcud/image/upload/v1768489291/romeu1_e0r4ni.png", 
      "https://res.cloudinary.com/dx2hevcud/image/upload/v1768489292/romeu2_hjdrdw.png", 
      "https://res.cloudinary.com/dx2hevcud/image/upload/v1768489292/romeu3_uzora9.png"],
    cor: "BrasilEgito",
    instaLink: "https://www.instagram.com/reels/DTTW2DbCVJy/",
    descricaoCompleta:
      "Romeu carrega nos olhos a profundidade de quem já sofreu muito — atropelamento, fome e abandono — mas escolheu continuar amando. Ele é calmo, delicado e tem um jeito que derrete qualquer alma boa. Enquanto tantos são adotados, ele continua invisível. Romeu não pede luxo, apenas um cantinho seguro, um colo e alguém que o faça sentir que finalmente pertence a um lar de verdade.",
  },
  {
    id: 4,
    nome: "Ruby",
    idade: "1 ano",
    cateIdade: "adulto",
    porte: "Médio",
    temperamento: "Doce, Cheia de vida",
    tags: ["Dócil", "Ativo", "Resiliente"],
    status: "Vacinada e Castrada",
    fotos: [
      "https://res.cloudinary.com/dx2hevcud/image/upload/v1768489293/ruby1_cmvldt.png", 
      "https://res.cloudinary.com/dx2hevcud/image/upload/v1768489293/ruby2_ppbaml.png", 
      "https://res.cloudinary.com/dx2hevcud/image/upload/v1768489293/ruby3_wj8uze.png"],
    cor: "pretinho",
    instaLink: "https://www.instagram.com/reels/DTX94fwEbqi/",
    descricaoCompleta:
      "Ruby é a prova viva de que o amor salva. Resgatada grávida em dias frios, ela foi uma mãe heroína e ainda venceu uma batalha contra o câncer (TVT). Com apenas 1 aninho, porte médio e jeitinho de lobinha, ela já está totalmente curada, castrada e pronta para viver. Mesmo após tudo o que passou, Ruby não perdeu a doçura: é confiante, ama carinho e seu rabinho não para de balançar. Ela só precisa de uma chance para ser a alegria da sua casa.",
  },

  {
    id: 5,
    nome: "Maylon",
    idade: "5 anos",
    cateIdade: "adulto",
    porte: "Médio",
    temperamento: "Tranquilo, Carinhoso",
    tags: ["Tranquilo", "Dócil", "Resiliente"],
    status: "Vacinado e Castrado",
    fotos: [
      "https://res.cloudinary.com/dx2hevcud/image/upload/v1768857591/Maylon_1_erbrtw.jpg",
      "https://res.cloudinary.com/dx2hevcud/image/upload/v1768857592/Maylon_2_xvaqbh.jpg",
      "https://res.cloudinary.com/dx2hevcud/image/upload/v1768857592/Maylon_3_fcgjyl.jpg",
    ],
    cor: "caramelo",
    descricaoCompleta:
      "Maylon é daqueles cãozinhos que chegam devagar, conquistam no olhar e abraçam a gente com a própria doçura. Ele está há 4 anos no abrigo e, mesmo assim, nunca perdeu a delicadeza e a esperança. Maylon não pede muito, só quer pertencer e ser amado. Acordar todos os dias sabendo que, enfim, encontrou seu lugar no mundo.",
  },
  {
    id: 6,
    nome: "Docinho",
    idade: "2 anos",
    cateIdade: "adulto",
    porte: "Médio",
    temperamento: "Amável, Charmosa",
    tags: ["Dócil", "Tranquilo"],
    status: "Vacinada e Castrada",
    fotos: [
      "https://res.cloudinary.com/dx2hevcud/image/upload/v1768857594/Docinho_1_uwcwrw.jpg", 
      "https://res.cloudinary.com/dx2hevcud/image/upload/v1768857593/Docinho_2_kgrlvw.jpg",
      "https://res.cloudinary.com/dx2hevcud/image/upload/v1768857594/Docinho_3_xccuqg.jpg",
    ],
    cor: "caramelo",
    descricaoCompleta:
      "Docinho é uma caramelo puro charme! Tranquila, amável e com um jeitinho que derrete qualquer coração. Essa princesa linda só precisa de uma chance para mostrar todo o amor que tem pra dar. Ela sonha em passar o Natal no colo de uma família especial… quem sabe a sua?",
  },
  {
    id: 7,
    nome: "David Bowie",
    idade: "4 anos",
    cateIdade: "adulto",
    porte: "Médio",
    temperamento: "Doce, Encantador",
    tags: ["Dócil", "Carinhoso"],
    status: "Vacinado e Castrado",
    fotos: [
      "https://res.cloudinary.com/dx2hevcud/image/upload/v1768857592/David_Bowie_1_nb6qqc.jpg", 
      "https://res.cloudinary.com/dx2hevcud/image/upload/v1768857593/David_Bowie_2_xmrvyh.jpg",
      "https://res.cloudinary.com/dx2hevcud/image/upload/v1768857593/David_Bowie_3_pb8zbw.jpg",
    ],
    cor: "BrasilEgito",
    descricaoCompleta:
      "David Bowie tem esse nome por conta de seus olhos únicos: um azul e outro verde. Foi abandonado ainda bebê e cresceu no abrigo vendo outros cães irem embora. É impossível olhar pro Bowie e não sentir algo mexer por dentro. Ele carrega uma beleza única e um olhar que parece pedir silenciosamente: 'Me escolhe também?'. Ele é doce, carinhoso e encantador.",
  },
  {
    id: 8,
    nome: "Vitório",
    idade: "Jovem Adulto",
    cateIdade: "adulto",
    porte: "Médio",
    temperamento: "Amoroso, Especial",
    tags: ["Dócil", "Resiliente"],
    status: "Vacinado e Castrado",
    fotos: [
      "https://res.cloudinary.com/dx2hevcud/image/upload/v1768857595/Vit%C3%B3rio_hufqbl.jpg",
    ],
    cor: "pretinho",
    descricaoCompleta:
      "Se existe um doguinho que nasceu para ser amado, é ele. Vitório chegou ao mundo único, especial, e com um coração enorme pedindo apenas uma chance. Ele só quer aquilo que todo cãozinho merece: um colo pra chamar de seu. Ele segue no abrigo aguardando uma oportunidade de ser feliz e descobrir a vida aqui fora.",
  },
  {
    id: 9,
    nome: "Francisco",
    idade: "8 anos",
    cateIdade: "idoso",
    porte: "Médio",
    temperamento: "Muito Tranquilo, Amável",
    tags: ["Tranquilo", "Sociável"],
    status: "Vacinado e Castrado",
    fotos: [
      "https://res.cloudinary.com/dx2hevcud/image/upload/v1768857591/Francisco_1_j9tbjc.jpg", 
      "https://res.cloudinary.com/dx2hevcud/image/upload/v1768857591/Francisco_2_q4ehnc.jpg",
    ],
    cor: "peludinhos",
    descricaoCompleta:
      "Francisco é um jovem senhor irresistível de 8 anos. Um cãozinho extremamente tranquilo e amável que não desiste de encontrar um lar amoroso e calmo, igual a ele. Perfeito para quem busca um companheiro que já passou da fase de destruir coisas e só quer paz e amor.",
  },
  {
    id: 10,
    nome: "Wisky",
    idade: "Adulto",
    cateIdade: "adulto",
    porte: "Médio",
    temperamento: "Extremamente Carinhoso",
    tags: ["Dócil", "Carinhoso", "Sociável"],
    status: "Vacinado e Castrado",
    fotos: [
      "https://res.cloudinary.com/dx2hevcud/image/upload/v1768857595/Wisky_1_z1tpw7.jpg", 
      "https://res.cloudinary.com/dx2hevcud/image/upload/v1768857595/Wisky_2_gdsga6.jpg",
      "https://res.cloudinary.com/dx2hevcud/image/upload/v1768857596/Wisky_3_dhkyyw.jpg",
    ],
    cor: "caramelo",
    descricaoCompleta:
      "Ele não pede muito… Só um lar, um colo e alguém pra amar. O Wisky é conhecido por ser o cãozinho mais carinhoso e fofo do abrigo, mas espera há tempo demais. É gracioso, dócil e temos certeza que sua família está por aí.",
  },
  {
    id: 11,
    nome: "Eros",
    idade: "2 anos",
    cateIdade: "adulto",
    porte: "Pequeno",
    temperamento: "Tímido, Leal",
    tags: ["Tranquilo", "Resiliente"],
    status: "Vacinado e Castrado",
    fotos: [
      "https://res.cloudinary.com/dx2hevcud/image/upload/v1768857594/Eros_1_cmhyrj.jpg", 
      "https://res.cloudinary.com/dx2hevcud/image/upload/v1768857594/Eros_2_ixkf1v.jpg",
      "https://res.cloudinary.com/dx2hevcud/image/upload/v1768857591/Eros_3_mgwmya.jpg",
    ],
    cor: "pretinho",
    descricaoCompleta:
      "Eros precisa de uma família muito especial, pois ele é capaz de ficar paralisado de medo. Porém, depois que confia, ele se entrega totalmente, sobe no colo e adora carinho. A confiança nasce no dia a dia. Você é essa família especial que vai transformar a vida do Eros?",
  },
  {
    id: 12,
    nome: "Pistache",
    idade: "1 ano",
    cateIdade: "adulto",
    porte: "Médio",
    temperamento: "Alegre, Brincalhão",
    tags: ["Ativo", "Dócil"],
    status: "Castrado, Vacinas em andamento",
    fotos: [
      "https://res.cloudinary.com/dx2hevcud/image/upload/v1768857594/Pistache_1_vpo4ae.jpg", 
      "https://res.cloudinary.com/dx2hevcud/image/upload/v1768857594/Pistache_2_dlkfjg.jpg",
      "https://res.cloudinary.com/dx2hevcud/image/upload/v1768857594/Pistache_3_tt21rr.jpg",
    ],
    cor: "fiapoManga",
    descricaoCompleta:
      "Pistache foi resgatado após ser amarrado em um poste, mas é impressionante como ele consegue mostrar alegria depois de tanto sofrimento. Ele só quer amar, ter um cesto de brinquedos e passear no parque. Sonha em brincar de bolinha com sua nova família.",
  },
  {
    id: 13,
    nome: "Danny DeVito",
    idade: "1 ano",
    cateIdade: "adulto",
    porte: "Pequeno",
    temperamento: "Alegre, Energético",
    tags: ["Ativo", "Sociável", "Dócil"],
    status: "Vacinado e Castrado",
    fotos: [
      "https://res.cloudinary.com/dx2hevcud/image/upload/v1768857592/Danny_DeVito_1_aavgun.jpg", 
      "https://res.cloudinary.com/dx2hevcud/image/upload/v1768857592/Danny_DeVito_2_ts8rkt.jpg",
      "https://res.cloudinary.com/dx2hevcud/image/upload/v1768857592/Danny_DeVito_3_wnxb0h.jpg",
    ],
    cor: "peludinhos",
    descricaoCompleta:
      "Danny DeVito é uma figuraça! Alegria em forma de cachorro. Ele é muito engraçado, cheio de energia e AMA crianças. Se você gosta de um cãozinho alegre para iluminar a casa, vai amar o Danny.",
  },
  {
    id: 14,
    nome: "Bob",
    idade: "4 anos",
    cateIdade: "adulto",
    porte: "Médio",
    temperamento: "Tranquilo, Companheiro",
    tags: ["Tranquilo", "Dócil"],
    status: "Vacinado e Castrado",
    fotos: [
      "https://res.cloudinary.com/dx2hevcud/image/upload/v1768857591/Bob_1_i9ir22.jpg", 
      "https://res.cloudinary.com/dx2hevcud/image/upload/v1768857592/Bob_3_a62u2v.jpg",
      "https://res.cloudinary.com/dx2hevcud/image/upload/v1768857595/Bob_2_ftabvq.jpg",
    ],
    cor: "caramelo",
    descricaoCompleta:
      "Bob está pronto para viver o amor! Carinhoso, tranquilo e super companheiro. Depois de tanto tempo no abrigo vendo amigos indo embora, ele continua com o mesmo olhar doce, acreditando que um dia será a vez dele. Só quer um cantinho e um colo.",
  },
  {
    id: 15,
    nome: "Pudim",
    idade: "3 anos",
    cateIdade: "adulto",
    porte: "Médio",
    temperamento: "Dócil, Sociável",
    tags: ["Dócil", "Sociável", "Resiliente"],
    status: "Vacinado e Castrado",
    fotos: [
      "https://res.cloudinary.com/dx2hevcud/image/upload/v1768857595/Pudim_1_gj5c6y.jpg", 
      "https://res.cloudinary.com/dx2hevcud/image/upload/v1768857595/Pudim_2_pjy2qj.jpg",
    ],
    cor: "caramelo",
    descricaoCompleta:
      "Pudim é um sobrevivente. Viveu na rua e sofreu muito (foi ferido por um motoqueiro), mas não perdeu seu jeito alegre e amoroso de ser. É extremamente dócil com pessoas, ama passear, se comporta bem no carro e anda tranquilo na guia. Se dá bem com outros cães do abrigo.",
  },
  {
    id: 16,
    nome: "Peter",
    idade: "3 anos",
    cateIdade: "adulto",
    porte: "Médio",
    temperamento: "Animado, Carinhoso",
    tags: ["Ativo", "Resiliente", "Dócil"],
    status: "Vacinado e Castrado",
    fotos: [
      "https://res.cloudinary.com/dx2hevcud/image/upload/v1768857593/Peter_1_jvkwnc.jpg", 
      "https://res.cloudinary.com/dx2hevcud/image/upload/v1768857593/Peter_2_c88dz7.jpg",
    ],
    cor: "pretinho",
    descricaoCompleta:
      "Peter chegou ao abrigo com cinomose, lutou bravamente e venceu! Ficaram pequenas sequelas na boquinha e patinha, mas nada que impeça ele de viver com muita energia. Ele adora brincar, é animado e está prontíssimo para dar e receber amor. Precisa de uma família que enxergue além das marcas do passado.",
  },
];