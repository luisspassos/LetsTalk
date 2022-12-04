import { Heading } from '@chakra-ui/react';

export function Title() {
  return (
    <Heading
      as='h1'
      fontWeight={400}
      fontSize={['22px', '26px', '30px']}
      mb={['7px', '10px', '13px']}
    >
      Conversas
    </Heading>
  );
}
