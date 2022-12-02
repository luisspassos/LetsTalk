import { Box, Flex, Stack, useColorModeValue } from '@chakra-ui/react';
import { CreatedAt } from '../Message/CreatedAt';

export function Video() {
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
              true ? bg.contactMessage : bg.default
            })`
        );
      },
      borderRadius: '4px',
      get mr() {
        return triangle.values.negativeSizes;
      },
      // get ml() {
      //   return triangle.values.negativeSizes;
      // },
    },
  };

  return (
    <Stack display='flex' spacing='3px' mt={['14px', '17px', '20px']}>
      <Flex align='end' _before={triangle.styles}>
        <Box p='5px' bg='gray.400' borderRadius='7px'>
          <Box
            as='video'
            src='./tiktok.mp4'
            maxW='400px'
            maxH='400px'
            controls
            borderRadius='7px'
            sx={{
              '&': {
                colorScheme: 'light dark',
              },
            }}
          ></Box>
        </Box>
      </Flex>
      <CreatedAt text='20:00' />
    </Stack>
  );
}
