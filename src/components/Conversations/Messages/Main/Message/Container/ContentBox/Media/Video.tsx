import { Box } from '@chakra-ui/react';
import { Wrapper } from './Wrapper';

export function Video() {
  return (
    <Wrapper>
      <Box
        as='video'
        src='./tiktok.mp4'
        controls
        sx={{
          '&': {
            colorScheme: 'light dark',
          },
        }}
      />
    </Wrapper>
  );
}

// http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4
