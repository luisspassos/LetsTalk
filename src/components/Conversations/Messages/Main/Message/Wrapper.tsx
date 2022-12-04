import { Stack } from '@chakra-ui/react';
import { ReactNode } from 'react';

type WrapperProps = {
  messageIndex: number;
  contactMessage: boolean;
  children: ReactNode;
};

export function Wrapper({
  contactMessage,
  messageIndex,
  children,
}: WrapperProps) {
  const isFirst = messageIndex === 0;

  return (
    <Stack
      alignSelf={!contactMessage ? 'end' : 'current'}
      display='flex'
      spacing='3px'
      mt={isFirst ? 0 : ['14px', '17px', '20px']}
      align={!contactMessage ? 'end' : 'current'}
    >
      {children}
    </Stack>
  );
}
