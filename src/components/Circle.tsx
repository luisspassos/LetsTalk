import {
  Circle as ChakraCirle,
  SquareProps as ChakraCircleProps,
} from '@chakra-ui/react';
import { ReactNode } from 'react';

type CircleProps = {
  children: ReactNode;
  w: string;
} & ChakraCircleProps;

export function Circle({ children, ...props }: CircleProps) {
  return <ChakraCirle {...props}>{children}</ChakraCirle>;
}
