import { Flex } from '@chakra-ui/react';
import { Footer } from './Footer';
import { Header } from './Header';
import { Main } from './Main';

export function Messages() {
  return (
    <Flex flex='1' minW={0} direction='column' px='20px'>
      <Header />
      <Main />
      <Footer />
    </Flex>
  );
}
