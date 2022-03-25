import { Heading } from '@chakra-ui/react';

type FormTitleProps = {
  text: string;
};

export function FormTitle({ text }: FormTitleProps) {
  return <Heading as='h1'>{text}</Heading>;
}
