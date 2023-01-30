import { Flex } from '@chakra-ui/react';
import { Button as PlayButton } from 'components/Audio/Buttons/Play';
import { Duration } from './Duration';
import { Slider } from './Slider';

export function AudioPlayer() {
  return (
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
      <Slider />
      <Duration />
    </Flex>
  );
}
