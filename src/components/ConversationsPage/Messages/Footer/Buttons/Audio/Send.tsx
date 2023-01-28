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
    <Flex w='700px'>
      <DeleteButton />
      <Flex
        align='center'
        flex='1'
        bgColor='gray.400'
        borderRadius='17px'
        boxShadow='base'
        border='1px solid'
        borderColor='blackAlpha.600'
        gap='10px'
        px='5px'
      >
        <PlayButton />
        <Slider />
        <Text as='time' fontSize='15px' flexShrink={0}>
          3:48
        </Text>
      </Flex>
      <Base label='Enviar áudio' onClick={handleSendAudio} />
    </Flex>
  );
}
