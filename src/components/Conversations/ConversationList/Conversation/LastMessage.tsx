import { Text } from '@chakra-ui/react';

type LastMessageProps = {
  text: string;
};

export function LastMessage({ text }: LastMessageProps) {
  return (
    <Text
      as='small'
      maxW={['107px', '127px', '147px']}
      isTruncated
      fontSize={['12px', '13px', '14px']}
      opacity='90%'
    >
      {text}
    </Text>
  );
}
