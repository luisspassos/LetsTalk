import {
  CypressSelectedBar,
  checkIfOnlyOneCategoryHasFocusStyle,
  getIconCSSObjectsInString,
  mount,
} from 'tests/utils/emojiPicker';

describe('search', () => {
  beforeEach(() => {
    mount();
  });

  it('should remove the selected bar', () => {
    cy.getBySel('selected bar').then(([el]: CypressSelectedBar) => {
      const getStyle = () => getComputedStyle(el);
      const hidden = '0px';

      function checkIfBarIsVisible() {
        const { width, height } = getStyle();

        cy.wrap(width).should('not.eq', hidden);
        cy.wrap(height).should('not.eq', hidden);
      }

      function checkIfBarIsNotVisible() {
        const { width, height } = getStyle();

        const notExists = width === hidden || height === hidden;

        cy.wrap(notExists).should('be.true');
      }

      checkIfBarIsVisible();

      cy.getBySel('search').type('example');

      cy.then(checkIfBarIsNotVisible);
    });
  });

  it('should remove category focus style', () => {
    checkIfOnlyOneCategoryHasFocusStyle();

    cy.getBySel('search').type('example');

    function checkIfTheresNoFocusStyle() {
      const styles = getIconCSSObjectsInString();
      const areEqual = styles.every((val, _, arr) => val === arr[0]);

      cy.wrap(areEqual).should('be.true');
    }

    cy.then(checkIfTheresNoFocusStyle);
  });

  it('should search emojis with formatted search', () => {
    // it will search for the emoji that has some letter missing. Then, it will search the letter and check if the emoji without it has been filtered out
    cy.getBySel('emoji').each((emoji) => {
      const name = emoji.data('name');

      if (name === undefined) throw 'name is missing';

      function findLetterThatDoesNotExistInVisibleEmoji() {
        const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

        const letter = alphabet.find((letter) => !name.includes(letter));

        return letter;
      }

      const letter = findLetterThatDoesNotExistInVisibleEmoji();

      // if the name has all letters, then try next
      if (letter === undefined) return;

      const checkIfLetterIsBeingFormattedAndIsSearchingCorrectly = (
        accent: string
      ) => {
        const letterToTestFormatting = () => {
          const baseLetterCodePoint = letter.charCodeAt(0);
          const accentCodePoint = accent.charCodeAt(0);

          const accentedLetter = String.fromCharCode(
            baseLetterCodePoint,
            accentCodePoint
          );

          // search should remove blank spaces, accents and upper case
          return ' ' + accentedLetter.toUpperCase();
        };

        cy.getBySel('search').type(letterToTestFormatting());

        cy.getBySel('emoji').each((emoji) =>
          cy.wrap(emoji).invoke('data', 'name').should('include', letter)
        );
      };

      const accents = ['\u0301' /* ´ */, '\u0302' /* ^ */];

      for (const accent of accents) {
        checkIfLetterIsBeingFormattedAndIsSearchingCorrectly(accent);

        cy.getBySel('search').clear();
      }

      // stop loop
      return false;
    });
  });
});
