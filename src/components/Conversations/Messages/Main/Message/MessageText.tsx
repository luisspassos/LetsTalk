import { Text } from '@chakra-ui/react';

type MessageTextProps = {
  text: string;
  contactMessage?: boolean;
  bg: {
    default: string;
    contactMessage: string;
  };
};

export function MessageText({ text, contactMessage, bg }: MessageTextProps) {
  return (
    <Text
      fontFamily='Roboto'
      borderRadius='7px'
      py={['6px', '8px', '10px']}
      px={['11px', '13px', '15px']}
      fontSize={['14px', '15px', '16px']}
      bg={contactMessage ? `gray.${bg.contactMessage}` : `gray.${bg.default}`}
      wordBreak='break-word'
    >
      {text}
    </Text>
  );
}
