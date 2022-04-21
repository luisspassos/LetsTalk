import { Flex } from '@chakra-ui/react';
import { Footer } from './Footer';
import { Header } from './Header';
import { Main } from './Main';

export function Messages() {
  return (
    <Flex
      maxW='1100px'
      mx='auto'
      flex='1'
      minW={0}
      direction='column'
      px={['14px', '17px', '20px']}
    >
      <Header />
      <Main />
      <Footer />
    </Flex>
  );
}
