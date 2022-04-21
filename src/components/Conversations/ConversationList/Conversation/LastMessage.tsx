import { Text } from '@chakra-ui/react';

type LastMessageProps = {
  text: string;
};

export function LastMessage({ text }: LastMessageProps) {
  return (
    <Text
      as='small'
      maxW={['125px', '145px', '165px']}
      isTruncated
      fontSize={['12px', '13px', '14px']}
      opacity='90%'
    >
      {text}
    </Text>
  );
}
