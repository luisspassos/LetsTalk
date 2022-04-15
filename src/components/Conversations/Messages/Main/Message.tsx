import { Text, Stack, Flex } from '@chakra-ui/react';

type MessageProps = {
  isYourMessage?: boolean;
};

export function Message({ isYourMessage }: MessageProps) {
  const triangle = {
    values: {
      borderRadius: '4px',
    },
    styles: {
      display: 'block',
      content: '""',
      w: 0,
      h: 0,
      borderLeft: [
        '14px solid transparent',
        '17px solid transparent',
        '20px solid transparent',
      ],
      borderRight: [
        '14px solid transparent',
        '17px solid transparent',
        '20px solid transparent',
      ],
      borderBottom: `20px solid var(--chakra-colors-gray-${
        isYourMessage ? '200' : '300'
      })`,
      get borderRadius() {
        return triangle.values.borderRadius;
      },
      mr: !isYourMessage ? '-20px' : undefined,
      ml: isYourMessage ? '-20px' : undefined,
    },
  };

  return (
    <Stack
      alignSelf={isYourMessage ? 'end' : undefined}
      display='inline-flex'
      maxW='400px'
      spacing='3px'
      align={isYourMessage ? 'end' : undefined}
    >
      <Flex
        align='end'
        _before={!isYourMessage ? triangle.styles : undefined}
        _after={isYourMessage ? triangle.styles : undefined}
      >
        <Text
          fontFamily='Roboto'
          borderRadius='7px'
          py='10px'
          px='15px'
          bg={isYourMessage ? 'gray.200' : 'gray.300'}
          wordBreak='break-word'
        >
          a
        </Text>
      </Flex>
      <Text fontSize='15px' color='gray.900' opacity='80%' as='time'>
        Hoje, 13:30.
      </Text>
    </Stack>
  );
}
