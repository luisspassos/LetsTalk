import { FormLabel, useColorModeValue } from '@chakra-ui/react';

type LabelProps = {
  children: string;
};

export function Label({ children }: LabelProps) {
  return (
    <FormLabel
      display='inline-block'
      mb='0'
      fontSize='17px'
      color={useColorModeValue('gray.400', 'gray.50')}
    >
      {children}
    </FormLabel>
  );
}
