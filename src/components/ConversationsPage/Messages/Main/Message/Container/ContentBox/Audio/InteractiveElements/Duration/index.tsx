import { Flex } from '@chakra-ui/react';
import { Slider } from 'components/Audio/Slider';
import { useDuration } from 'hooks/Audio/useDuration';
import { Texts } from './Texts';

export function Duration() {
  const { duration } = useDuration();

  return (
    <Flex
      alignSelf='stretch'
      justify='center'
      align='center'
      flex='1'
      direction='column'
      pos='relative'
    >
      <Slider duration={duration} />
      <Texts duration={duration} />
    </Flex>
  );
}
