import { Flex, useColorModeValue } from '@chakra-ui/react';
import { Footer } from './Footer';
import { Header } from './Header';
import { Main } from './Main';

export function Messages() {
  return (
    <Flex
      maxW='1100px'
      mx='auto'
      h='100vh'
      flex='1'
      minW={0}
      direction='column'
      px={['14px', '17px', '20px']}
      bgColor={useColorModeValue('gray.50', 'blue.900')}
    >
      <Header />
      <Main />
      <Footer />
    </Flex>
  );
}
