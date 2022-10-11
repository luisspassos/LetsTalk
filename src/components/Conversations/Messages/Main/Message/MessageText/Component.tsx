import { Text } from '@chakra-ui/react';
import { ReactNode } from 'react';

type MessageTextComponentProps = {
  children: ReactNode;
  contactMessage?: boolean;
  bg: {
    default: string;
    contactMessage: string;
  };
};

export const font = 'Roboto, Noto Color Emoji, sans-serif';

export function MessageTextComponent({
  children,
  contactMessage,
  bg,
}: MessageTextComponentProps) {
  return (
    <Text
      fontFamily={font}
      borderRadius='7px'
      py={['6px', '8px', '10px']}
      px={['11px', '13px', '15px']}
      maxW={['240px', '300px', '400px']}
      fontSize={['14px', '15px', '16px']}
      bg={contactMessage ? `gray.${bg.contactMessage}` : `gray.${bg.default}`}
    >
      {children}
    </Text>
  );
}
