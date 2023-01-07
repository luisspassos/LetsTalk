import { Flex, useColorModeValue } from '@chakra-ui/react';
import { Footer } from './Footer';
import { Header } from './Header';
import { Main } from './Main';

export const styles = {
  px: ['14px', '17px', '20px'],
};

export function Messages() {
  return (
    <Flex
      maxW='1100px'
      mx='auto'
      h='100vh'
      flex='1'
      minW={0}
      direction='column'
      bgColor={useColorModeValue('gray.50', 'blue.900')}
      {...styles}
    >
      <Header />
      <Main />
      <Footer />
    </Flex>
  );
}
