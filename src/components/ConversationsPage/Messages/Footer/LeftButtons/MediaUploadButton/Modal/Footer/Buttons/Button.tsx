import {
  Button as ChakraButton,
  ButtonProps,
  useBreakpointValue,
} from '@chakra-ui/react';

export function Button(props: ButtonProps) {
  const size = useBreakpointValue(['sm', 'md']);

  return <ChakraButton color='gray.50' size={size} {...props} />;
}
