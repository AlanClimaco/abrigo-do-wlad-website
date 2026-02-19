# Abrigo do Wlad - Plataforma Web

Repositório oficial do site do Abrigo do Wlad. Plataforma digital para divulgação de animais para adoção, campanhas de arrecadação e transparência das atividades da organização.

Projeto construído com foco em performance e componentização, facilitando a escalabilidade.

## Tecnologias

- **React** e **TypeScript**
- **Vite** (Build tool)
- **CSS Modules** (Estilização escopada)
- **React Router DOM** (Roteamento)
- **Lucide React** (Ícones)
- **Radix UI** (Componentes acessíveis)

## Estrutura e Componentes

Abaixo está listada a estrutura atual do projeto. Clique no nome do diretório ou componente para acessar diretamente o código-fonte correspondente.

- [api](./api/)
  - [get-hero-dog](./api/get-hero-dog.ts) — Retorna o animal em destaque armazenado no cache.
  - [update-hero-dog](./api/update-hero-dog.ts) — Seleciona um animal aleatório da db e atualiza o cache.
- [src](./src)
  - [components](./src/components) — Componentes globais reutilizáveis.
    - [Footer](./src/components/Footer) — Rodapé com navegação e contato.
    - [Header](./src/components/Header) — Barra de navegação fixa.
    - [Hero](./src/components/Hero) — Banner principal da Home.
    - [HeroSmall](./src/components/HeroSmall) — Banner reduzido para páginas internas.
    - [ScrollToTop](./src/components/ScrollToTop) — Reseta a rolagem ao trocar de rota.
    - [ThemeToggle](./src/components/ThemeToggle) — Alternância de tema (dark/light).
  - [pages](./src/pages) — Páginas da aplicação.
    - [Home](./src/pages/Home) — Página inicial.
      - [components](./src/pages/Home/components/)
        - [ActionCards](./src/pages/Home/components/ActionCards) — Cards de ação (Adoção, Doação e Reciclagem).
        - [HistorySection](./src/pages/Home/components/HistorySection) — Seção narrativa do abrigo.
        - [FaqSection](./src/pages/Home/components/FaqSection/) — Perguntas frequentes.
    - [Adopt](./src/pages/Adopt) — Listagem de animais com filtros (idade, temperamento, cor).
      - [components](./src/pages/Adopt/components/)
        - [DogCard](./src/pages/Adopt/components/DogCard) — Card resumido do animal.
        - [DogModal](./src/pages/Adopt/components/DogModal) — Modal com detalhes, carrossel e link do Instagram.
    - [Form](./src/pages/Form) — Formulário de pré-adoção.
    - [History](./src/pages/About) — História e informações sobre o abrigo.
    - [Recycle](./src/pages/Recycle) — Pontos de coleta para reciclagem.
  - [assets](./src/assets)
    - [images](./src/assets/images) — Imagens estáticas.
  - [services](./src/services) — Comunicação com serviços externos.
    - [dogService](./src/services/dogService.ts) — Consultas e filtros dos animais no Firestore.
  - [routes.tsx](./src/routes.tsx) — Configuração de rotas (inclui redirecionamento 404).
  - [main.tsx](./src/main.tsx) — Ponto de entrada da aplicação.
  - [index.css](./src/index.css) — Variáveis CSS globais, reset e utilitários.

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
