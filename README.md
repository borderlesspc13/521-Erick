# 521 Erick — Monorepo

Projeto full-stack com app mobile (React Native) e sistema web (Next.js), compartilhando Firebase e princípios de Clean Architecture.

## Estrutura

```
521-Erick/
├── mobile/          # App React Native (Expo)
└── web/             # Sistema web (Next.js App Router)
```

### Camadas (ambos os projetos)

| Camada | Responsabilidade |
|--------|------------------|
| `domain/` | Entidades, interfaces de repositório, use cases, schemas Zod |
| `infrastructure/` | Implementações Firebase, injeção de dependências |
| `presentation/` | Componentes UI, telas/páginas |
| `core/` | Configurações, tema, utilitários |

## Design System

Paleta baseada em psicologia das cores:

- **Indigo (primary)** — confiança, estabilidade, profissionalismo
- **Teal (secondary)** — calma, equilíbrio, crescimento
- **Amber (accent)** — energia, otimismo, CTAs secundários
- **Neutros quentes** — conforto visual, redução de fadiga

## Pré-requisitos

- Node.js 20+
- npm
- [Expo Go](https://expo.dev/go) (para testar o mobile)

## Configuração

### 1. Firebase

1. Crie um projeto no [Firebase Console](https://console.firebase.google.com)
2. Copie as credenciais para os arquivos `.env`:

```bash
# Mobile
cp mobile/.env.example mobile/.env

# Web
cp web/.env.example web/.env
```

### 2. Mobile

```bash
cd mobile
npm install
npm start
```

### 3. Web

```bash
cd web
npm install
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

## Scripts

| Projeto | Comando | Descrição |
|---------|---------|-----------|
| mobile | `npm start` | Inicia o Expo Dev Server |
| mobile | `npm run android` | Abre no emulador Android |
| web | `npm run dev` | Servidor de desenvolvimento |
| web | `npm run build` | Build de produção |

## Próximos passos sugeridos

- [ ] Configurar autenticação (login/registro)
- [ ] Definir entidades de domínio do negócio
- [ ] Configurar Firestore Security Rules
- [ ] Adicionar navegação no mobile (Expo Router)
- [ ] Criar rotas protegidas no web (middleware)
