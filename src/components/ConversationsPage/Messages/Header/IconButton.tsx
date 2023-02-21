import {
  IconButton as ChakraIconButton,
  IconButtonProps,
} from '@chakra-ui/react';
import { useFontSizeBasedOnWidth } from 'hooks/useFontSizeBasedOnWidth';
import { forwardRef, useState } from 'react';

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (props, forwardRef) => {
    const [element, setElement] = useState<HTMLButtonElement | null>(null);

    const { fontSize } = useFontSizeBasedOnWidth(element, 1.4);

    return (
      <ChakraIconButton
        ref={(node) => {
          setElement(node);
          if (typeof forwardRef === 'function') {
            forwardRef(node);
          } else if (forwardRef) {
            forwardRef.current = node;
          }
        }}
        sx={{ aspectRatio: '1 / 1' }}
        h='50%'
        fontSize={fontSize}
        variant='ghost'
        minW={0}
        {...props}
      />
    );
  }
);

IconButton.displayName = 'IconButton';
