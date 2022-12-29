import { Flex } from '@chakra-ui/react';
import { Slider } from './Slider';
import { Texts } from './Texts';

export function Duration() {
  return (
    <Flex
      alignSelf='stretch'
      justify='center'
      flex='1'
      direction='column'
      pos='relative'
    >
      <Slider />
      <Texts duration='0:30' currentTime='0:00' />
    </Flex>
  );
}
