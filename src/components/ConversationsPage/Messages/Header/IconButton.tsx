import {
  IconButton as ChakraIconButton,
  IconButtonProps,
} from '@chakra-ui/react';
import { forwardRef, useRef } from 'react';

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (props, forwardRef) => {
    const ref = useRef<HTMLButtonElement>(null);

    return (
      <ChakraIconButton
        ref={(node) => {
          ref.current = node;
          if (typeof forwardRef === 'function') {
            forwardRef(node);
          } else if (forwardRef) {
            forwardRef.current = node;
          }
        }}
        sx={{ aspectRatio: '1 / 1' }}
        h='50%'
        variant='ghost'
        minW={0}
        {...props}
      />
    );
  }
);

IconButton.displayName = 'IconButton';
