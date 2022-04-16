import { ButtonProps } from '@chakra-ui/react';
import { Button } from '.';

export function CancelButton(props: ButtonProps) {
  return (
    <Button colorScheme='red' variant='outline' {...props}>
      Cancelar
    </Button>
  );
}
