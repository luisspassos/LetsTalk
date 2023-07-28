import { ChakraProvider } from '@chakra-ui/react';
import { CategoriesProvider } from 'contexts/EmojiPicker/CategoriesContext';
import { EmojiPickerScrollProvider } from 'contexts/EmojiPicker/EmojiPickerScrollContext';
import { EmojiStylesProvider } from 'contexts/EmojiPicker/EmojiStylesContext';
import { PositionSelectedFromEmojiPickerCategoriesProvider } from 'contexts/EmojiPicker/PositionSelectedFromEmojiPickerCategoriesContext';
import { SearchedEmojisProvider } from 'contexts/EmojiPicker/SearchedEmojiContext';
import { ToggleEmojiPickerProvider } from 'contexts/EmojiPicker/ToggleEmojiPickerContext';
import { MessageInputRefProvider } from 'contexts/MessageInputRef';
import { theme } from 'styles/theme';
import { Footer } from '..';

type SelectedBar = Element;
type CypressSelectedBar = JQuery<SelectedBar>;

type Icon = JQuery<Element>;

type Message = JQuery<HTMLTextAreaElement>;

type EmojiEl = HTMLElement;
type Emoji = JQuery<EmojiEl>;

const defaultCategories = [
  'people',
  'nature',
  'food',
  'activities',
  'places',
  'object',
  'symbol',
] as const;

function getIconCSSObjectsInString() {
  const styles: string[] = [];

  for (const category of defaultCategories) {
    cy.getBySel(`${category} icon`).then(([el]: Icon) => {
      const style = getComputedStyle(el);

      styles.push(JSON.stringify(style));
    });
  }

  return styles;
}

function checkIfOnlyOneCategoryHasFocusStyle() {
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

function clickAndCheckIfCategoryIsShowingFully(
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

describe('Emoji picker', () => {
  beforeEach(() => {
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
  });

  describe('selected category', () => {
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

      cy.wrap(areCoordinatesUnique).should('be.true');
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
          coordinate
            .addAndScroll('bottom')
            .then(coordinate.add)
            .then(() => makeSureTheBarMovesForEachCategory(coordinates));

          checkIfOnlyOneCategoryHasFocusStyle();
        });
      });
    });
  });

  describe('search', () => {
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

  describe('emoji insertion', () => {
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
});
