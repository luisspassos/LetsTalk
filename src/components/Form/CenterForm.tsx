import { Center } from '@chakra-ui/react';
import { ReactNode } from 'react';

type CenterFormProps = {
  children: ReactNode;
};

export function CenterForm({ children }: CenterFormProps) {
  return (
    <Center p='2rem' h='100vh' flexDir='column'>
      {children}
    </Center>
  );
}
