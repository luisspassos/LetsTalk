import { Show, Hide } from '@chakra-ui/react';
import { Button } from './Button';
import { IconButton } from './IconButton';

export function Buttons() {
  const text = 'Adicionar contato';
  const breakpoint = '28.25em';

  return (
    <>
      <Show breakpoint={`(max-width: ${breakpoint})`}>
        <IconButton label={text} />
      </Show>
      <Hide breakpoint={`(max-width: ${breakpoint})`}>
        <Button text={text} />
      </Hide>
    </>
  );
}
