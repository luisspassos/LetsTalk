import { Box } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { Message } from '../../..';
import { borderWidth } from '../../Triangle';

const negativeMargin = borderWidth.map((w) => '-' + w);

type ContentBoxProps = {
  children: ReactNode;
  contactMessage: Message['contactMessage'];
  bg: string;
};

export function ContentBox({ children, bg, contactMessage }: ContentBoxProps) {
  return (
    <Box
      pos='relative'
      mr={contactMessage ? negativeMargin : 0}
      ml={!contactMessage ? negativeMargin : 0}
      bg={bg}
      maxW={['240px', '300px', '400px']}
      sx={{
        '&, & *': {
          borderRadius: '5px',
        },
      }}
    >
      {children}
    </Box>
  );
}
