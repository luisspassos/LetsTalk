import { IconButton, IconButtonProps } from '@chakra-ui/react';

export type BaseProps = IconButtonProps;

export function Base(props: BaseProps) {
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
