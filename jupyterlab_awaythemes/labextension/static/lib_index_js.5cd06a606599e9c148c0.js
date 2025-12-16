"use strict";
(self["webpackChunkjupyterlab_awaythemes"] = self["webpackChunkjupyterlab_awaythemes"] || []).push([["lib_index_js"],{

/***/ "./lib/index.js":
/*!**********************!*\
  !*** ./lib/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__);

const themes = [
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
        id: 'astronomical-dawn',
        name: 'Astronomical Dawn',
        isLight: false,
        cssPath: 'jupyterlab-awaythemes/astronomical-dawn/index.css'
    },
    {
        id: 'aurora',
        name: 'Aurora',
        isLight: false,
        cssPath: 'jupyterlab-awaythemes/aurora/index.css'
    }
];
/**
 * Initialization data for the jupyterlab-awaythemes extension.
 */
const plugin = {
    id: 'jupyterlab-awaythemes:plugin',
    autoStart: true,
    requires: [_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.IThemeManager],
    activate: (app, manager) => {
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (plugin);


/***/ })

}]);
//# sourceMappingURL=lib_index_js.5cd06a606599e9c148c0.js.map