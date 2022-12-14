import { Hide, Show } from '@chakra-ui/react';
import { Button } from './Button';
import { IconButton } from './IconButton';

export function AddContactButton() {
  const text = 'Adicionar contato';

  return (
    <>
      <Show above='md'>
        <IconButton label={text} />
      </Show>
      <Hide above='md'>
        <Button text={text} />
      </Hide>
    </>
  );
}
