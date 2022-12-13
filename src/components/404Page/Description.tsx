import { Heading, useColorModeValue } from '@chakra-ui/react';

export function Description() {
  return (
    <Heading as='h1' color={useColorModeValue('blue.900', 'gray.50')}>
      Opss! Parece que esta
      <br /> página não existe...
    </Heading>
  );
}
