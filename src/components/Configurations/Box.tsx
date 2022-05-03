import { Box as ChakraBox, Heading } from '@chakra-ui/react';
import { ReactNode } from 'react';

type BoxProps = {
  title: string;
  children: ReactNode;
};

export function Box({ title, children }: BoxProps) {
  return (
    <ChakraBox
      p={['24px', '27px', '30px']}
      boxShadow='md'
      borderRadius='20px'
      minH={['400px', '530px']}
      bg='white'
      flex='1'
      minW={{ base: '200px', sm: '300px' }}
      maxW='450px'
    >
      <Heading fontSize={['19px', '21px', '23px']} as='h1'>
        {title}
      </Heading>
      {children}
    </ChakraBox>
  );
}
