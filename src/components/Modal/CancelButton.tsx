import { Button, ButtonProps } from '@chakra-ui/react';

export function CancelButton(props: ButtonProps) {
  return (
    <Button colorScheme='red' variant='outline' {...props}>
      Cancelar
    </Button>
  );
}
