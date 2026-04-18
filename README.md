# Abrigo do Wlad - Plataforma Web

Repositório oficial do site do Abrigo do Wlad. Plataforma digital para divulgação de animais para adoção, campanhas de arrecadação e transparência das atividades da organização.

Projeto construído com foco em performance e componentização, facilitando a escalabilidade.

## Tecnologias

- **React** e **TypeScript**
- **Vite** (Build tool)
- **CSS Modules** (Estilização escopada)
- **React Router** (Roteamento)
- **Lucide React** (Ícones)
- **Radix UI** (Componentes acessíveis)
- **Motion** (Animações)

## Estrutura e Componentes

Abaixo está listada a estrutura atual do projeto:

```
api/
├── get-hero-dog.ts          # Retorna o animal em destaque armazenado no cache
├── update-hero-dog.ts       # Seleciona um animal aleatório da db e atualiza o cache
└── _lib/
    └── firebase.ts
src/
├── components/              # Componentes globais reutilizáveis
│   ├── Footer/              # Rodapé com navegação e contato
│   ├── Header/              # Barra de navegação fixa
│   ├── Hero/                # Banner principal da Home
│   ├── HeroSmall/           # Banner reduzido para páginas internas
│   ├── ScrollToTop/         # Reseta a rolagem ao trocar de rota
│   └── ThemeToggle/         # Alternância de tema (dark/light)
├── pages/                   # Páginas da aplicação
│   ├── Home/                # Página inicial
│   │   └── components/
│   │       ├── ActionCards/  # Cards de ação (Adoção, Doação e Reciclagem)
│   │       ├── HistorySection/ # Seção narrativa do abrigo
│   │       └── FaqSection/  # Perguntas frequentes
│   ├── Adopt/               # Listagem de animais com filtros
│   │   └── components/
│   │       ├── DogCard/     # Card resumido do animal
│   │       └── DogModal/    # Modal com detalhes e carrossel
│   ├── Form/                # Formulário de pré-adoção
│   ├── About/               # História e informações sobre o abrigo
│   └── Recycle/             # Pontos de coleta para reciclagem
├── assets/
│   └── images/              # Imagens estáticas
├── services/                # Comunicação com serviços externos
│   └── dogService.ts        # Consultas e filtros dos animais no Firestore
├── routes.tsx               # Configuração de rotas (inclui redirecionamento 404)
├── main.tsx                 # Ponto de entrada da aplicação
└── index.css                # Variáveis CSS globais, reset e utilitários
```

## Instalação e Execução

Para rodar o projeto localmente:

1.  Clone este repositório.
2.  Instale as dependências:
    ```bash
    npm install
    ```
3.  Inicie o servidor local:
    ```bash
    npm run dev
    ```

## Autores

Desenvolvido por **Alan** e **Luis**.

## Licença

Este projeto é de propriedade exclusiva do Abrigo do Wlad. O código-fonte está disponível para fins de estudo e manutenção, mas a utilização comercial ou réplica da identidade visual sem autorização prévia é vedada. Todos os direitos reservados.
