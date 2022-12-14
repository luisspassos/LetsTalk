import { IconButton, IconButtonProps } from '@chakra-ui/react';

type ButtonProps = IconButtonProps;

export function Button(props: ButtonProps) {
  return (
    <IconButton
      minW={0}
      w={['30px', '35px', '40px']}
      h={['30px', '35px', '40px']}
      fontSize={['24px', '27px', '30px']}
      variant='ghost'
      {...props}
    />
  );
}
