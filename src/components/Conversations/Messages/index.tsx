import { Flex } from '@chakra-ui/react';
import { Footer } from './Footer';
import { Header } from './Header';

export function Messages() {
  return (
    <Flex flex='1' direction='column' px='20px'>
      <Header />
      <Footer />
    </Flex>
  );
}
