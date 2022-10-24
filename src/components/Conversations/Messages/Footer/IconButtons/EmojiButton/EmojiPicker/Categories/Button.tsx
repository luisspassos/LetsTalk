import {
  Icon,
  IconButton,
  IconButtonProps,
  useColorModeValue,
} from '@chakra-ui/react';
import { useCallback } from 'react';
import { IconType } from 'react-icons';
import { useEmoji } from '../../../../../../../../contexts/EmojiContext';

type ButtonProps = {
  categoryIcon: IconType;
  index: number;
  selectedCategoryIndex: number;
} & IconButtonProps;

export function Button({
  'aria-label': ariaLabel,
  selectedCategoryIndex,
  index,
  categoryIcon,
  ...rest
}: ButtonProps) {
  const {
    searchedEmojis: { searchedEmojis },
    categories: { setState: setCategories },
  } = useEmoji();

  const color = {
    selected: useColorModeValue('blackAlpha.800', 'whiteAlpha.800'),
    default: useColorModeValue('blackAlpha.600', 'whiteAlpha.600'),
  };

  const selectedCategoryBar =
    index === 0
      ? {
          content: '""',
          h: searchedEmojis ? '0px' : '4px',
          pos: 'absolute',
          bottom: 0,
          bg: 'gray.300',
          transition: '0.2s',
          transform: `translateX(${selectedCategoryIndex * 100}%)`,
          w: '100%',
        }
      : undefined;

  const handleSelectCategory = useCallback(
    (index: number) => {
      setCategories((prevState) => ({
        ...prevState,
        selectedCategoryIndex: index,
      }));

      // const element = document.getElementById(ariaLabel)?.offsetTop;
      // document
      //   .getElementById('scrollEmojis')
      //   ?.scrollTo({ top: element - 320, behavior: 'smooth' });

      // function findPos(obj) {
      //   var curtop = 0;
      //   if (obj.offsetParent) {
      //     do {
      //       curtop += obj.offsetTop;
      //     } while ((obj = obj.offsetParent));
      //     return [curtop];
      //   }
      // }

      // // document
      // //   .getElementById('scrollEmojis')
      // //   .scroll(0, findPos(document.getElementById(ariaLabel)) - 320);

      // const y =
      //   document.getElementById(ariaLabel).getBoundingClientRect().top +
      //   document.getElementById('scrollEmojis').scrollY;
      // document.getElementById('scrollEmojis').scroll({
      //   top: y,
      //   behavior: 'smooth',
      // });
    },
    [setCategories]
  );

  return (
    <IconButton
      color={
        selectedCategoryIndex === index && !searchedEmojis
          ? color.selected
          : color.default
      }
      title={ariaLabel}
      aria-label={ariaLabel}
      variant='unstyled'
      flex='1'
      minW='50px'
      h='45px'
      fontSize='22px'
      transition='0'
      _focus={{
        boxShadow: 'none',
      }}
      _before={selectedCategoryBar}
      d='flex'
      icon={<Icon as={categoryIcon} />}
      onClick={() => handleSelectCategory(index)}
      {...rest}
    />
  );
}
