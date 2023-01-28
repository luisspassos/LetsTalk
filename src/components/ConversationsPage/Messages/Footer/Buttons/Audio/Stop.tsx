import { Flex, Text } from '@chakra-ui/react';
import { BsFillStopFill, BsPauseCircle } from 'react-icons/bs';
import { MdDelete } from 'react-icons/md';
import { Props } from '.';
import { BaseWithTooltip } from '../BaseWithTooltip';
import { Button } from './Button';
import { Progress } from './Progress';

type StopProps = Props;

export function Stop({ setCurrentButton }: StopProps) {
  function handleStopAudio() {
    setCurrentButton('send');
  }

  return (
    <Flex align='center' gap='20px' ml='10px'>
      <Button color='red.300' icon={<MdDelete />} aria-label='Excluir áudio' />
      <Progress />
      <Text as='time' flexShrink={0}>
        2:38
      </Text>
      <Button icon={<BsPauseCircle />} aria-label='Pausar áudio' />
      <BaseWithTooltip
        onClick={handleStopAudio}
        icon={BsFillStopFill}
        label='Parar áudio'
        fontSize='30px'
        ml={0}
      />
    </Flex>
  );
}
