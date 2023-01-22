import { Box, Center } from '@chakra-ui/react';
import { Slider } from 'components/ConversationsPage/Messages/Main/Message/Container/ContentBox/Audio/Duration/Slider';

export default function Audiaao() {
  return (
    <Center h='100vh'>
      <Box w='200px'>
        <Slider />
      </Box>
    </Center>
  );
}
