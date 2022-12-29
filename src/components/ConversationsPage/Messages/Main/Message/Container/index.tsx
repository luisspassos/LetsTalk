import { Flex, useColorModeValue } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { Message } from '../..';
import { Triangle } from '../Triangle';
import { ChakraContentBoxProps, ContentBox } from './ContentBox';

type ContainerProps = {
  contactMessage: Message['contactMessage'];
  children: ReactNode;
  contentBoxProps: ChakraContentBoxProps;
};

export function Container({
  contactMessage,
  children,
  contentBoxProps,
}: ContainerProps) {
  const bgColors = {
    default: useColorModeValue('gray.200', 'gray.400'),
    contactMessage: useColorModeValue('gray.300', 'gray.500'),
  };

  const bg = contactMessage ? bgColors.contactMessage : bgColors.default;

  return (
    <Flex
      justify={contactMessage ? 'end' : 'start'}
      flexDir={contactMessage ? 'unset' : 'row-reverse'}
      w='100%'
    >
      <ContentBox
        chakraProps={{ ...contentBoxProps, bg }}
        contactMessage={contactMessage}
      >
        {children}
      </ContentBox>
      <Triangle contactMessage={contactMessage} color={bg} />
    </Flex>
  );
}
