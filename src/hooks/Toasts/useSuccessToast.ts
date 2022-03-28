import { useToast } from '@chakra-ui/react';
import { toastConfig } from './toastConfig';

type useSuccessToastParam = string | undefined;

export function useSuccessToast(
  title: useSuccessToastParam = undefined,
  description: useSuccessToastParam = undefined
) {
  const toast = useToast();

  const successToast = () =>
    toast(toastConfig({ title, description, status: 'success' }));

  return successToast;
}
