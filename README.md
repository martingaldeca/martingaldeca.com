# Martin Galdeca's Personal Website - martingaldeca.com

![CI/CD Pipeline](https://github.com/martingaldeca/martingaldeca.com/actions/workflows/ci-cd.yml/badge.svg)
![Lines of Code](https://img.shields.io/tokei/lines/github/martingaldeca/martingaldeca.com)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js&style=flat-square)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?logo=react&style=flat-square)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&style=flat-square)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?logo=tailwind-css&style=flat-square)](https://tailwindcss.com/)
[![Playwright](https://img.shields.io/badge/Playwright-Test-green?logo=playwright&style=flat-square)](https://playwright.dev/)
[![Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://prettier.io/)

A modern, high-performance personal portfolio and blog built with the latest web technologies. This project serves as my digital garden for essays, thoughts, and showcase of my work.

## 🚀 Features

- **Standard & Modern Stack**: Built with Next.js 16 (App Router) & React 19.
- **Performance First**: Optimized with Turbopack and static generation for essays.
- **Internationalization**: Full i18n support (English/Spanish) using `next-intl`.
- **Mathematical Typography**: Essays rendered with KaTeX support via `react-markdown` and `rehype-katex`.
- **Theming**: Dark/Light mode with seamless transitions.
- **Animations**: Fluid interactions powered by Framer Motion.
- **Robust Testing**: Comprehensive E2E and Component testing suite with Playwright.
- **Quality Assurance**: Automated linting, formatting, and type-checking via GitHub Actions.

## 🛠️ Tech Stack

### Core
- **Framework**: [Next.js 16](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)

### Content & Logic
- **i18n**: [next-intl](https://next-intl-docs.vercel.app/)
- **Markdown**: `react-markdown`, `rehype-katex`, `remark-math`, `rehype-raw`

### Tooling & QA
- **Package Manager**: [pnpm](https://pnpm.io/)
- **Testing**: [Playwright](https://playwright.dev/)
- **Linting**: [ESLint](https://eslint.org/)
- **Formatting**: [Prettier](https://prettier.io/)
- **CI/CD**: GitHub Actions

## 📦 Installation & Setup

Ensure you have Node.js 20+ and pnpm installed.

```bash
# Clone the repository
git clone https://github.com/martingaldeca/martingaldeca.com.git
cd martingaldeca.com

# Install dependencies (frozen lockfile recommended)
pnpm install --frozen-lockfile

# Run development server
pnpm dev
```

Visit `http://localhost:3000` to see the application.

## ✅ Quality Assurance

This project maintains high code quality standards through automated checks.

### Run Tests

We use Playwright for both End-to-End (E2E) and Component Testing (CT).

```bash
# Run all tests (E2E + CT)
pnpm test

# Run only E2E tests
pnpm run test:e2e

# Run only Component tests
pnpm run test:ct
```

### Linting & Formatting

To verify code style and static analysis:

```bash
# Run full validation suite (Typecheck, Format check, Lint, Audit)
pnpm run validate

# Fix linting issues automatically
pnpm run lint:fix

# Format code with Prettier
pnpm run format
```

## 🚀 Deployment

The project is automatically deployed to production via GitHub Actions upon pushing to the `main` branch. The pipeline:

1.  **Validates**: Runs linting, type-checking, and audits.
2.  **Tests**: Executes the full Playwright test suite.
3.  **Builds**: Verifies the production build succeeds.
4.  **Deploys**: Updates the production server using SSH and PM2 (zero-downtime, utilizing `APP_PORT`).

---
*Created by [Martin Galdeca](https://martingaldeca.com)*
