import { ModalContent } from '@chakra-ui/react';
import { ReactNode } from 'react';

type ContentProps = {
  children: ReactNode;
};

export function Content({ children }: ContentProps) {
  return (
    <ModalContent
      p='5px'
      bg='transparent'
      boxShadow='none'
      my='0'
      maxW='auto'
      w='auto'
    >
      {children}
    </ModalContent>
  );
}
