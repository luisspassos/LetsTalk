import { useToast } from '@chakra-ui/react';
import { toastConfig } from './toastConfig';

type useWarningToastParam = string | undefined;

export function useWarningToast(
  title: useWarningToastParam = undefined,
  description: useWarningToastParam = undefined
) {
  const toast = useToast();

  const warningToast = () =>
    toast(toastConfig({ title, description, status: 'warning' }));

  return warningToast;
}
