import { Stack, Flex, useColorModeValue } from '@chakra-ui/react';
import { CreatedAt } from './CreatedAt';
import { MessageText } from './MessageText';

type MessageProps = {
  contactMessage: boolean;
  message: string;
  sentIn: string;
};

export function Message({ contactMessage, message, sentIn }: MessageProps) {
  const bg = {
    default: useColorModeValue('300', '500'),
    contactMessage: useColorModeValue('200', '400'),
  };

  const triangle = {
    values: {
      sizes: ['14px', '17px', '20px'],
      get negativeSizes() {
        return this.sizes.map((size) => `-${size}`);
      },
      get transparentBorder() {
        return this.sizes.map((size) => `${size} solid transparent`);
      },
    },
    styles: {
      display: 'block',
      content: '""',
      w: 0,
      h: 0,
      get borderLeft() {
        return triangle.values.transparentBorder;
      },
      get borderRight() {
        return triangle.values.transparentBorder;
      },
      get borderBottom() {
        return triangle.values.sizes.map(
          (size) =>
            `${size} solid var(--chakra-colors-gray-${
              contactMessage ? bg.contactMessage : bg.default
            })`
        );
      },
      borderRadius: '4px',
      get mr() {
        return contactMessage ? triangle.values.negativeSizes : undefined;
      },
      get ml() {
        return !contactMessage ? triangle.values.negativeSizes : undefined;
      },
    },
  };

  return (
    <Stack
      alignSelf={!contactMessage ? 'end' : undefined}
      display='inline-flex'
      maxW={['240px', '300px', '400px']}
      spacing='3px'
      align={!contactMessage ? 'end' : undefined}
    >
      <Flex
        align='end'
        _before={contactMessage ? triangle.styles : undefined}
        _after={!contactMessage ? triangle.styles : undefined}
      >
        <MessageText bg={bg} text={message} contactMessage={contactMessage} />
      </Flex>
      <CreatedAt text={sentIn} />
    </Stack>
  );
}
