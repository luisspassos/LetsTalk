import { Button } from './Button';

export function CancelButton() {
  return (
    <Button
      bg='red.600'
      _hover={{
        bg: 'red.700',
      }}
      _active={{
        bg: 'red.700',
      }}
    >
      CANCELAR
    </Button>
  );
}
