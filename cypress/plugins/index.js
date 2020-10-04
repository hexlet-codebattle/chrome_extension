// / <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)
// eslint-disable-next-line import/no-extraneous-dependencies
/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line import/no-extraneous-dependencies
const extentionLoader = require('cypress-browser-extension-plugin/loader');
const { join } = require('path');

const extentionPath = join(__dirname, '..', '..', 'dist');

module.exports = on => {
  on('before:browser:launch', extentionLoader.load({ source: extentionPath }));
};
