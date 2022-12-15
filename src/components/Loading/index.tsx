import { Center, Portal } from '@chakra-ui/react';
import { Logo } from './Logo';

export function Loading() {
  return (
    <Portal>
      <Center
        flexDirection='column'
        zIndex='2'
        bg='blue.900'
        top='0'
        left='0'
        pos='absolute'
        h='100vh'
        w='100%'
        gap='10px'
      >
        <Logo />
      </Center>
    </Portal>
  );
}
