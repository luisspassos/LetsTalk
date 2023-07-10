import { createStandaloneToast, UseToastOptions } from '@chakra-ui/react';
import { theme } from '../../styles/theme';

const chakraToast = createStandaloneToast({ theme });

export function toast(opts: UseToastOptions) {
  chakraToast({
    duration: 6 * 1000 /* 6 seconds */,
    isClosable: true,
    position: 'top-right',
    ...opts,
  });
}
