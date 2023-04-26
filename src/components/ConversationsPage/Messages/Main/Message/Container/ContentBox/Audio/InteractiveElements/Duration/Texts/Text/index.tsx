import { ChakraProps, Text as ChakraText } from '@chakra-ui/react';

type TextProps = {
  children: string;
};

export const styles: ChakraProps = {
  lineHeight: 'short',
  fontSize: 'small',
};

export function Text({ children }: TextProps) {
  return (
    <ChakraText {...styles} as='time'>
      {children}
    </ChakraText>
  );
}
