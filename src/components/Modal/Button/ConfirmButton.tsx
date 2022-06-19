import { ButtonProps, useColorModeValue } from '@chakra-ui/react';
import { Button } from '.';

type ConfirmButtonProps = {
  text: string;
} & ButtonProps;

export function ConfirmButton({
  text,
  bg: propBg,
  ...rest
}: ConfirmButtonProps) {
  const bg = useColorModeValue(
    propBg ? propBg : 'blue.900',
    propBg ? propBg : 'gray.400'
  );

  return (
    <Button
      textTransform='capitalize'
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
      type='submit'
      {...rest}
    >
      {text}
    </Button>
  );
}
