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
    animation: `${slideAnimation} ${6}s linear`,
    transform: 'translateX(-100%)',
  };

  const thumbSize = '15px';

  return (
    <Box pos='relative' cursor='pointer'>
      <Flex
        h='5px'
        bg={useColorModeValue('whiteAlpha.700', 'whiteAlpha.400')}
        overflow='hidden'
        borderRadius='20px'
        align='center'
      >
        <Box bg='blue.300' pos='relative' {...animationBase} />
        <Flex
          pos='absolute'
          align='center'
          pointerEvents='none'
          {...animationBase}
        >
          <Box
            w={thumbSize}
            h={thumbSize}
            bg='current'
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
