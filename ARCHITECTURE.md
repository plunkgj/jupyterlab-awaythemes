# JupyterLab Awaythemes Architecture

This document explains how the JupyterLab theme extension works.

## Project Structure

```
jupyterlab-awaythemes/
├── src/index.ts          # Extension entry point (TypeScript)
├── style/
│   ├── index.css         # Main CSS entry (imports theme)
│   └── themes/
│       └── blackhole/
│           ├── index.css      # Theme entry (imports variables)
│           └── variables.css  # All theme colors/styles
├── package.json          # Node package config + JupyterLab extension config
├── pyproject.toml        # Python package config
└── jupyterlab_awaythemes/
    └── labextension/     # Built extension output (generated)
```

## How It Works

### 1. Theme Registration (`src/index.ts`)

The TypeScript code registers themes with JupyterLab's theme manager:

```typescript
manager.register({
  name: 'Blackhole',
  isLight: false,
  load: () => manager.loadCSS('jupyterlab-awaythemes/index.css'),
  ...
});
```

### 2. CSS Chain

When the theme loads:

1. `jupyterlab-awaythemes/index.css` → imports `themes/blackhole/index.css`
2. `themes/blackhole/index.css` → imports `variables.css`
3. `variables.css` → defines all the CSS custom properties (`--jp-*`)

### 3. Build Process (`jlpm build`)

1. **TypeScript** → compiles `src/index.ts` to `lib/index.js`
2. **Webpack** → bundles JS and CSS into `jupyterlab_awaythemes/labextension/`
3. Theme CSS lands at `labextension/themes/jupyterlab-awaythemes/index.css`

### 4. Python Package (`pyproject.toml`)

- Installs the built extension to `share/jupyter/labextensions/`
- JupyterLab discovers it there at runtime

## Key Files to Edit

| To change...          | Edit this file                          |
|-----------------------|-----------------------------------------|
| Theme colors/styles   | `style/themes/blackhole/variables.css`  |
| Add a new theme       | Create `style/themes/<name>/`, update `src/index.ts` |
| Extension metadata    | `package.json`                          |

## Development Workflow

1. Edit CSS in `style/themes/blackhole/variables.css`
2. Run `jlpm build`
3. Refresh JupyterLab
