import {
  Icon,
  IconButton,
  IconButtonProps,
  useColorModeValue,
} from '@chakra-ui/react';
import { IconType } from 'react-icons';
import { useEmoji } from '../../../../../../../../contexts/EmojiContext';
import { useScroll } from '../../../../../../../../contexts/ScrollContext';

type ButtonProps = {
  categoryIcon: IconType;
  index: number;
} & IconButtonProps;

export function Button({
  index,
  'aria-label': ariaLabel,
  categoryIcon,
  ...rest
}: ButtonProps) {
  const {
    searchedEmojis: { searchedEmojis },
  } = useEmoji();

  const { virtualizer, components } = useScroll();

  const categories = components.filter(
    (component) => component.key === 'category'
  );

  const currentIndex = virtualizer.virtualItems[0].index;

  const categoryIndices = categories.map((c) => components.indexOf(c));

  const a = categoryIndices.filter((index) => currentIndex >= index);

  const b = categoryIndices.indexOf(a.pop()) || 0;

  const color = {
    selected: useColorModeValue('blackAlpha.800', 'whiteAlpha.800'),
    default: useColorModeValue('blackAlpha.600', 'whiteAlpha.600'),
  };

  // const selectedCategoryBar =
  //   index === b
  //     ? {
  //         content: '""',
  //         h: searchedEmojis ? '0px' : '4px',
  //         pos: 'absolute',
  //         bottom: 0,
  //         bg: 'gray.300',
  //         transition: '0.2s',
  //         transform: `translateX(${0 * 100}%)`,
  //         w: '100%',
  //       }
  //     : undefined;

  return (
    <IconButton
      onClick={() =>
        virtualizer.scrollToIndex(categoryIndices[index], { align: 'start' })
      }
      color={index === b && !searchedEmojis ? color.selected : color.default}
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
      // _before={selectedCategoryBar}
      d='flex'
      icon={<Icon as={categoryIcon} />}
      {...rest}
    />
  );
}
