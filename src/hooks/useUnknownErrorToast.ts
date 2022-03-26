import { useToast } from '@chakra-ui/react';

export function useUnknownErrorToast() {
  const toast = useToast();

  const unknownErrorToast = () =>
    toast({
      title: 'Ocorreu um erro desconhecido',
      status: 'error',
      duration: 5000,
      isClosable: true,
      position: 'top-right',
    });

  return unknownErrorToast;
}
