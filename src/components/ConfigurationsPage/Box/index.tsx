import { Box as ChakraBox, Heading, useColorModeValue } from '@chakra-ui/react';
import { ReactNode } from 'react';

type BoxProps = {
  title: string;
  children: ReactNode;
};

export function Box({ title, children }: BoxProps) {
  return (
    <ChakraBox
      as='section'
      p='1.4em'
      boxShadow='md'
      borderRadius='1em'
      bg={useColorModeValue('white', 'blackAlpha.500')}
      minH='25em'
      h='auto'
      w='100%'
      // minW={{ base: '12em', sm: '17em' }}
      // minW='17em'
      maxW='22.13em'
    >
      <Heading fontSize='1.15em' as='h1'>
        {title}
      </Heading>
      {children}
    </ChakraBox>
  );
}
