import { Icon, IconButton, IconButtonProps } from '@chakra-ui/react';
import { IconType } from 'react-icons';

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
  return (
    <IconButton
      color={
        selectedCategoryIndex === index ? 'whiteAlpha.800' : 'whiteAlpha.600'
      }
      title={ariaLabel}
      aria-label={ariaLabel}
      variant='unstyled'
      flex='1'
      h='45px'
      fontSize='22px'
      transition='0'
      _focus={{
        boxShadow: 'none',
      }}
      d='flex'
      icon={<Icon as={categoryIcon} />}
      {...rest}
    />
  );
}
