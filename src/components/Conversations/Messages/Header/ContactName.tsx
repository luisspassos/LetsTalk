import { Heading } from '@chakra-ui/react';

export function ContactName() {
  return (
    <Heading
      w='100%'
      maxW='700px'
      textOverflow='ellipsis'
      overflow='hidden'
      whiteSpace='nowrap'
      as='h3'
      fontSize={['15px', '16px', '17px']}
      fontWeight={400}
    >
      Guilherme DE CASTRO DE CASTRO DE CASTRO DE CASTRO DE CASTRO DE CASTRO DE
      CASTRO DE CASTRO DE CASTRO
    </Heading>
  );
}
