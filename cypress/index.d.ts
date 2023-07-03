type CyGetArgs = Parameters<typeof cy.get>;

type GetBySelArgs = import('../src/utils/types').SpliceTuple<CyGetArgs, 0>;

declare namespace Cypress {
  interface Chainable {
    getBySel(selector: string, ...args: GetBySelArgs): Chainable<any>;
    /**
     *
     * @description **E2E only**. A command that tests if link is working.
     * @param link Link name that is in the data-testid. Remember, the link data-testid should have this format: `<nameOfLink> link`, just like the page: `<nameOfLink> page`. Normally, `<nameOfLink>` is the page name that the link is associated with
     * @example
     * ```html
     * <a data-testid="signIn link">Go to sign in page</a>
     *
     * <div data-testid="signIn page">...</div>
     * ```
     * ```ts
     *
     * cy.testLink('signIn')
     * ```
     */
    testLink(link: string): void;
    testEmailEmpty(): void;
    testPasswordEmpty(): void;
  }

  interface ApplicationWindow {
    auth: import('components/LoginPage/Form/LoginButtonWithGoogle/index').AuthMethods;
  }
}
