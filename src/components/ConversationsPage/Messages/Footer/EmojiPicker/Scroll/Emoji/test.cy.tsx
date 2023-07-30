import { mount } from 'tests/utils/emojiPicker';

type Message = JQuery<HTMLTextAreaElement>;

describe('emoji', () => {
  beforeEach(() => {
    mount();
  });

  it('should insert', () => {
    cy.getBySel('message').invoke('val').should('be.empty');

    cy.getBySel('emoji').first().click();

    cy.getBySel('message').invoke('val').should('not.be.empty');
  });

  it('should put the cursor on the right of the emoji', () => {
    cy.getBySel('emoji').first().click();

    cy.getBySel('message').then(([el]: Message) => {
      cy.wrap(el.value.length === el.selectionStart).should('be.true');
    });
  });

  it('should insert different emojis', () => {
    cy.getBySel('emoji').first().click();

    cy.getBySel('message')
      .invoke('val')
      .then((val: string) => {
        cy.getBySel('message').clear();

        cy.getBySel('emoji').last().click();

        cy.getBySel('message').invoke('val').should('not.eq', val);
      });
  });

  it('should insert the emoji in different parts', () => {
    const text = 'example';

    cy.getBySel('message').type(text);

    // insert emoji after the text
    cy.getBySel('emoji').first().click();

    cy.getBySel('message').then(([el]: Message) => {
      function insertEmojiOnTheInputStart() {
        el.selectionEnd = 0;

        cy.getBySel('emoji').first().click();
      }

      insertEmojiOnTheInputStart();

      cy.getBySel('message')
        .invoke('val')
        .then((val: string) => {
          const textIsOnTheMiddle =
            !val.startsWith(text) && !val.endsWith(text);

          cy.wrap(textIsOnTheMiddle).should('be.true');
        });
    });
  });
});
