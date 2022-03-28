import { useToast } from '@chakra-ui/react';
import { toastConfig } from './toastConfig';

export function useErrorToast(
  title = 'Ocorreu um erro desconhecido',
  description: string | undefined = undefined
) {
  const toast = useToast();

  const errorToast = () =>
    toast(toastConfig({ title, description, status: 'error' }));

  return errorToast;
}
