import { Box, BoxProps } from '@chakra-ui/react';

type VideoProps = {
  src: string;
} & BoxProps;

export function Video(props: VideoProps) {
  return (
    <Box
      as='video'
      controls
      sx={{
        '&': {
          colorScheme: 'light dark',
        },
      }}
      {...props}
    />
  );
}
