import { Box, Text, TextProps } from '@chakra-ui/react';

type CurrentTimeProps = {
  children: string;
} & TextProps;

export function CurrentTime({ children, ...rest }: CurrentTimeProps) {
  return (
    <Box aria-live='polite' display='inline-flex'>
      <Text as='time' {...rest}>
        {children}
      </Text>
    </Box>
  );
}
