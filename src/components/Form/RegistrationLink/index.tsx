import { Link, Text } from '@chakra-ui/react';
import NextLink from 'next/link';

export function RegistrationLink() {
  return (
    <Text
      align='center'
      color='gray.400'
      fontSize={{ base: '15px', sm: '17px' }}
      mt='10px'
    >
      Não tem uma conta?{' '}
      <NextLink href='/cadastro' passHref>
        <Link color='blue.900' d='inline-block'>
          Cadastre-se!
        </Link>
      </NextLink>
    </Text>
  );
}
