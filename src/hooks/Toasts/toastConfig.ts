import { UseToastOptions } from '@chakra-ui/react';

export function toastConfig(config: UseToastOptions) {
  return {
    title: 'title',
    description: 'description',
    status: 'error',
    duration: 6000,
    isClosable: true,
    position: 'top-right',
    ...config,
  } as UseToastOptions;
}
