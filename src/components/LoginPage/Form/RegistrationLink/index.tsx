import { Text, useColorModeValue } from '@chakra-ui/react';
import { Link } from './Link';

export function RegistrationLink() {
  return (
    <Text
      align='center'
      color={useColorModeValue('gray.400', 'gray.200')}
      fontSize={{ base: '15px', sm: '17px' }}
      mt='10px'
    >
      Não tem uma conta? <Link />
    </Text>
  );
}
