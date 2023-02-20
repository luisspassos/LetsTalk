import { VStack } from '@chakra-ui/react';
import { Avatar } from './Avatar';
import { ContactName } from './ContactName';
import { OnlineAt } from './OnlineAt';

export function ContactInfo() {
  return (
    <>
      <Avatar />

      <VStack minW={0} align='start' spacing={0}>
        <ContactName />
        <OnlineAt />
      </VStack>
    </>
  );
}
