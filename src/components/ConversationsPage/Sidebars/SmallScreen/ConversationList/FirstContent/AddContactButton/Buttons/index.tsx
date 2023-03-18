import { Show, Hide } from '@chakra-ui/react';
import { Button } from './Button';
import { IconButton } from './IconButton';

export function Buttons() {
  const breakpoint = '28.25em';

  return (
    <>
      <Show breakpoint={`(max-width: ${breakpoint})`}>
        <IconButton />
      </Show>
      <Hide breakpoint={`(max-width: ${breakpoint})`}>
        <Button />
      </Hide>
    </>
  );
}
