import { Link, Text, useColorModeValue } from '@chakra-ui/react';
import NextLink from 'next/link';

export function RegistrationLink() {
  return (
    <Text
      align='center'
      color={useColorModeValue('gray.400', 'gray.200')}
      fontSize={{ base: '15px', sm: '17px' }}
      mt='10px'
    >
      Não tem uma conta?{' '}
      <NextLink href='/cadastro' passHref>
        <Link color={useColorModeValue('blue.900', 'gray.50')} d='inline-block'>
          Cadastre-se!
        </Link>
      </NextLink>
    </Text>
  );
}
