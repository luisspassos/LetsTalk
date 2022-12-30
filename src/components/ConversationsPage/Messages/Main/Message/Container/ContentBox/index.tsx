import { Box, BoxProps } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { Message } from '../../..';
import { borderWidth } from '../../Triangle';

const negativeMargin = borderWidth.map((w) => '-' + w);

export type ChakraContentBoxProps = BoxProps;

type ContentBoxProps = {
  children: ReactNode;
  contactMessage: Message['contactMessage'];
  chakraProps: ChakraContentBoxProps;
};

export function ContentBox({
  children,
  contactMessage,
  chakraProps,
}: ContentBoxProps) {
  return (
    <Box
      pos='relative'
      mr={contactMessage ? negativeMargin : 0}
      ml={!contactMessage ? negativeMargin : 0}
      maxW={['240px', '300px', '400px']}
      {...chakraProps}
      sx={{
        '&, & > video, & > img': {
          borderRadius: '5px',
        },
      }}
    >
      {children}
    </Box>
  );
}
