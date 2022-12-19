import { Button } from './Button';

export function SendButton() {
  return (
    <Button
      bg='gray.400'
      _hover={{
        bg: 'gray.600',
      }}
    >
      ENVIAR
    </Button>
  );
}
