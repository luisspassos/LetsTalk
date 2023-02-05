import {
  IconButton as ChakraIconButton,
  useColorModeValue,
  IconButtonProps,
} from '@chakra-ui/react';
import { forwardRef } from 'react';

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (props, ref) => {
    const hover = useColorModeValue(
      {
        bg: 'blackAlpha.200',
      },
      undefined
    );

    return <ChakraIconButton ref={ref} _hover={hover} {...props} />;
  }
);

IconButton.displayName = 'IconButton';
