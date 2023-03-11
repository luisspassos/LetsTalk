import {
  IconButton as ChakraIconButton,
  IconButtonProps,
} from '@chakra-ui/react';
import { useFontSizeBasedOnMeasurement } from 'hooks/useFontSizeBasedOnMeasurement';
import { forwardRef, useState } from 'react';

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (props, forwardRef) => {
    const [element, setElement] = useState<HTMLButtonElement | null>(null);

    const { fontSize } = useFontSizeBasedOnMeasurement(element, 1.4);

    function handleRef(node: HTMLButtonElement | null) {
      setElement(node);

      if (typeof forwardRef === 'function') {
        forwardRef(node);
      } else if (forwardRef !== null) {
        forwardRef.current = node;
      }
    }

    return (
      <ChakraIconButton
        ref={handleRef}
        sx={{ aspectRatio: '1 / 1' }}
        fontSize={fontSize}
        h='50%'
        flexShrink={0}
        variant='ghost'
        minW={0}
        {...props}
      />
    );
  }
);

IconButton.displayName = 'IconButton';
