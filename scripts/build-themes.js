/**
 * Build script to copy individual theme CSS files to the labextension output.
 * This enables multiple themes from a single extension.
 */

const fs = require('fs');
const path = require('path');

const THEMES_SRC = path.join(__dirname, '..', 'style', 'themes');
const THEMES_DEST = path.join(
  __dirname,
  '..',
  'jupyterlab_awaythemes',
  'labextension',
  'themes',
  'jupyterlab-awaythemes'
);

// Get all theme directories
const themes = fs
  .readdirSync(THEMES_SRC, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name);

console.log(`Building ${themes.length} theme(s): ${themes.join(', ')}`);

// Copy each theme's CSS files
themes.forEach(theme => {
  const themeSrc = path.join(THEMES_SRC, theme);
  const themeDest = path.join(THEMES_DEST, theme);

  // Create destination directory
  fs.mkdirSync(themeDest, { recursive: true });

  // Read and concatenate all CSS files for this theme
  const indexCss = path.join(themeSrc, 'index.css');
  const variablesCss = path.join(themeSrc, 'variables.css');

  let cssContent = '';

  // Read variables.css first (if exists)
  if (fs.existsSync(variablesCss)) {
    cssContent += fs.readFileSync(variablesCss, 'utf8');
    cssContent += '\n';
  }

  // Read index.css and replace @import with actual content
  if (fs.existsSync(indexCss)) {
    let indexContent = fs.readFileSync(indexCss, 'utf8');
    // Remove @import statement since we've already included variables
    indexContent = indexContent.replace(/@import url\(['"]\.\/variables\.css['"]\);?/g, '');
    cssContent += indexContent;
  }

  // Write combined CSS to destination
  const destFile = path.join(themeDest, 'index.css');
  fs.writeFileSync(destFile, cssContent);
  console.log(`  ✓ ${theme} -> ${path.relative(process.cwd(), destFile)}`);

  // Copy any image assets (jpg, png, gif, svg, webp)
  const assetExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp'];
  const files = fs.readdirSync(themeSrc);
  files.forEach(file => {
    const ext = path.extname(file).toLowerCase();
    if (assetExtensions.includes(ext)) {
      const srcFile = path.join(themeSrc, file);
      const destAsset = path.join(themeDest, file);
      fs.copyFileSync(srcFile, destAsset);
      console.log(`    ✓ copied ${file}`);
    }
  });
});

console.log('Theme build complete!');
