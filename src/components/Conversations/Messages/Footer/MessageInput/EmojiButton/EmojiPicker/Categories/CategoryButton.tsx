import {
  Icon,
  IconButton,
  IconButtonProps,
  useColorModeValue,
} from '@chakra-ui/react';
import { IconType } from 'react-icons';
import { useSearchedEmojis } from '../../../../../../../../contexts/SearchedEmojisContext';

type CategoryButtonProps = {
  categoryIcon: IconType;
  index: number;
  selectedCategoryIndex: number;
} & IconButtonProps;

export function CategoryButton({
  'aria-label': ariaLabel,
  selectedCategoryIndex,
  index,
  categoryIcon,
  ...rest
}: CategoryButtonProps) {
  const { searchedEmojis } = useSearchedEmojis();

  const color = {
    selected: useColorModeValue('blackAlpha.800', 'whiteAlpha.800'),
    default: useColorModeValue('blackAlpha.600', 'whiteAlpha.600'),
  };

  const selectedCategoryBar =
    index === 0
      ? {
          content: '""',
          h: !searchedEmojis.isEmpty ? '0px' : '4px',
          pos: 'absolute',
          bottom: 0,
          bg: 'gray.300',
          transition: '0.2s',
          transform: `translateX(${selectedCategoryIndex * 100}%)`,
          w: '100%',
        }
      : undefined;

  return (
    <IconButton
      color={
        selectedCategoryIndex === index && searchedEmojis.isEmpty
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
      {...rest}
    />
  );
}
