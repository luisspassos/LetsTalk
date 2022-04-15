import {
  Circle as ChakraCircle,
  SquareProps as ChakraCircleProps,
} from '@chakra-ui/react';
import { ReactNode } from 'react';

type CircleProps = {
  children: ReactNode;
  w?: string;
  h?: string | string[];
} & ChakraCircleProps;

export function Circle({ children, ...props }: CircleProps) {
  return <ChakraCircle {...props}>{children}</ChakraCircle>;
}
