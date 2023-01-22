import { Box, Flex } from '@chakra-ui/react';
import {
  useEffect,
  useRef,
  MouseEvent as ReactMouseEvent,
  useState,
  useCallback,
} from 'react';
import { Container } from './Container';
import { thumbSize } from './Container/Thumb/Circle';

type SliderProps = {
  duration: HTMLAudioElement['duration'];
};

export function Slider({ duration }: SliderProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isHolding = useRef(false);

  const initialValues = {
    animationDuration: duration,
    percentage: 100,
  };

  const [animationDuration, setAnimationDuration] = useState(
    initialValues.animationDuration
  );
  const [percentage, setPercentage] = useState(initialValues.percentage);
  const [stopAnimation, setStopAnimation] = useState(false);

  const setAudioProgress = useCallback((e: MouseEvent | ReactMouseEvent) => {
    const slider = ref.current;

    if (slider === null) return;

    const widthClicked = e.clientX - slider.offsetLeft;
    const widthInPercentage = 100 - (widthClicked / slider.offsetWidth) * 100;

    const newPercentage = Math.max(Math.min(widthInPercentage, 100), 0); // the percentage will be between 0 and 100 for the animation to work correctly

    setPercentage(newPercentage);
    setStopAnimation(true);
  }, []);

  useEffect(() => {
    function handleSetAudio() {
      if (isHolding.current === false) return;

      isHolding.current = false;

      function activateAnimation() {
        setStopAnimation(false);

        const newAnimationDuration = (percentage * duration) / 100;

        setAnimationDuration(newAnimationDuration);
      }

      activateAnimation();
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
  }, [duration, percentage, setAudioProgress]);

  function handleStartSettingAudio(e: ReactMouseEvent) {
    isHolding.current = true;

    setAudioProgress(e);
  }

  function restart() {
    setPercentage(initialValues.percentage);
  }

  return (
    <Flex
      align='center'
      justify='center'
      h={thumbSize}
      cursor='pointer'
      ref={ref}
      onAnimationEnd={restart}
      onMouseDown={handleStartSettingAudio}
    >
      <Box w={`calc(100% - ${thumbSize})`} pos='relative'>
        <Container
          duration={animationDuration}
          percentage={percentage}
          stopAnimation={stopAnimation}
        />
      </Box>
    </Flex>
  );
}
