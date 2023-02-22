import {
  IconButton as ChakraIconButton,
  IconButtonProps,
} from '@chakra-ui/react';
import { Tooltip } from 'components/Tooltip';
import { useFontSizeBasedOnWidth } from 'hooks/useFontSizeBasedOnWidth';
import { useRef } from 'react';

type ButtonProps = {
  isSelected?: boolean;
} & IconButtonProps;

export function Button({
  isSelected,
  'aria-label': ariaLabel,
  ...rest
}: ButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);

  const { fontSize } = useFontSizeBasedOnWidth(ref.current, 1.5);

  return (
    <Tooltip ariaLabel={ariaLabel} label={ariaLabel} aria-label={ariaLabel}>
      <ChakraIconButton
        ref={ref}
        bg={isSelected ? 'whiteAlpha.400' : undefined}
        w='5%'
        h='unset'
        sx={{
          aspectRatio: '1 / 1',
        }}
        fontSize={fontSize}
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
