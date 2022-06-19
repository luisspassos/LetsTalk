import { useDisclosure } from '@chakra-ui/react';
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
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
import { EmojiType } from '../types';
import { emojis } from '../utils/emojis';

type EmojiProviderProps = {
  children: ReactNode;
};

type SearchedEmojis = {
  data: EmojiType[];
  isEmpty: boolean;
};

type Categories = {
  data: {
    icon: IconType;
    name: string;
    emojis: {
      emoji: string;
      name: string;
    }[];
  }[];
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

  const { isOpen, onToggle } = useDisclosure();

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
