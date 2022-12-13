import { Heading, Text } from '@chakra-ui/react';

export function Description() {
  return (
    <>
      <Heading as='h1' fontWeight={700}>
        Mais de 200 mil usuários já
        <br /> estão conversando!
      </Heading>
      <Text fontSize='1.4rem'>
        Junte-se e converse com outras
        <br /> pessoas!
      </Text>
    </>
  );
}
