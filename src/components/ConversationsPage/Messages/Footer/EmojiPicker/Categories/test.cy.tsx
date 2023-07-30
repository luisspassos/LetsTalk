import {
  checkIfOnlyOneCategoryHasFocusStyle,
  clickAndCheckIfCategoryIsShowingFully,
  CypressSelectedBar,
  defaultCategories,
  Icon,
  mount,
  SelectedBar,
} from 'tests/utils/emojiPicker';

type EmojiEl = HTMLElement;
type Emoji = JQuery<EmojiEl>;

describe('categories', () => {
  beforeEach(() => {
    mount();
  });

  describe('recent category', () => {
    it('should go to the category', () => {
      cy.getBySel('emoji').first().as('first').click();

      clickAndCheckIfCategoryIsShowingFully('recent', 'search');
    });

    it('should put recently clicked emoji first in category', () => {
      function getEmojiStringAndClick(emoji: Emoji) {
        const text = emoji.text();

        const [el] = emoji;

        el.click();

        return text;
      }

      cy.getBySel('emoji')
        .first()
        .then((emoji: JQuery<HTMLElement>) => {
          const text = getEmojiStringAndClick(emoji);

          cy.getBySel('emoji')
            .last()
            .then((newEmoji: JQuery<HTMLElement>) => {
              const newText = getEmojiStringAndClick(newEmoji);

              // emojis should be different for the test to work correctly
              cy.wrap(text).should('not.eq', newText);

              cy.getBySel('emoji recent')
                .first()
                .invoke('text')
                .should('eq', newText);

              cy.getBySel('emoji recent')
                .last()
                .invoke('text')
                .should('eq', text);
            });
        });
    });

    it('should not repeat the emoji in the category', () => {
      cy.getBySel('emoji').first().click();
      cy.getBySel('emoji').first().click();

      cy.getBySel('recent').click();

      cy.getBySel('emoji recent').should('have.length', 1);
    });

    it('should add the category', () => {
      cy.getBySel('recent').should('not.exist');
      cy.getBySel('recent title').should('not.exist');

      cy.getBySel('emoji').first().click();

      cy.getBySel('recent').should('be.visible');
    });

    it('should stop inserting emojis when the category is full', () => {
      const max = 25;

      cy.getBySel('emoji').should('have.length.above', max);

      for (let i = 0; i < max + 1; i++) {
        cy.getBySel('emoji').eq(i).click();
      }

      cy.getBySel('recent').click();

      cy.getBySel('emoji recent').should('have.length', max);
    });
  });

  const data = defaultCategories.map((category, i, arr) => {
    const common = {
      category,
    };

    type Result = {
      category: typeof category;
      elementThatProvesThatTheTitleIsTheFirstVisibleElement: string;
    };

    if (category === 'people') {
      const result: Result = {
        ...common,
        elementThatProvesThatTheTitleIsTheFirstVisibleElement: 'search',
      };

      return result;
    }

    const prevCategory = arr[i - 1];

    const result: Result = {
      ...common,
      elementThatProvesThatTheTitleIsTheFirstVisibleElement: `${prevCategory} last`, // is the last emoji in the previous category
    };

    return result;
  });

  for (const {
    category,
    elementThatProvesThatTheTitleIsTheFirstVisibleElement,
  } of data) {
    it(`should scroll to ${category}`, () => {
      clickAndCheckIfCategoryIsShowingFully(
        category,
        elementThatProvesThatTheTitleIsTheFirstVisibleElement
      );
    });
  }

  describe('selected', () => {
    beforeEach(() => {
      function skipCssDurations() {
        cy.get('body').invoke(
          'append',
          Cypress.$(`
          <style id="__cypress-animation-disabler">
            *, *:before, *:after {
              transition-property: none !important;
              animation: none !important;
            }
          </style>
        `)
        );
      }

      skipCssDurations();
    });

    type Coordinate = number;

    function makeSureTheBarMovesForEachCategory(coordinates: Coordinate[]) {
      const uniqueSet = new Set(coordinates);
      const areCoordinatesUnique = uniqueSet.size === coordinates.length;

      return cy.wrap(areCoordinatesUnique).should('be.true');
    }

    function getCoordinate(el: SelectedBar) {
      const { x } = el.getBoundingClientRect();

      return x;
    }

    function addCoordinate(coordinates: Coordinate[], el: SelectedBar) {
      function add() {
        const coordinate = getCoordinate(el);

        coordinates.push(coordinate);
      }

      function addAndScroll(scrollTo: Cypress.PositionType) {
        add();

        return cy.getBySel('scroll').scrollTo(scrollTo, {
          duration: 500,
          easing: 'linear',
        });
      }

      return { add, addAndScroll };
    }

    it('should move the bar and add the focus style when clicking', () => {
      const coordinates: Coordinate[] = [];

      for (const currentCategory of defaultCategories) {
        cy.getBySel(currentCategory).click();

        const checkIfTheFocusStyleHasBeenAdded = () => {
          cy.getBySel(`${currentCategory} icon`).then(($i: Icon) => {
            const [currentEl] = $i;

            function compareCss([toBeCompared]: JQuery<Element>) {
              const current = getComputedStyle(currentEl);
              const compare = getComputedStyle(toBeCompared);

              for (const key in current) {
                const currentVal = current[key];
                const compareVal = compare[key];

                if (
                  key === 'length' ||
                  key === 'cssText' ||
                  typeof key === 'function'
                ) {
                  continue;
                }

                const isDifferent = currentVal !== compareVal;

                if (isDifferent) {
                  return true;
                }
              }

              return false;
            }

            for (const category of defaultCategories) {
              const isCurrent = currentCategory === category;

              if (isCurrent) continue;

              cy.getBySel(`${category} icon`).then((icon: Icon) => {
                const currentIconShouldBeTheOnlyOneWithFocusStyle =
                  compareCss(icon);

                cy.wrap(currentIconShouldBeTheOnlyOneWithFocusStyle).should(
                  'be.true'
                );
              });
            }
          });
        };

        const addBarCoordinate = () => {
          cy.getBySel('selected bar').then((bar: CypressSelectedBar) => {
            const el = bar[0];

            const { add } = addCoordinate(coordinates, el);

            add();
          });
        };

        addBarCoordinate();
        checkIfTheFocusStyleHasBeenAdded();
      }

      cy.then(() => makeSureTheBarMovesForEachCategory(coordinates));
    });

    it('should move the bar through the categories and add the focus style when scrolling', () => {
      const coordinates: Coordinate[] = [];

      cy.getBySel('selected bar').then((bar: CypressSelectedBar) => {
        const [el] = bar;

        const coordinate = addCoordinate(coordinates, el);

        checkIfOnlyOneCategoryHasFocusStyle();

        coordinate.addAndScroll('center');

        checkIfOnlyOneCategoryHasFocusStyle().then(() => {
          coordinate.addAndScroll('bottom').then(() => {
            checkIfOnlyOneCategoryHasFocusStyle();
            coordinate.add();
            makeSureTheBarMovesForEachCategory(coordinates);
          });
        });
      });
    });
  });
});
