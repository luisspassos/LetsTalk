import { Text } from '@chakra-ui/react';

type OnlineAtProps = {
  text: string;
};

export function OnlineAt({ text }: OnlineAtProps) {
  return (
    <Text as='time' fontSize={['12px', '13px', '14px']} opacity='80%'>
      {text}
    </Text>
  );
}
