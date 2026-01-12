# Abrigo do Wlad - Plataforma Web

Repositório oficial do site do Abrigo do Wlad. Esta aplicação serve como a principal plataforma digital para a divulgação de animais para adoção, campanhas de arrecadação e transparência das atividades da organização.

O projeto foi construído focando em performance e componentização, permitindo escalabilidade fácil para novas funcionalidades.

## Tecnologias

* **React** e **TypeScript**
* **Vite** (Build tool)
* **CSS Modules** (Estilização escopada)
* **React Router DOM** (Roteamento)
* **Lucide React** (Ícones)

## Estrutura e Componentes

Abaixo está listada a estrutura atual do projeto. Clique no nome do diretório ou componente para acessar diretamente o código-fonte correspondente.

- [src](./src)
  - [components](./src/components)
    - [ActionCards](./src/components/ActionCards) - Cards interativos da Home (Adoção, Doação PIX e Tampinhas).
    - [DogCard](./src/components/DogCard) - Card de visualização rápida do animal na listagem.
    - [DogModal](./src/components/DogModal) - Modal detalhado com carrossel de fotos, informações completas e link para Instagram.
    - [Footer](./src/components/Footer) - Rodapé global com links de navegação e redes sociais.
    - [Header](./src/components/Header) - Barra de navegação fixa com comportamento dinâmico ao rolar a página.
    - [Hero](./src/components/Hero) - Banner principal da página inicial com imagem de fundo e chamadas para ação.
    - [HeroSmall](./src/components/HeroSmall) - Banner reutilizável e menor para o topo das páginas internas.
    - [HistorySection](./src/components/HistorySection) - Seção narrativa com animação de entrada (Scroll Reveal).
    - [ScrollToTop](./src/components/ScrollToTop) - Componente utilitário que reseta a posição da rolagem ao navegar entre rotas.
  - [pages](./src/pages)
    - [Adopt](./src/pages/Adopt) - Página de Adoção com grid de animais e filtros avançados (Idade, Temperamento e Cores).
    - [Home](./src/pages/Home) - Página inicial que orquestra os componentes principais.
  - [assets](./src/assets) - Imagens estáticas (Logos, fotos dos animais).
  - [routes.tsx](./src/routes.tsx) - Configuração das rotas da aplicação (incluindo redirecionamento de 404).
  - [main.tsx](./src/main.tsx) - Ponto de entrada da aplicação React.
  - [index.css](./src/index.css) - Variáveis CSS globais, reset, classes utilitárias e comportamento de scroll suave.

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
