import { Text, useColorModeValue } from '@chakra-ui/react';

type SentInProps = {
  text: string;
};

export function SentIn({ text }: SentInProps) {
  return (
    <Text
      fontSize={['13px', '14px', '15px']}
      color={useColorModeValue('gray.900', 'gray.50')}
      opacity='80%'
      as='time'
    >
      {text}
    </Text>
  );
}
