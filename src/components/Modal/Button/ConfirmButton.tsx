import { ButtonProps } from '@chakra-ui/react';
import { Button } from '.';

type ConfirmButtonProps = {
  text: string;
} & ButtonProps;

export function ConfirmButton({ text, ...rest }: ConfirmButtonProps) {
  return (
    <Button
      bg='blue.900'
      color='gray.50'
      transition='0.2s'
      _hover={{
        filter: 'brightness(1.1)',
      }}
      _active={{
        bg: 'blue.900',
        filter: 'brightness(1.1)',
      }}
      {...rest}
    >
      {text}
    </Button>
  );
}
