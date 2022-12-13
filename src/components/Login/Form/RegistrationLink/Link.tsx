import { Link as ChakraLink, useColorModeValue } from '@chakra-ui/react';
import NextLink from 'next/link';

export function Link() {
  return (
    <NextLink href='/cadastro' passHref>
      <ChakraLink
        color={useColorModeValue('blue.900', 'gray.50')}
        d='inline-block'
      >
        Cadastre-se!
      </ChakraLink>
    </NextLink>
  );
}
