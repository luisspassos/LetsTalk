import { useToast } from '@chakra-ui/react';

type useSuccessToastParams = {
  title: string;
  description?: string;
};

export function useSuccessToast({ description, title }: useSuccessToastParams) {
  const toast = useToast();

  const successToast = () =>
    toast({
      title: title,
      description: description,
      status: 'success',
      duration: 5000,
      isClosable: true,
      position: 'top-right',
    });

  return successToast;
}
