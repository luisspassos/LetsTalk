import {
  Input as ChakraInput,
  useColorModeValue,
  InputProps,
} from '@chakra-ui/react';

export function Input(props: InputProps) {
  return (
    <ChakraInput
      fontSize={['14px', '15px', '16px']}
      borderRadius={['11px', '13px', '15px']}
      h={['40px', '44px', '48px']}
      bg={useColorModeValue('white', 'blackAlpha.500')}
      placeholder='Pesquisar conversa...'
      boxShadow='base'
      pl={['39px', '42px', '45px']}
      {...props}
    />
  );
}
