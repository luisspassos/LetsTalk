import { Text } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { font } from '../../../Footer/MessageInput';

type TextComponentProps = {
  children: ReactNode;
  contactMessage?: boolean;
};

export function TextComponent({ children }: TextComponentProps) {
  return (
    <Text
      fontFamily={font}
      py={['6px', '8px', '10px']}
      px={['11px', '13px', '15px']}
      fontSize={['14px', '15px', '16px']}
    >
      {children}
    </Text>
  );
}
