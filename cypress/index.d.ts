/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject = any> {
    loginByGoogleApi(): Chainable<any>;
  }
}
