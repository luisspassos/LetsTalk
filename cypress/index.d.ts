type CyGetArgs = Parameters<typeof cy.get>;

type GetBySelArgs = import('../src/utils/types').SpliceTuple<CyGetArgs, 0>;

declare namespace Cypress {
  interface Chainable {
    getBySel(selector: string, ...args: GetBySelArgs): Chainable<any>;
  }

  interface ApplicationWindow {
    auth: import('components/LoginPage/Form/LoginButtonWithGoogle/index').AuthMethods;
  }
}
