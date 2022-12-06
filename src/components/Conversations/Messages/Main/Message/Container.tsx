import { Flex, Box, useColorModeValue } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { Message } from '..';
import { borderWidth, Triangle } from './Triangle';

type ContainerProps = {
  contactMessage: Message['contactMessage'];
  children: ReactNode;
};

export const borderRadius = '7px';

const negativeMargin = borderWidth.map((w) => '-' + w);

export function Container({ contactMessage, children }: ContainerProps) {
  const bgColors = {
    default: useColorModeValue('gray.200', 'gray.400'),
    contactMessage: useColorModeValue('gray.300', 'gray.500'),
  };

  const bg = contactMessage ? bgColors.contactMessage : bgColors.default;

  return (
    <Flex flexDir={contactMessage ? 'unset' : 'row-reverse'}>
      <Box
        pos='relative'
        mr={contactMessage ? negativeMargin : 0}
        ml={!contactMessage ? negativeMargin : 0}
        bg={bg}
        borderRadius='7px'
        maxW={['240px', '300px', '400px']}
      >
        {children}
      </Box>
      <Triangle contactMessage={contactMessage} color={bg} />
    </Flex>
  );
}
