import { Text } from '@chakra-ui/react';

type LastMessageTimeProps = {
  text: string;
};

export function LastMessageTime({ text }: LastMessageTimeProps) {
  return (
    <Text as='time' fontSize={['11px', '12px', '13px']} opacity='80%'>
      {text}
    </Text>
  );
}
