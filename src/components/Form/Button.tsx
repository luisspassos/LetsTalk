import {
  Button as ChakraButton,
  ButtonProps as ChakraButtonProps,
  useColorModeValue,
} from '@chakra-ui/react';

type ButtonProps = {
  text: string;
} & ChakraButtonProps;

export function Button({ text, ...rest }: ButtonProps) {
  const bg = useColorModeValue('gray.400', 'blue.900');

  return (
    <ChakraButton
      transition='0.2s'
      _disabled={{
        bg: bg,
        cursor: 'not-allowed',
        filter: 'brightness(1)',
      }}
      _active={{ bg: bg }}
      _hover={{
        bg: bg,
        filter: 'brightness(0.9)',
      }}
      fontSize={{ base: '15px', sm: '17px' }}
      bg={bg}
      color='gray.50'
      w='100%'
      h={{ base: '43px', sm: '47px' }}
      {...rest}
    >
      {text}
    </ChakraButton>
  );
}
