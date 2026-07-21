---
name: ajiu9-eslint-config
description: Configuring @ajiu9/eslint-config for framework support, formatters, and rule overrides. Use when adding React/Vue/Svelte/Astro support, customizing rules, or setting up VS Code integration.
---

# @ajiu9/eslint-config

Handles both linting and formatting (no Prettier needed). Auto-detects TypeScript and Vue.

**Style**: Single quotes, no semicolons, sorted imports, dangling commas.

## Configuration Options

```js
import ajiu9 from '@ajiu9/eslint-config'

export default ajiu9({
  // Project type: 'lib' for libraries, 'app' (default) for applications
  type: 'lib',

  // Global ignores (extends defaults, doesn't override)
  ignores: ['**/fixtures', '**/dist'],

  // Stylistic options
  stylistic: {
    indent: 2,        // 2, 4, or 'tab'
    quotes: 'single', // or 'double'
  },

  // Framework support (auto-detected, but can be explicit)
  typescript: true,
  vue: true,

  // Disable specific language support
  jsonc: false,
  yaml: false,
})
```

## Framework Support

### Vue

Vue accessibility:

```js
export default ajiu9({
  vue: {
    a11y: true
  },
})
// Requires: pnpm add -D eslint-plugin-vuejs-accessibility
```

### React

```js
export default ajiu9({
  react: true,
})
// Requires: pnpm add -D @eslint-react/eslint-plugin eslint-plugin-react-hooks eslint-plugin-react-refresh
```

### Next.js

```js
export default ajiu9({
  nextjs: true,
})
// Requires: pnpm add -D @next/eslint-plugin-next
```

### Svelte

```js
export default ajiu9({
  svelte: true,
})
// Requires: pnpm add -D eslint-plugin-svelte
```

### Astro

```js
export default ajiu9({
  astro: true,
})
// Requires: pnpm add -D eslint-plugin-astro
```

### Solid

```js
export default ajiu9({
  solid: true,
})
// Requires: pnpm add -D eslint-plugin-solid
```

### UnoCSS

```js
export default ajiu9({
  unocss: true,
})
// Requires: pnpm add -D @unocss/eslint-plugin
```

## Formatters (CSS, HTML, Markdown)

For files ESLint doesn't handle natively:

```js
export default ajiu9({
  formatters: {
    css: true,      // Format CSS, LESS, SCSS (uses Prettier)
    html: true,     // Format HTML (uses Prettier)
    markdown: 'prettier' // or 'dprint'
  }
})
// Requires: pnpm add -D eslint-plugin-format
```

## Rule Overrides

### Global overrides

```js
export default ajiu9(
  {
    // First argument: ajiu9 config options
  },
  // Additional arguments: ESLint flat configs
  {
    rules: {
      'style/semi': ['error', 'never'],
    },
  }
)
```

### Per-integration overrides

```js
export default ajiu9({
  vue: {
    overrides: {
      'vue/operator-linebreak': ['error', 'before'],
    },
  },
  typescript: {
    overrides: {
      'ts/consistent-type-definitions': ['error', 'interface'],
    },
  },
})
```

### File-specific overrides

```js
export default ajiu9(
  { vue: true, typescript: true },
  {
    files: ['**/*.vue'],
    rules: {
      'vue/operator-linebreak': ['error', 'before'],
    },
  }
)
```

## Plugin Prefix Renaming

The config renames plugin prefixes for consistency:

| New Prefix | Original |
|------------|----------|
| `ts/*` | `@typescript-eslint/*` |
| `style/*` | `@stylistic/*` |
| `import/*` | `import-lite/*` |
| `node/*` | `n/*` |
| `yaml/*` | `yml/*` |
| `test/*` | `vitest/*` |
| `next/*` | `@next/next` |

Use the new prefix when overriding or disabling rules:

```ts
// eslint-disable-next-line ts/consistent-type-definitions
type Foo = { bar: 2 }
```

## Type-Aware Rules

Enable TypeScript type checking:

```js
export default ajiu9({
  typescript: {
    tsconfigPath: 'tsconfig.json',
  },
})
```

## Config Composer API

Chain methods for flexible composition:

```js
export default ajiu9()
  .prepend(/* configs before main */)
  .override('ajiu9/stylistic/rules', {
    rules: {
      'style/generator-star-spacing': ['error', { after: true, before: false }],
    }
  })
  .renamePlugins({
    'old-prefix': 'new-prefix',
  })
```

## Less Opinionated Mode

Disable Anthony's most opinionated rules:

```js
export default ajiu9({
  lessOpinionated: true
})
```

## Lint-Staged Setup

```json
{
  "simple-git-hooks": {
    "pre-commit": "pnpm lint-staged"
  },
  "lint-staged": {
    "*": "eslint --fix"
  }
}
```

```bash
pnpm add -D lint-staged simple-git-hooks
npx simple-git-hooks
```

## VS Code Settings

Add to `.vscode/settings.json`:

```jsonc
{
  "prettier.enable": false,
  "editor.formatOnSave": false,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit",
    "source.organizeImports": "never"
  },
  "eslint.rules.customizations": [
    { "rule": "style/*", "severity": "off", "fixable": true },
    { "rule": "format/*", "severity": "off", "fixable": true },
    { "rule": "*-indent", "severity": "off", "fixable": true },
    { "rule": "*-spacing", "severity": "off", "fixable": true },
    { "rule": "*-spaces", "severity": "off", "fixable": true },
    { "rule": "*-order", "severity": "off", "fixable": true },
    { "rule": "*-dangle", "severity": "off", "fixable": true },
    { "rule": "*-newline", "severity": "off", "fixable": true },
    { "rule": "*quotes", "severity": "off", "fixable": true },
    { "rule": "*semi", "severity": "off", "fixable": true }
  ],
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact",
    "vue",
    "html",
    "markdown",
    "json",
    "jsonc",
    "yaml",
    "toml",
    "xml",
    "astro",
    "svelte",
    "css",
    "less",
    "scss"
  ]
}
```

<!-- 
Source references:
- https://github.com/ajiu9/eslint-config
- https://raw.githubusercontent.com/ajiu9/eslint-config/refs/heads/main/README.md
-->
