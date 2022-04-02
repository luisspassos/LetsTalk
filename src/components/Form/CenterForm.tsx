import { Center, CenterProps } from '@chakra-ui/react';
import { ReactNode } from 'react';

type CenterFormProps = {
  children: ReactNode;
} & CenterProps;

export function CenterForm({ children, ...rest }: CenterFormProps) {
  return (
    <Center {...rest} p='2rem' h='100vh' flexDir='column'>
      {children}
    </Center>
  );
}
