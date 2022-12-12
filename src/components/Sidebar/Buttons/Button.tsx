import {
  IconButton as ChakraIconButton,
  IconButtonProps,
} from '@chakra-ui/react';
import { Tooltip } from 'components/Tooltip';

type ButtonProps = {
  isSelected?: boolean;
} & IconButtonProps;

export function Button({
  isSelected,
  'aria-label': ariaLabel,
  ...rest
}: ButtonProps) {
  return (
    <Tooltip ariaLabel={ariaLabel} label={ariaLabel} aria-label={ariaLabel}>
      <ChakraIconButton
        bg={isSelected ? 'whiteAlpha.400' : undefined}
        w={['34px', '37px', '40px']}
        h={['34px', '37px', '40px']}
        fontSize={['26px', '28px', '30px']}
        d='flex'
        justifyContent='center'
        alignItems='center'
        color='white'
        minW='0'
        variant='ghost'
        _hover={{
          bg: 'whiteAlpha.400',
        }}
        _active={{
          bg: 'whiteAlpha.500',
        }}
        aria-label={ariaLabel}
        {...rest}
      />
    </Tooltip>
  );
}
