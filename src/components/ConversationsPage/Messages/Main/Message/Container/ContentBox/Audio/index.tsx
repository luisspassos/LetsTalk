import { Flex, useColorModeValue } from '@chakra-ui/react';
import { Message } from 'components/ConversationsPage/Messages/Main';
import { useAudio } from 'contexts/Audio/AudioContext';
import { useAudiosPlaying } from 'contexts/Audio/AudiosPlaying';
import { useEffect } from 'react';
import { Avatar } from './Avatar';
import { InteractiveElements } from './InteractiveElements';

type AudioComponentProps = {
  index: number;
  isContact: Message['contactMessage'];
};

export function AudioComponent({ index, isContact }: AudioComponentProps) {
  const { setAudio } = useAudio();
  const { setAudiosPlaying } = useAudiosPlaying();

  useEffect(() => {
    function initialize() {
      const audio = new Audio('horse.wav');

      setAudio({
        element: audio,
        index,
      });

      setAudiosPlaying((prevState) => [...prevState, null]);
    }

    initialize();
  }, [index, setAudio, setAudiosPlaying]);

  return (
    <Flex
      color={useColorModeValue('blue.900', 'current')}
      align='center'
      p='.65em'
      bg='inherit'
      borderRadius='inherit'
      gap='.9em'
    >
      <Avatar isContact={isContact} />
      <InteractiveElements />
    </Flex>
  );
}
