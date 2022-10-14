import { useDisclosure } from '@chakra-ui/react';
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
import { AiOutlineClockCircle, AiOutlineCar } from 'react-icons/ai';
import { BiFootball } from 'react-icons/bi';
import { BsFlag } from 'react-icons/bs';
import { IoFastFoodOutline } from 'react-icons/io5';
import {
  MdOutlineEmojiEmotions,
  MdOutlineEmojiObjects,
  MdEmojiSymbols,
} from 'react-icons/md';
import { RiBearSmileLine } from 'react-icons/ri';
import { EmojiType } from '../utils/types';
import { emojis } from '../utils/emojis';

type EmojiProviderProps = {
  children: ReactNode;
};

type SearchedEmojis = {
  data: EmojiType[];
  isEmpty: boolean;
};

type CategoryData = {
  icon: IconType;
  name: string;
  emojis: EmojiType[];
};

type Categories = {
  data: CategoryData[];
  selectedCategoryIndex: number;
};

type EmojiContextType = {
  searchedEmojis: {
    data: SearchedEmojis;
    setState: Dispatch<SetStateAction<SearchedEmojis>>;
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
};

export const EmojiContext = createContext({} as EmojiContextType);

export function EmojiProvider({ children }: EmojiProviderProps) {
  const [searchedEmojis, setSearchedEmojis] = useState<SearchedEmojis>({
    data: [],
    isEmpty: true,
  });

  const [categories, setCategories] = useState({
    data: [
      {
        icon: AiOutlineClockCircle,
        name: 'Recentes',
        emojis: [],
      },
      {
        icon: MdOutlineEmojiEmotions,
        name: 'Smileys e pessoas',
        emojis: [...emojis['smileys-emotion'], ...emojis['people-body']],
      },
      {
        icon: RiBearSmileLine,
        name: 'Animais e natureza',
        emojis: emojis['animals-nature'],
      },
      {
        icon: IoFastFoodOutline,
        name: 'Comidas e bebidas',
        emojis: emojis['food-drink'],
      },
      {
        icon: BiFootball,
        name: 'Atividades',
        emojis: emojis.activities,
      },
      {
        icon: AiOutlineCar,
        name: 'Viagens e lugares',
        emojis: emojis['travel-places'],
      },
      {
        icon: MdOutlineEmojiObjects,
        name: 'Objetos',
        emojis: emojis.objects,
      },
      {
        icon: MdEmojiSymbols,
        name: 'Símbolos',
        emojis: emojis.symbols,
      },
      {
        icon: BsFlag,
        name: 'Bandeiras',
        emojis: emojis.flags,
      },
    ],
    selectedCategoryIndex: 0,
  });

  useEffect(() => {
    function fillCategories() {
      const categoryNames = [
        'Recentes',
        'Smileys e pessoas',
        'Animais e natureza',
        'Comidas e bebidas',
        'Atividades',
        'Viagens e lugares',
        'Objetos',
        'Símbolos',
        'Bandeiras',
      ];
      const categoryIcons = [
        AiOutlineClockCircle,
        MdOutlineEmojiEmotions,
        RiBearSmileLine,
        IoFastFoodOutline,
        BiFootball,
        AiOutlineCar,
        MdOutlineEmojiObjects,
        MdEmojiSymbols,
        BsFlag,
      ];
      const onlyEmojis = [
        [...emojis['smileys-emotion'], ...emojis['people-body']],
        emojis['animals-nature'],
        emojis['food-drink'],
        emojis.activities,
        emojis['travel-places'],
        emojis.objects,
        emojis.symbols,
        emojis.flags,
      ].map((arr) => arr.map((e) => e.emoji));

      const data = onlyEmojis.map;
    }

    fillCategories();
  }, []);

  const { isOpen, onToggle } = useDisclosure();

  const renderFilteredCategoryData = useCallback(
    (callback) =>
      categories.data
        .filter((category) => category.emojis.length !== 0)
        .map((category, ...rest) => callback(category, ...rest)),
    [categories.data]
  );

  useEffect(() => {
    function getRecentlyUsedEmojis() {
      const newCategoriesData = [...categories.data];

      const localStorageData = localStorage.getItem('recentlyUsedEmojis');

      const recentlyUsedEmojis: EmojiType[] = localStorageData
        ? JSON.parse(localStorageData)
        : [];

      newCategoriesData[0].emojis = recentlyUsedEmojis;

      setCategories((prevState) => ({ ...prevState, data: newCategoriesData }));
    }

    getRecentlyUsedEmojis();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <EmojiContext.Provider
      value={{
        searchedEmojis: {
          data: searchedEmojis,
          setState: setSearchedEmojis,
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
