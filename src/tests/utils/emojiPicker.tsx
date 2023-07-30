import { ChakraProvider } from '@chakra-ui/react';
import { Footer } from 'components/ConversationsPage/Messages/Footer';
import { CategoriesProvider } from 'contexts/EmojiPicker/CategoriesContext';
import { EmojiPickerScrollProvider } from 'contexts/EmojiPicker/EmojiPickerScrollContext';
import { EmojiStylesProvider } from 'contexts/EmojiPicker/EmojiStylesContext';
import { PositionSelectedFromEmojiPickerCategoriesProvider } from 'contexts/EmojiPicker/PositionSelectedFromEmojiPickerCategoriesContext';
import { SearchedEmojisProvider } from 'contexts/EmojiPicker/SearchedEmojiContext';
import { ToggleEmojiPickerProvider } from 'contexts/EmojiPicker/ToggleEmojiPickerContext';
import { MessageInputRefProvider } from 'contexts/MessageInputRef';
import { theme } from 'styles/theme';

export type SelectedBar = Element;
export type CypressSelectedBar = JQuery<SelectedBar>;

export type Icon = JQuery<Element>;

export const defaultCategories = [
  'people',
  'nature',
  'food',
  'activities',
  'places',
  'object',
  'symbol',
  'flag',
] as const;

export function mount() {
  cy.mount(
    <ChakraProvider theme={theme}>
      <MessageInputRefProvider>
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
      </MessageInputRefProvider>
    </ChakraProvider>
  );

  return cy.getBySel('toggle emoji picker').as('toggle').click();
}

export function getIconCSSObjectsInString() {
  const styles: string[] = [];

  for (const category of defaultCategories) {
    cy.getBySel(`${category} icon`).then(([el]: Icon) => {
      const style = getComputedStyle(el);

      styles.push(JSON.stringify(style));
    });
  }

  return styles;
}

export function checkIfOnlyOneCategoryHasFocusStyle() {
  function hasOnlyOneDifferentValue<T>(arr: T[]): boolean {
    if (!arr || arr.length < 2) {
      return false;
    }

    // Find the most common element in the array
    const countMap: Map<T, number> = new Map();
    let mostCommonElement: T | undefined;
    let mostCommonElementCount = 0;

    arr.forEach((item) => {
      const count = countMap.has(item) ? countMap.get(item)! + 1 : 1;
      countMap.set(item, count);

      if (count > mostCommonElementCount) {
        mostCommonElement = item;
        mostCommonElementCount = count;
      }
    });

    // Count the occurrences of the most common element and the occurrences of other elements
    let differentValueCount = 0;

    for (const [key, value] of countMap) {
      if (key !== mostCommonElement) {
        differentValueCount += value;
      }
    }

    // Check if the array has only one value different from the others
    return (
      mostCommonElementCount >= arr.length - 1 && differentValueCount === 1
    );
  }

  const styles = getIconCSSObjectsInString();

  return cy.then(() => {
    const focusIsOnlyOnOne = hasOnlyOneDifferentValue(styles);

    cy.wrap(focusIsOnlyOnOne).should('be.true');
  });
}

export function clickAndCheckIfCategoryIsShowingFully(
  category: string,
  elementThatProvesThatTheTitleIsTheFirstVisibleElement: string
) {
  cy.getBySel(category).click();

  cy.getBySel(`${category} title`).should('be.visible');
  cy.getBySel(elementThatProvesThatTheTitleIsTheFirstVisibleElement).should(
    'not.exist'
  );

  cy.getBySel('scroll').then(([el]: JQuery<Element>) => {
    // scroll 20px up
    el.scrollBy(0, -20);

    cy.getBySel(elementThatProvesThatTheTitleIsTheFirstVisibleElement).should(
      'be.visible'
    );
  });
}
