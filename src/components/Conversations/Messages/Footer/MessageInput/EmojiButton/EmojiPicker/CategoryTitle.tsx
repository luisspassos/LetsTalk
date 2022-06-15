import { Heading, useColorModeValue } from '@chakra-ui/react';

type CategoryTitleProps = {
  text: string;
};

export function CategoryTitle({ text }: CategoryTitleProps) {
  return (
    <Heading
      as='h3'
      fontWeight='400'
      color={useColorModeValue('blackAlpha.800', 'whiteAlpha.800')}
      fontSize='15px'
    >
      {text}
    </Heading>
  );
}
