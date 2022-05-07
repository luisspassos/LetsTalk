import { useColorModeValue, Link } from '@chakra-ui/react';
import NextLink from 'next/link';

export function ForgotMyPasswordLink() {
  return (
    <NextLink href='/esqueci-minha-senha' passHref>
      <Link
        mt='6px'
        mb='12px'
        fontSize='15px'
        color={useColorModeValue('gray.400', 'gray.50')}
        d='inline-block'
      >
        Esqueci minha senha
      </Link>
    </NextLink>
  );
}
