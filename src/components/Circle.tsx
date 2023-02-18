import {
  ChakraProps,
  Circle as ChakraCircle,
  SquareProps as ChakraCircleProps,
} from '@chakra-ui/react';
import { ReactNode } from 'react';

type CircleProps = {
  children: ReactNode;
  w?: ChakraProps['w'];
  h?: ChakraProps['h'];
} & ChakraCircleProps;

export function Circle({ children, ...props }: CircleProps) {
  return <ChakraCircle {...props}>{children}</ChakraCircle>;
}
