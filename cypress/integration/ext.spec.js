// / <reference types="cypress" />
beforeEach(() => {
  cy.clearExtensionStorage('local');
});

context('Load extention', () => {
  it('Can load extention', () => {
    cy.visit('/');
  });
});
