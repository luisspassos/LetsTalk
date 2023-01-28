import { Text } from '@chakra-ui/react';
import { BsFillStopFill, BsPauseCircle } from 'react-icons/bs';
import { Props } from '.';
import { BaseWithTooltip } from '../BaseWithTooltip';
import { Button } from './Button';
import { DeleteButton } from './DeleteButton';
import { Progress } from './Progress';
import { Wrapper } from './Wrapper';

type StopProps = Props;

export function Stop({ setCurrentButton }: StopProps) {
  function handleStopAudio() {
    setCurrentButton('send');
  }

  return (
    <Wrapper>
      <DeleteButton />
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
      />
    </Wrapper>
  );
}
