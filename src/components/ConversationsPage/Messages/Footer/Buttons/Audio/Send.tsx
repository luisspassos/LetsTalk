import { Flex, Text } from '@chakra-ui/react';
import { Props } from '.';
import { Base } from '../Send/Base';
import { DeleteButton } from './DeleteButton';
import { Button as PlayButton } from 'components/Audio/Buttons/Play';
import { Slider } from 'components/ConversationsPage/Messages/Main/Message/Container/ContentBox/Audio/InteractiveElements/Duration/Slider';
import { Wrapper } from './Wrapper';

type SendProps = Props;

export function Send({ setCurrentButton }: SendProps) {
  function handleSendAudio() {
    setCurrentButton('record');
  }

  return (
    <Wrapper w='900px'>
      <DeleteButton />
      <Flex
        alignSelf='stretch'
        align='center'
        flex='1'
        bgColor='gray.400'
        borderRadius='17px'
        boxShadow='base'
        border='1px solid'
        borderColor='blackAlpha.600'
        gap='10px'
        px='10px'
      >
        <PlayButton fontSize='40px' />
        <Slider height='13px' />
        <Text as='time' fontSize='15px' flexShrink={0}>
          3:48
        </Text>
      </Flex>
      <Base label='Enviar áudio' onClick={handleSendAudio} />
    </Wrapper>
  );
}
