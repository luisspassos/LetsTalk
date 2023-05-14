import {
  FormLabel,
  useColorModeValue,
  FormLabelProps as ChakraLabelProps,
} from '@chakra-ui/react';

type LabelProps = {
  children: string;
} & ChakraLabelProps;

export function Label({ children, ...rest }: LabelProps) {
  return (
    <FormLabel
      display='inline-block'
      mb='0'
      fontSize='17px'
      htmlFor='email'
      color={useColorModeValue('gray.400', 'gray.50')}
      {...rest}
    >
      {children}
    </FormLabel>
  );
}
