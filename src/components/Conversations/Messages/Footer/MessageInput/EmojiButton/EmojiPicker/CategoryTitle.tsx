import { Heading } from '@chakra-ui/react';

type CategoryTitleProps = {
  text: string;
};

export function CategoryTitle({ text }: CategoryTitleProps) {
  return (
    <Heading as='h3' fontWeight='400' color='whiteAlpha.800' fontSize='15px'>
      {text}
    </Heading>
  );
}
