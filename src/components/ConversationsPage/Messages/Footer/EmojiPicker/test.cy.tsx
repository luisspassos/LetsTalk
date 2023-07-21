import { ChakraProvider } from '@chakra-ui/react';
import { CategoriesProvider } from 'contexts/EmojiPicker/CategoriesContext';
import { EmojiPickerScrollProvider } from 'contexts/EmojiPicker/EmojiPickerScrollContext';
import { EmojiStylesProvider } from 'contexts/EmojiPicker/EmojiStylesContext';
import { PositionSelectedFromEmojiPickerCategoriesProvider } from 'contexts/EmojiPicker/PositionSelectedFromEmojiPickerCategoriesContext';
import { SearchedEmojisProvider } from 'contexts/EmojiPicker/SearchedEmojiContext';
import { ToggleEmojiPickerProvider } from 'contexts/EmojiPicker/ToggleEmojiPickerContext';
import { theme } from 'styles/theme';
import { emojiCategories } from 'utils/emojiCategories';
import { Footer } from '..';

describe('Emoji picker', () => {
  beforeEach(() => {
    cy.mount(
      <ChakraProvider theme={theme}>
        <PositionSelectedFromEmojiPickerCategoriesProvider>
          <SearchedEmojisProvider>
            <EmojiStylesProvider>
              <CategoriesProvider>
                <ToggleEmojiPickerProvider>
                  <EmojiPickerScrollProvider>
                    <Footer />
                  </EmojiPickerScrollProvider>
                </ToggleEmojiPickerProvider>
              </CategoriesProvider>
            </EmojiStylesProvider>
          </SearchedEmojisProvider>
        </PositionSelectedFromEmojiPickerCategoriesProvider>
      </ChakraProvider>
    );

    cy.getBySel('toggle emoji picker').as('toggle').click();
  });

  it('should close the emoji picker', () => {
    cy.getBySel('picker').should('be.visible');

    cy.get('@toggle').click();

    cy.getBySel('picker').should('not.exist');
  });

  it('should have scroll on top', () => {
    cy.getBySel('search').should('be.visible');
    cy.getBySel('scroll').then(($el) => {
      const scrollTop = $el.scrollTop();

      cy.wrap(scrollTop).should('eq', 0);
    });
  });

  describe('categories', () => {
    const data = emojiCategories.map(({ testId }, i) => {
      const common = {
        testId,
      };

      type Result = {
        testId: string;
        elementThatProvesThatTheTitleIsTheFirstVisibleElement: string;
      };

      if (testId === 'people') {
        const result: Result = {
          ...common,
          elementThatProvesThatTheTitleIsTheFirstVisibleElement: 'search',
        };

        return result;
      }

      const prevCategory = emojiCategories[i - 1];

      const result: Result = {
        ...common,
        elementThatProvesThatTheTitleIsTheFirstVisibleElement: `${prevCategory?.testId} last`, // is the last emoji in the previous category
      };

      return result;
    });

    for (const {
      testId,
      elementThatProvesThatTheTitleIsTheFirstVisibleElement,
    } of data) {
      it(`should scroll to ${testId}`, () => {
        cy.getBySel(testId).click();

        cy.getBySel(`${testId} title`).should('be.visible');

        cy.getBySel(
          elementThatProvesThatTheTitleIsTheFirstVisibleElement
        ).should('not.exist');
      });
    }
  });

  describe.only('selected category', () => {
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

    type SelectedBar = HTMLDivElement;
    type Coordinate = number;
    type CypressBar = [SelectedBar];

    function makeSureTheBarMovesForEachCategory(coordinates: Coordinate[]) {
      const uniqueSet = new Set(coordinates);
      const areCoordinatesUnique = uniqueSet.size === coordinates.length;

      cy.wrap(areCoordinatesUnique).should('eq', true);
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

        cy.getBySel('scroll').scrollTo(scrollTo, {
          duration: 500,
          easing: 'linear',
        });
      }

      return { add, addAndScroll };
    }

    it.only('should move the bar and add the focus color when clicking', () => {
      const coordinates: Coordinate[] = [];

      for (const { testId: currentTestId } of emojiCategories) {
        cy.getBySel(currentTestId).click();

        cy.getBySel(`${currentTestId} icon`).then(($i) => {
          const cssProp = 'color';
          const color: string = $i.css(cssProp);

          for (const { testId } of emojiCategories) {
            if (currentTestId === testId) continue;

            cy.getBySel(`${testId} icon`).should(
              'not.have.css',
              cssProp,
              color
            );
          }
        });

        cy.getBySel('selected bar').then((bar: CypressBar) => {
          const el = bar[0];

          const { add } = addCoordinate(coordinates, el);

          add();
        });
      }

      cy.then(() => makeSureTheBarMovesForEachCategory(coordinates));
    });

    it('should move the bar through the categories when scrolling', () => {
      const coordinates: Coordinate[] = [];

      cy.getBySel('selected bar').then((bar: CypressBar) => {
        const el = bar[0];

        const coordinate = addCoordinate(coordinates, el);

        coordinate.addAndScroll('center');

        cy.then(() => {
          coordinate.addAndScroll('bottom');

          cy.then(coordinate.add).then(() =>
            makeSureTheBarMovesForEachCategory(coordinates)
          );
        });
      });
    });
  });
});
