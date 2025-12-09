import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { IThemeManager } from '@jupyterlab/apputils';

/**
 * Theme definitions for jupyterlab-awaythemes.
 * Add new themes here by adding entries to this array.
 */
interface IThemeDefinition {
  id: string;
  name: string;
  isLight: boolean;
  cssPath: string;
}

const themes: IThemeDefinition[] = [
  {
    id: 'blackhole',
    name: 'Blackhole',
    isLight: false,
    cssPath: 'jupyterlab-awaythemes/blackhole/index.css'
  },
  {
    id: 'aurora',
    name: 'Aurora',
    isLight: false,
    cssPath: 'jupyterlab-awaythemes/aurora/index.css'
  },
  {
    id: 'cascade-night',
    name: 'Cascade Night',
    isLight: false,
    cssPath: 'jupyterlab-awaythemes/cascade-night/index.css'
  },
  {
    id: 'deep-space',
    name: 'Deep Space',
    isLight: false,
    cssPath: 'jupyterlab-awaythemes/deep-space/index.css'
  },
  {
    id: 'galactic-core',
    name: 'Galactic Core',
    isLight: false,
    cssPath: 'jupyterlab-awaythemes/galactic-core/index.css'
  },
  {
    id: 'waterlord',
    name: 'Waterlord',
    isLight: false,
    cssPath: 'jupyterlab-awaythemes/waterlord/index.css'
  }
];

/**
 * Initialization data for the jupyterlab-awaythemes extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'jupyterlab-awaythemes:plugin',
  autoStart: true,
  requires: [IThemeManager],
  activate: (app: JupyterFrontEnd, manager: IThemeManager) => {
    // Register all themes
    themes.forEach(theme => {
      manager.register({
        name: theme.name,
        isLight: theme.isLight,
        themeScrollbars: true,
        load: () => manager.loadCSS(theme.cssPath),
        unload: () => Promise.resolve(undefined)
      });
    });

    console.log('jupyterlab-awaythemes: registered', themes.length, 'theme(s)');
  }
};

export default plugin;
