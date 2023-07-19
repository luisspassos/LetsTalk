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

        cy.getBySel('selected bar').then((el) =>
          console.log(el[0].getBoundingClientRect())
        );
      });
    }
  });
});
