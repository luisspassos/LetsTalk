import { Text, Stack, Flex } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useDate } from '../../../../hooks/useDate';

type MessageProps = {
  isYourMessage?: boolean;
  data: {
    text: string;
    createdAt: number;
  };
};

export function Message({
  isYourMessage,
  data: { text, createdAt },
}: MessageProps) {
  const {
    dateInArray: [date, hours],
    isYesterday,
  } = useDate(new Date(createdAt));

  const createdAtFormatted = useMemo(() => {
    if (isYesterday) {
      return `${date}, ${hours}.`;
    } else {
      return `Hoje, ${hours}.`;
    }
  }, [isYesterday, date, hours]);

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
              isYourMessage ? '200' : '300'
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
        <Text
          fontFamily='Roboto'
          borderRadius='7px'
          py={['6px', '8px', '10px']}
          px={['11px', '13px', '15px']}
          fontSize={['14px', '15px', '16px']}
          bg={isYourMessage ? 'gray.200' : 'gray.300'}
          wordBreak='break-word'
        >
          {text}
        </Text>
      </Flex>
      <Text
        fontSize={['13px', '14px', '15px']}
        color='gray.900'
        opacity='80%'
        as='time'
      >
        {createdAtFormatted}
      </Text>
    </Stack>
  );
}
