import { ModalContent } from '@chakra-ui/react';
import { Footer } from './Footer';
import { Main } from './Main';

type ContentProps = {
  imgUrl: string;
};

export function Content({ imgUrl }: ContentProps) {
  return (
    <ModalContent
      p='5px'
      bg='transparent'
      boxShadow='none'
      my='0'
      maxW='auto'
      w='auto'
    >
      <Main url={imgUrl} />
      <Footer />
    </ModalContent>
  );
}
