# Abrigo do Wlad - Plataforma Web

Repositório oficial do site do Abrigo do Wlad. Plataforma digital para divulgação de animais para adoção, campanhas de arrecadação e transparência das atividades da organização.

Este projeto foi criado para suprir uma necessidade crítica da ONG: a listagem e divulgação de animais. Anteriormente, o abrigo utilizava arquivos em PDF para lidar com as adoções, um processo que se mostrava ineficiente e insustentável. Com a plataforma web, a ONG agora possui um catálogo dinâmico, acessível e de fácil manutenção.

## Funcionalidades

- 🐶 **Vitrine de Adoção:** Catálogo digital completo e filtrável dos animais disponíveis, aposentando as antigas listagens em PDF.
- 📝 **Solicitação de Adoção:** Formulário multi-etapas (_Wizard_) intuitivo para avaliação de possíveis tutores, garantindo a segurança e privacidade através da criptografia *client-side* de dados sensíveis antes do envio para a base de dados.
- ♻️ **Reciclagem Solidária:** Relação dos pontos de coleta parceiros para auxiliar nas arrecadações do abrigo.
- 🌓 **Acessibilidade e Usabilidade:** Suporte a tema claro/escuro nativo, animações fluidas e design responsivo.

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

```text
api/                     # Serverless functions (Vercel)
├── create-adoption-application.ts # Processa e valida o envio de formulários
├── get-hero-dog.ts      # Retorna o animal em destaque armazenado no cache
├── update-hero-dog.ts   # Seleciona um animal aleatório da db e atualiza o cache
└── _lib/                # Lógica interna da API
src/
├── assets/              # Arquivos estáticos e metadados JSON
├── components/          # Componentes globais e reutilizáveis
│   ├── common/          # Componentes genéricos
│   ├── ui/              # Componentes de interface base (Radix UI, botões, inputs, etc)
│   ├── Header/          # Barra de navegação fixa
│   └── Footer/          # Rodapé com informações e links
├── hooks/               # Custom hooks
├── lib/                 # Utilitários e configurações atrelados a libs externas
├── pages/               # Páginas e rotas da aplicação
│   ├── About/           # História e equipe do abrigo
│   ├── Adopt/           # Vitrine com os animais disponíveis
│   ├── BetaForm/        # Formulário multi-etapas preenchido por candidatos (Wizard)
│   ├── Home/            # Landing page principal
│   ├── Legal/           # Política de Privacidade e Termos de Uso
│   └── Recycle/         # Mapa e listagem de postos de arrecadação
├── services/            # Camada de comunicação de dados (Firebase, APIs externas)
├── types/               # Declarações de tipagem global estrita (TypeScript)
├── utils/               # Funções auxiliares (formatação, cdn, etc)
├── routes.tsx           # Configuração central de roteamento da aplicação
├── main.tsx             # Ponto de entrada raiz (Root provider)
└── index.css            # Regras e estilos globais css-modules base
```

## Instalação e Execução

Para rodar o projeto localmente:

1.  Clone este repositório.
2.  Instale as dependências:
    ```bash
    npm install
    ```
3.  Configure as variáveis de ambiente baseando-se no arquivo `.env.example`. Crie um arquivo `.env` na raiz do projeto:

    ```env
    NODE_ENV=development

    # Firebase
    VITE_FIREBASE_API_KEY=
    VITE_FIREBASE_AUTH_DOMAIN=
    VITE_FIREBASE_PROJECT_ID=
    VITE_FIREBASE_STORAGE_BUCKET=
    VITE_FIREBASE_MESSAGING_SENDER_ID=
    VITE_FIREBASE_APP_ID=

    # Segurança e Integrações Externas
    ALLOWED_ORIGIN=
    RECAPTCHA_PUBLIC_KEY=
    RECAPTCHA_SECRET_KEY=

    # Configurações de E-mail / Painel Admin
    GMAIL_USER=
    GMAIL_USER_PASSWORD=
    ADMIN_PANEL_URL=
    ```

4.  Inicie o servidor local:
    ```bash
    npm run dev
    ```

## Autores

Desenvolvido e mantido por **[Alan](https://github.com/AlanClimaco)** e **[Luis](https://github.com/spantalho)**.

## Licença

Este projeto é de propriedade exclusiva do Abrigo do Wlad. O código-fonte está disponível para fins de estudo e manutenção, mas a utilização comercial ou réplica da identidade visual sem autorização prévia é vedada. Todos os direitos reservados.
