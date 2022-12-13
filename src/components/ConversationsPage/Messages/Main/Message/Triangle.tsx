import { Box } from '@chakra-ui/react';
import { Message } from '..';

type TriangleProps = {
  color: string;
  contactMessage: Message['contactMessage'];
};

export const borderWidth = ['14px', '17px', '20px'];

const radius = '4px';

export function Triangle({ color, contactMessage }: TriangleProps) {
  return (
    <Box
      borderStyle='solid'
      borderWidth={borderWidth}
      borderBottomRightRadius={contactMessage ? radius : 0}
      borderBottomLeftRadius={!contactMessage ? radius : 0}
      borderColor='transparent'
      borderBottomColor={color}
    />
  );
}
