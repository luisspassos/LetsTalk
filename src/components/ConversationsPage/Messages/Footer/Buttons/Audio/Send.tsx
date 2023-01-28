import { Flex, Text } from '@chakra-ui/react';
import { Props } from '.';
import { Base } from '../Send/Base';
import { DeleteButton } from './DeleteButton';
import { PlayButton } from 'components/ConversationsPage/Messages/Main/Message/Container/ContentBox/Audio/InteractiveElements/Buttons/PlayButton';
import { Slider } from 'components/ConversationsPage/Messages/Main/Message/Container/ContentBox/Audio/InteractiveElements/Duration/Slider';

type SendProps = Props;

export function Send({ setCurrentButton }: SendProps) {
  function handleSendAudio() {
    setCurrentButton('record');
  }

  return (
    <Flex w='600px'>
      <DeleteButton />
      <Flex align='center' justify='stretch' flex='1'>
        <PlayButton />
        <Slider />
        <Text as='time'>3:48</Text>
      </Flex>
      <Base label='Enviar áudio' onClick={handleSendAudio} />
    </Flex>
  );
}
