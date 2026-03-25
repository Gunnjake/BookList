# Bookstore Frontend

## Bootstrap Features Used

This project uses Bootstrap for layout and UI styling throughout the bookstore flow.

Bootstrap features used:

- `row`, `col-12`, and `justify-content-center` in [BookPage.tsx](./src/pages/BookPage.tsx) for the main page layout using the Bootstrap Grid.
- `container` in [BuyPage.tsx](./src/pages/BuyPage.tsx) for centered page content.
- `pagination`, `page-item`, and `page-link` in [BookList.tsx](./src/components/BookList.tsx) for the page navigation controls.
- `btn`, `btn-primary`, `btn-dark`, `btn-outline-dark`, `btn-outline-danger`, `btn-danger`, and `btn-sm` across [BookList.tsx](./src/components/BookList.tsx), [BuyPage.tsx](./src/pages/BuyPage.tsx), and [CartPage.tsx](./src/pages/CartPage.tsx) for action buttons.
- `card`, `h-100`, and `shadow-sm` in [BookList.tsx](./src/components/BookList.tsx) for the storefront-style book listing cards.
- `badge`, `rounded-pill`, and `text-bg-light` in [BookList.tsx](./src/components/BookList.tsx) for category labels.

Two Bootstrap items that were added beyond the basic classwork patterns:

- `card h-100 shadow-sm` for equal-height product cards in the book listing grid.
- `badge rounded-pill text-bg-light` for pill-style category labels on each book card.

## React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
