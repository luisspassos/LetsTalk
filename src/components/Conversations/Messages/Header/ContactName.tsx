import { Heading } from '@chakra-ui/react';

type ContactNameProps = {
  text: string;
};

export function ContactName({ text }: ContactNameProps) {
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
      {text}
    </Heading>
  );
}
