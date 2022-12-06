import { Box } from '@chakra-ui/react';
import { Message } from '..';

type TriangleProps = {
  color: string;
  contactMessage: Message['contactMessage'];
};

const borderWidth = ['14px', '17px', '20px'];
const margin = borderWidth.map((w) => '-' + w);

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
      ml={contactMessage ? margin : 0}
      mr={!contactMessage ? margin : 0}
    />
  );
}
