import { Flex } from '@chakra-ui/react';
import { Avatar } from './Avatar';
import { ContactName } from './ContactName';
import { OnlineAt } from './OnlineAt';

export type ContactInfoProps = {
  parentWidth: number;
};

export function ContactInfo({ parentWidth }: ContactInfoProps) {
  return (
    <>
      <Avatar />

      <Flex direction='column' minW={0}>
        <ContactName parentWidth={parentWidth} />
        <OnlineAt parentWidth={parentWidth} />
      </Flex>
    </>
  );
}
