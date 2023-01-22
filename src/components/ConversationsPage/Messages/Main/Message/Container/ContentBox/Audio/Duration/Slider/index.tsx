import { Box, Flex } from '@chakra-ui/react';
import { useEffect, useRef, MouseEvent } from 'react';
import { Container } from './Container';
import { thumbSize } from './Container/Thumb/Circle';

export function Slider() {
  const ref = useRef<HTMLDivElement>(null);
  const isHolding = useRef(false);

  function setAudioProgress(e: MouseEvent) {
    const slider = ref.current;

    if (slider === null) return;

    const widthClicked = e.clientX - slider.offsetLeft;
    const widthInPercentage = 100 - (widthClicked / slider.offsetWidth) * 100;

    percentageSet = Math.max(Math.min(widthInPercentage, 100), 0); // the percentage will be between 0 and 100 for the animation to work correctly

    track.style.animation = 'none';
    track.style.transform = `translateX(-${percentageSet}%)`;

    thumbWrapper.style.animation = 'none';
    thumbWrapper.style.transform = `translateX(-${percentageSet}%)`;
  }

  useEffect(() => {
    function handleSetAudio() {
      if (isHolding.current === false) return;

      isHolding.current = false;
    }

    function handleMoveAudioProgress(e: MouseEvent) {
      if (isHolding.current === false) return;

      setAudioProgress(e);
    }

    window.addEventListener('mouseup', handleSetAudio);
    window.addEventListener('mousemove', handleMoveAudioProgress);

    return () => {
      window.removeEventListener('mouseup', handleSetAudio);
      window.removeEventListener('mousemove', handleMoveAudioProgress);
    };
  }, []);

  function handleStartSettingAudio(e: MouseEvent) {
    isHolding.current = true;

    setAudioProgress(e);
  }

  return (
    <Flex
      align='center'
      justify='center'
      h={thumbSize}
      cursor='pointer'
      onMouseDown={handleStartSettingAudio}
    >
      <Box w={`calc(100% - ${thumbSize})`} pos='relative'>
        <Container />
      </Box>
    </Flex>
  );
}
