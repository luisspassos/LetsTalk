import { Text, useColorModeValue } from '@chakra-ui/react';

type LastMessageTimeProps = {
  text: string;
};

export function LastMessageTime({ text }: LastMessageTimeProps) {
  return (
    <Text
      as='time'
      fontSize={['11px', '12px', '13px']}
      color={useColorModeValue('blackAlpha.800', 'whiteAlpha.700')}
    >
      {text}
    </Text>
  );
}
