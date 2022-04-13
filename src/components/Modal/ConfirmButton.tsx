import { Button } from '@chakra-ui/react';

type ConfirmButtonProps = {
  text: string;
};

export function ConfirmButton({ text }: ConfirmButtonProps) {
  return (
    <Button
      bg='blue.900'
      color='gray.50'
      transition='0.2s'
      _hover={{
        filter: 'brightness(1.1)',
      }}
    >
      {text}
    </Button>
  );
}
