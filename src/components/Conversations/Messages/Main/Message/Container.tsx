import { Flex, Box, useColorModeValue } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { Message } from '..';
import { Triangle } from './Triangle';

type ContainerProps = {
  contactMessage: Message['contactMessage'];
  children: ReactNode;
};

export function Container({ contactMessage, children }: ContainerProps) {
  const bgColors = {
    default: useColorModeValue('gray.200', 'gray.400'),
    contactMessage: useColorModeValue('gray.300', 'gray.500'),
  };

  const bg = contactMessage ? bgColors.contactMessage : bgColors.default;

  return (
    <Flex flexDir={contactMessage ? 'unset' : 'row-reverse'}>
      <Box bg={bg} borderRadius='7px' maxW={['240px', '300px', '400px']}>
        {children}
      </Box>
      <Triangle contactMessage={contactMessage} color={bg} />
    </Flex>
  );
}
