import { Heading, HeadingProps } from '@chakra-ui/react';

type FormTitleProps = {
  text: string;
} & HeadingProps;

export function FormTitle({ text, ...rest }: FormTitleProps) {
  return (
    <Heading
      {...rest}
      fontSize={['1.5rem', '1.6rem', '1.8rem']}
      fontWeight={600}
      color='blue.900'
      as='h1'
      textAlign='center'
    >
      {text}
    </Heading>
  );
}
