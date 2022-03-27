import { useToast } from '@chakra-ui/react';

type useSuccessToastParam = string | undefined;

export function useSuccessToast(
  title: useSuccessToastParam = undefined,
  description: useSuccessToastParam = undefined
) {
  const toast = useToast();

  const successToast = () =>
    toast({
      title: title,
      description: description,
      status: 'success',
      duration: 6000,
      isClosable: true,
      position: 'top-right',
    });

  return successToast;
}
