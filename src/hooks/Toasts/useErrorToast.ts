import { useToast } from '@chakra-ui/react';

export function useErrorToast(
  title = 'Ocorreu um erro desconhecido',
  description: string | undefined = undefined
) {
  const toast = useToast();

  const errorToast = () =>
    toast({
      title: title,
      description: description,
      status: 'error',
      duration: 6000,
      isClosable: true,
      position: 'top-right',
    });

  return errorToast;
}
