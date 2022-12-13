import { Flex, useColorModeValue } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { Message } from '../..';
import { Triangle } from '../Triangle';
import { ContentBox } from './ContentBox';

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
      <ContentBox bg={bg} contactMessage={contactMessage}>
        {children}
      </ContentBox>
      <Triangle contactMessage={contactMessage} color={bg} />
    </Flex>
  );
}
