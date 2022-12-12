import {
  forwardRef,
  Input as ChakraInput,
  useColorModeValue,
  InputProps,
} from '@chakra-ui/react';

export const Input = forwardRef<InputProps, 'input'>((props, ref) => {
  return (
    <ChakraInput
      ref={ref}
      h='49px'
      bg={useColorModeValue('white', 'gray.500')}
      {...props}
    />
  );
});
