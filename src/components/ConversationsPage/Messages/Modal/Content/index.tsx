import { ModalContent } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { Footer, FooterProps } from './Footer';
import { Wrapper } from './Wrapper';

type ContentProps = {
  children: ReactNode;
  footerProps: FooterProps;
};

export function Content({ children, footerProps }: ContentProps) {
  return (
    <ModalContent
      p='5px'
      bg='transparent'
      boxShadow='none'
      my='0'
      maxW='auto'
      w='auto'
    >
      <Wrapper>{children}</Wrapper>
      <Footer {...footerProps} />
    </ModalContent>
  );
}
