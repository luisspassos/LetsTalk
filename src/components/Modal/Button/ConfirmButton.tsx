import { ButtonProps, useColorModeValue } from '@chakra-ui/react';
import { Button } from '.';

type ConfirmButtonProps = {
  text: string;
} & ButtonProps;

export function ConfirmButton({ text, ...rest }: ConfirmButtonProps) {
  const bg = useColorModeValue('blue.900', 'gray.400');

  return (
    <Button
      bg={bg}
      color='gray.50'
      transition='0.2s'
      _hover={{
        filter: 'brightness(1.1)',
      }}
      _active={{
        bg: bg,
        filter: 'brightness(1.1)',
      }}
      _disabled={{
        bg: bg,
        cursor: 'default',
      }}
      {...rest}
    >
      {text}
    </Button>
  );
}
