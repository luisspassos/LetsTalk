import { Stack, Flex, useColorModeValue } from '@chakra-ui/react';
import { CreatedAt } from './CreatedAt';
import { MessageText } from './MessageText';

type MessageProps = {
  isYourMessage?: boolean;
  data: {
    text: string;
    createdAt: string;
  };
};

export function Message({
  isYourMessage,
  data: { text, createdAt },
}: MessageProps) {
  const bg = {
    default: useColorModeValue('300', '500'),
    isYourMessage: useColorModeValue('200', '400'),
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
              isYourMessage ? bg.isYourMessage : bg.default
            })`
        );
      },
      borderRadius: '4px',
      get mr() {
        return !isYourMessage ? triangle.values.negativeSizes : undefined;
      },
      get ml() {
        return isYourMessage ? triangle.values.negativeSizes : undefined;
      },
    },
  };

  return (
    <Stack
      alignSelf={isYourMessage ? 'end' : undefined}
      display='inline-flex'
      maxW={['240px', '300px', '400px']}
      spacing='3px'
      align={isYourMessage ? 'end' : undefined}
    >
      <Flex
        align='end'
        _before={!isYourMessage ? triangle.styles : undefined}
        _after={isYourMessage ? triangle.styles : undefined}
      >
        <MessageText bg={bg} text={text} isYourMessage={isYourMessage} />
      </Flex>
      <CreatedAt text={createdAt} />
    </Stack>
  );
}
