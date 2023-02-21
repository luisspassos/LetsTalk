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
      mx='auto'
      h='100vh'
      w='70%'
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
