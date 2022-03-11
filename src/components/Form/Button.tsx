import {
  Button as ChakraButton,
  ButtonProps as ChakraButtonProps,
} from '@chakra-ui/react';

type ButtonProps = {
  text: string;
} & ChakraButtonProps;

export function Button({ text, ...rest }: ButtonProps) {
  return (
    <ChakraButton
      transition='0.2s'
      _active={{ bg: 'gray.400' }}
      _hover={{ bg: 'gray.400', filter: 'brightness(0.9)' }}
      fontSize={{ base: '15px', sm: '17px' }}
      bg='gray.400'
      color='gray.50'
      w='100%'
      h={{ base: '43px', sm: '47px' }}
      {...rest}
    >
      {text}
    </ChakraButton>
  );
}
