import {
  Divider as ChakraDivider,
  DividerProps as ChakraDividerProps,
  useColorModeValue,
} from '@chakra-ui/react';
import { RefObject } from 'react';

type DividerProps = {
  dividerRef?: RefObject<HTMLHRElement>;
} & ChakraDividerProps;

export function Divider({ dividerRef, ...rest }: DividerProps) {
  return (
    <ChakraDivider
      borderColor={useColorModeValue('blue.900', 'whiteAlpha.800')}
      opacity='15%'
      borderBottomWidth='2px'
      mt={['6px', '8px', '10px']}
      mb={['14px', '16px', '18px']}
      ref={dividerRef}
      {...rest}
    />
  );
}
