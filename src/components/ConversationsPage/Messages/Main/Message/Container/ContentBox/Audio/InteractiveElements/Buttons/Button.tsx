import { IconButton, IconButtonProps } from '@chakra-ui/react';

type ButtonProps = IconButtonProps;

export function Button(props: ButtonProps) {
  return (
    <IconButton
      variant='unstyled'
      p={0}
      h='auto'
      minW='0'
      display='inline-flex'
      fontSize='2.2em'
      _focus={{
        boxShadow: 'none',
      }}
      _focusVisible={{
        boxShadow: 'outline',
      }}
      {...props}
    />
  );
}
