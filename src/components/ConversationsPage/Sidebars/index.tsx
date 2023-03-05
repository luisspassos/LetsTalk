import { Hide, Show } from '@chakra-ui/react';
import { breakpoints } from 'styles/breakpoints';
import { Default } from './Default';
import { SmallScreen } from './SmallScreen';

export function Sidebars() {
  return (
    <>
      <Show breakpoint={`(max-width: ${breakpoints.sidebar.value})`}>
        <SmallScreen />
      </Show>
      <Hide breakpoint={`(max-width: ${breakpoints.sidebar.value})`}>
        <Default />
      </Hide>
    </>
  );
}
