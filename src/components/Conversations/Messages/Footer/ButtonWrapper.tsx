import { Center } from '@chakra-ui/react';
import { ReactNode } from 'react';

type ButtonWrapperProps = {
  children: ReactNode;
};

export function ButtonWrapper({ children }: ButtonWrapperProps) {
  return (
    <Center h='75px' my='-15px' alignSelf='end'>
      {children}
    </Center>
  );
}
