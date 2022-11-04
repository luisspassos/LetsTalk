import { useColorModeValue } from '@chakra-ui/react';
import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import { IconType } from 'react-icons';
import { useEmoji } from '../../../../../../../../contexts/EmojiContext';
import { useScroll } from '../../../../../../../../contexts/ScrollContext';

type ButtonProps = {
  CategoryIcon: IconType;
  index: number;
  b: number;
  categoryIndices: number[];
} & DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export const transition = '.2s';

export function Button({
  index,
  CategoryIcon,
  b,
  'aria-label': ariaLabel,
  categoryIndices,
  ...rest
}: ButtonProps) {
  const {
    searchedEmojis: { searchedEmojis },
  } = useEmoji();

  const { virtualizer } = useScroll();

  const color = {
    selected: useColorModeValue(
      'var(--chakra-colors-blackAlpha-800)',
      'var(--chakra-colors-whiteAlpha-800)'
    ),
    default: useColorModeValue(
      'var(--chakra-colors-blackAlpha-600)',
      'var(--chakra-colors-whiteAlpha-600)'
    ),
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
    <button
      style={{
        color: index === b && !searchedEmojis ? color.selected : color.default,
        flex: 1,
        minWidth: '50px',
        height: '45px',
        fontSize: '22px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition,
      }}
      title={ariaLabel}
      aria-label={ariaLabel}
      onClick={() =>
        virtualizer.scrollToIndex(categoryIndices[index], { align: 'start' })
      }
      {...rest}
    >
      <CategoryIcon />
    </button>
    // <IconButton
    //   // onClick={() =>
    //   //   virtualizer.scrollToIndex(categoryIndices[index], { align: 'start' })
    //   // }
    //   color={index === b && !searchedEmojis ? color.selected : color.default}
    //   title={ariaLabel}
    //   aria-label={ariaLabel}
    //   variant='unstyled'
    //   flex='1'
    //   minW='50px'
    //   h='45px'
    //   fontSize='22px'
    //   transition='0'
    //   _focus={{
    //     boxShadow: 'none',
    //   }}
    //   // _before={selectedCategoryBar}
    //   d='flex'
    //   icon={<Icon as={CategoryIcon} />}
    //   {...rest}
    // />
  );
}
