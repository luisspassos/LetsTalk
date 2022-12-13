import { Text, useColorModeValue } from '@chakra-ui/react';

type SentInProps = {
  text: string;
};

export function SentIn({ text }: SentInProps) {
  return (
    <Text
      fontSize={['13px', '14px', '15px']}
      color={useColorModeValue('blackAlpha.800', 'whiteAlpha.700')}
      as='time'
    >
      {text}
    </Text>
  );
}
