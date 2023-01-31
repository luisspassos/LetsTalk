import { Text as ChakraText } from '@chakra-ui/react';

type TextProps = {
  children: string;
};

export function Text({ children }: TextProps) {
  return (
    <ChakraText lineHeight='short' fontSize='small' as='time'>
      {children}
    </ChakraText>
  );
}
