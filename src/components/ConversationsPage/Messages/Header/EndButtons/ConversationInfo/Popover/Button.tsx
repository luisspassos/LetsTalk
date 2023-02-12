import {
  Button as ChakraButton,
  ButtonProps as ChakraButtonProps,
} from '@chakra-ui/react';
import { forwardRef } from 'react';

type ButtonProps = {
  text: string;
} & ChakraButtonProps;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ text, ...rest }, ref) => {
    return (
      <ChakraButton
        ref={ref}
        justifyContent='start'
        w='100%'
        variant='ghost'
        fontWeight={400}
        pl='13px'
        {...rest}
      >
        {text}
      </ChakraButton>
    );
  }
);

Button.displayName = 'Button';
