import { Box as ChakraBox, Heading } from '@chakra-ui/react';
import { ReactNode } from 'react';

type BoxProps = {
  title: string;
  children: ReactNode;
};

export function Box({ title, children }: BoxProps) {
  return (
    <ChakraBox
      p='30px'
      boxShadow='md'
      borderRadius='20px'
      w='100%'
      h='85%'
      bg='white'
      maxW='500px'
    >
      <Heading fontSize='23px' as='h1'>
        {title}
      </Heading>
      {children}
    </ChakraBox>
  );
}
