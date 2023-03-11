import { Flex } from '@chakra-ui/react';
import { Avatar } from './Avatar';
import { ContactName } from './ContactName';
import { OnlineAt } from './OnlineAt';

export function ContactInfo() {
  return (
    <>
      <Avatar />

      <Flex direction='column' minW={0}>
        <ContactName />
        <OnlineAt />
      </Flex>
    </>
  );
}
