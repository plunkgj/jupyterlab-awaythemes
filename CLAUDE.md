# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

**After any theme or code changes, always run:**
```bash
jlpm build && pip install -e . --no-build-isolation 2>&1 | tail -3
```
Then restart JupyterLab to see changes.

Other commands:
```bash
jlpm build:prod     # Production build
jlpm lint           # Run all linters (stylelint, prettier, eslint)
jlpm lint:check     # Check without fixing
jlpm watch          # Watch mode for development
```

## Architecture

This is a JupyterLab theme extension with multiple themes. The build produces a labextension that JupyterLab discovers at runtime.

**Theme registration**: `src/index.ts` registers all themes with JupyterLab's `IThemeManager`. Each theme loads CSS from `jupyterlab-awaythemes/<theme-name>/index.css`.

**CSS structure**: Each theme lives in `style/themes/<theme-name>/` with:
- `index.css` - imports variables
- `variables.css` - all `--jp-*` CSS custom properties

**Build process**:
1. `jlpm build` compiles TypeScript and runs the labextension builder
2. `scripts/build-themes.js` copies each theme's CSS to the labextension output
3. Each theme ends up at `labextension/themes/jupyterlab-awaythemes/<theme-name>/index.css`

**Adding a theme**:
1. Create `style/themes/<name>/` with `index.css` and `variables.css`
2. Add an entry to the `themes` array in `src/index.ts`
3. Run the build command

## Key Files

- `style/themes/*/variables.css` - Theme colors and styles
- `src/index.ts` - Theme registration (add new themes here)
- `scripts/build-themes.js` - Post-build script that copies theme CSS
- `package.json` - Extension config
- `pyproject.toml` - Python package config
