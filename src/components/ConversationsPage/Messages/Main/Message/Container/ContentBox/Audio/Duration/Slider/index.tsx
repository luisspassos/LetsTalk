import { Box, Flex, keyframes, useColorModeValue } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Event, iterateEvents } from '../..';

type SliderProps = {
  audio: HTMLAudioElement;
};

const slideAnimation = keyframes`
  to { transform: translateX(0); }
`;

export function Slider({ audio }: SliderProps) {
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    function getDuration() {
      setDuration(audio.duration);
    }

    const events: Event[] = [
      {
        type: 'loadedmetadata',
        func: getDuration,
      },
    ];

    iterateEvents('add', events, audio);

    return () => {
      iterateEvents('remove', events, audio);
    };
  }, [audio]);

  const animationBase = {
    w: '100%',
    h: '100%',
    animation: `${slideAnimation} ${duration}s linear`,
    transform: 'translateX(-100%)',
  };

  return (
    <Box pos='relative' cursor='pointer'>
      <Flex
        w='100%'
        h='20px'
        bg={useColorModeValue('whiteAlpha.700', 'whiteAlpha.400')}
        overflow='hidden'
        borderRadius='20px'
        align='center'
      >
        <Box bg='blue' pos='relative' {...animationBase} />
        <Flex
          pos='absolute'
          align='center'
          pointerEvents='none'
          {...animationBase}
        >
          <Box
            w='20px'
            h='20px'
            bg='black'
            borderRadius='50%'
            pos='absolute'
            right='0'
            cursor='pointer'
            transform='translateX(50%)'
          />
        </Flex>
      </Flex>
    </Box>
  );
}
