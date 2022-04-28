import { Text } from '@chakra-ui/react';

type MessageTextProps = {
  text: string;
  isYourMessage?: boolean;
};

export function MessageText({ text, isYourMessage }: MessageTextProps) {
  return (
    <Text
      fontFamily='Roboto'
      borderRadius='7px'
      py={['6px', '8px', '10px']}
      px={['11px', '13px', '15px']}
      fontSize={['14px', '15px', '16px']}
      bg={isYourMessage ? 'gray.200' : 'gray.300'}
      wordBreak='break-word'
    >
      {text}
    </Text>
  );
}
