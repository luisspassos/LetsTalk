import { Box } from '@chakra-ui/react';
import { borderRadius } from '../Container';

export function Video() {
  return (
    <Box p='5px'>
      <Box
        as='video'
        src='./tiktok.mp4'
        controls
        maxH='400px'
        borderRadius={borderRadius}
        sx={{
          '&': {
            colorScheme: 'light dark',
          },
        }}
      />
    </Box>
  );
}

// http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4
