import { useBreakpointValue, useDisclosure } from '@chakra-ui/react';
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { IconType } from 'react-icons';
import { AiOutlineCar, AiOutlineClockCircle } from 'react-icons/ai';
import { BiFootball } from 'react-icons/bi';
import { BsFlag } from 'react-icons/bs';
import { IoFastFoodOutline } from 'react-icons/io5';
import {
  MdOutlineEmojiEmotions,
  MdOutlineEmojiObjects,
  MdEmojiSymbols,
} from 'react-icons/md';
import { RiBearSmileLine } from 'react-icons/ri';
import { emojiCategories } from '../utils/emojiCategories';

type EmojiProviderProps = {
  children: ReactNode;
};

export type Emoji = string;

type RawEmoji = {
  name: string;
  emoji: string;
};

type SearchedEmojis = {
  data: Emoji[];
  isEmpty: boolean;
};

export type CategoryData = {
  icon: IconType;
  name: string;
  emojis: Emoji[];
};

type Categories = {
  data: CategoryData[];
  selectedCategoryIndex: number;
};

type EmojiContextType = {
  searchedEmojis: {
    searchedEmojis: SearchedEmojis;
    setSearchedEmojis: Dispatch<SetStateAction<SearchedEmojis>>;
  };
  categories: {
    data: Categories;
    setState: Dispatch<SetStateAction<Categories>>;
    renderFilteredCategoryData: (
      callback: (
        category: CategoryData,
        index: number,
        array: CategoryData[]
      ) => JSX.Element
    ) => JSX.Element[];
  };
  togglePicker: {
    isOpen: boolean;
    onToggle: () => void;
  };
  emojiPickerStyles: {
    emojiSize: number;
    fontSize: number;
  };
};

export const createRecentCategory = (emojis: Emoji[] = []) => ({
  name: 'Recentes',
  icon: AiOutlineClockCircle,
  emojis,
});

export const EmojiContext = createContext({} as EmojiContextType);

export function EmojiProvider({ children }: EmojiProviderProps) {
  const [searchedEmojis, setSearchedEmojis] = useState<SearchedEmojis>({
    data: [],
    isEmpty: true,
  });

  const emojiPickerStyles = {
    emojiSize: useBreakpointValue([36, 41, 46]) || 0,
    fontSize: useBreakpointValue([22, 25, 28]) || 0,
  };

  const [categories, setCategories] = useState<Categories>({
    data: [],
    selectedCategoryIndex: 0,
  });

  useEffect(() => {
    function fillCategories() {
      const data = [
        {
          icon: MdOutlineEmojiEmotions,
          name: 'Smileys e pessoas',
          emojis: emojiCategories['Smileys e pessoas'],
        },
        {
          icon: RiBearSmileLine,
          name: 'Animais e natureza',
          emojis: emojiCategories['Animais e natureza'],
        },
        {
          icon: IoFastFoodOutline,
          name: 'Comidas e bebidas',
          emojis: emojiCategories['Comidas e bebidas'],
        },
        {
          icon: BiFootball,
          name: 'Atividades',
          emojis: emojiCategories.Atividades,
        },
        {
          icon: AiOutlineCar,
          name: 'Viagens e lugares',
          emojis: emojiCategories['Viagens e lugares'],
        },
        {
          icon: MdOutlineEmojiObjects,
          name: 'Objetos',
          emojis: emojiCategories.Objetos,
        },
        {
          icon: MdEmojiSymbols,
          name: 'Símbolos',
          emojis: emojiCategories.Símbolos,
        },
        {
          icon: BsFlag,
          name: 'Bandeiras',
          emojis: emojiCategories.Bandeiras,
        },
      ];

      function getOnlyEmojis(emojis: RawEmoji[]) {
        return emojis.map(({ emoji }) => emoji);
      }

      const newData = data.map(({ emojis, name, icon }) => ({
        icon,
        name,
        emojis: getOnlyEmojis(emojis),
      }));

      function addRecentCategory() {
        const localStorageData = localStorage.getItem('recentlyUsedEmojis');

        if (!localStorageData) return;

        const emojis: Emoji[] = JSON.parse(localStorageData);

        const category = createRecentCategory(emojis);

        newData.unshift(category);
      }

      addRecentCategory();

      setCategories((prevState) => ({
        ...prevState,
        data: newData,
      }));
    }

    fillCategories();
  }, []);

  const { isOpen, onToggle } = useDisclosure();

  const renderFilteredCategoryData = useCallback(
    (callback) => {
      const categoriesData = categories.data;

      return categoriesData.map((category, ...rest) =>
        callback(category, ...rest)
      );
    },
    [categories.data]
  );

  return (
    <EmojiContext.Provider
      value={{
        searchedEmojis: {
          searchedEmojis,
          setSearchedEmojis,
        },
        categories: {
          data: categories,
          setState: setCategories,
          renderFilteredCategoryData,
        },
        togglePicker: {
          isOpen,
          onToggle,
        },
        emojiPickerStyles,
      }}
    >
      {children}
    </EmojiContext.Provider>
  );
}

export function useEmoji() {
  const data = useContext(EmojiContext);

  return data;
}
