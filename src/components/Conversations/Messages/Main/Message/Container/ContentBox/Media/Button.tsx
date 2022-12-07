import { IconButton, IconButtonProps } from '@chakra-ui/react';

type ButtonProps = IconButtonProps;

export function Button({ ...props }: ButtonProps) {
  return <IconButton fontSize='25px' bg='transparent' {...props} />;
}
