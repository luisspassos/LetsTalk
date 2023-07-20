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
      it.only(`should scroll to ${testId}`, () => {
        cy.getBySel(testId).click();

        cy.getBySel(`${testId} title`).should('be.visible');

        cy.getBySel(
          elementThatProvesThatTheTitleIsTheFirstVisibleElement
        ).should('not.exist');
      });
    }
  });

  it.only('should move the bar to the selected category when clicking on it', () => {
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

    const coordinates: number[] = [];

    for (const { testId } of emojiCategories) {
      cy.getBySel(testId).click();

      const coordinate = {
        value: 0,
        repeated: 0, // sometimes, the coordinate repeat even the bar hasn't stopped moving, this property is used to verify if it has repeated too many time, if yes, its because the bar has stopped moving
      };

      cy.getBySel('selected bar').then((bar) => {
        const el: HTMLDivElement = bar[0];

        return new Cypress.Promise((res) => {
          function addCoordinateToArray() {
            const { x: newCoordinate } = el.getBoundingClientRect();

            const tooManyTimes = 50;
            const barStoppedMoving = coordinate.repeated === tooManyTimes;

            if (barStoppedMoving) {
              clearInterval(interval);
              coordinates.push(coordinate.value);
              res();

              return;
            }

            const repeated = coordinate.value === newCoordinate;

            if (repeated) {
              coordinate.repeated = coordinate.repeated + 1;

              return;
            }

            coordinate.value = newCoordinate;
            coordinate.repeated = 0;
          }

          const interval = setInterval(addCoordinateToArray);
        });
      });
    }

    function makeSureTheBarMovesForEachCategory() {
      const uniqueSet = new Set(coordinates);
      const areCoordinatesUnique = uniqueSet.size === coordinates.length;

      cy.wrap(areCoordinatesUnique).should('eq', true);
    }

    cy.then(makeSureTheBarMovesForEachCategory);
  });
});
