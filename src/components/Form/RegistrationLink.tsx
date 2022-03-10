import { Link, Text } from '@chakra-ui/react';
import NextLink from 'next/link';

export function RegistrationLink() {
  return (
    <Text align='center' mt='10px' color='gray.400' fontSize='17px'>
      Não tem uma conta?{' '}
      <NextLink href='/cadastro' passHref>
        <Link color='blue.900'>Cadastre-se!</Link>
      </NextLink>
    </Text>
  );
}
