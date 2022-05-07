import { Text } from '@chakra-ui/react';

type MessageTextProps = {
  text: string;
  isYourMessage?: boolean;
  bg: {
    default: string;
    isYourMessage: string;
  };
};

export function MessageText({ text, isYourMessage, bg }: MessageTextProps) {
  return (
    <Text
      fontFamily='Roboto'
      borderRadius='7px'
      py={['6px', '8px', '10px']}
      px={['11px', '13px', '15px']}
      fontSize={['14px', '15px', '16px']}
      bg={isYourMessage ? `gray.${bg.isYourMessage}` : `gray.${bg.default}`}
      wordBreak='break-word'
    >
      {text}
    </Text>
  );
}
