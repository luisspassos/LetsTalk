import { Box, Flex } from '@chakra-ui/react';
import React, {
  useEffect,
  useRef,
  MouseEvent as ReactMouseEvent,
  useState,
  useCallback,
} from 'react';
import { Container } from './Container';
import { thumbSize } from './Container/Thumb/Circle';
import { Event as EventType, iterateEvents } from 'utils/iterateEvents';

// you can get the EventMap by seeing on the targetElement.addEventListener
type EventMap = WindowEventMap;
type Event = EventType<EventMap>;

type SliderProps = {
  duration: HTMLAudioElement['duration'];
};

export function Slider({ duration }: SliderProps) {
  const initialValues = {
    animationDuration: duration,
    percentage: 100,
  };

  const ref = useRef<HTMLDivElement>(null);
  const isHolding = useRef(false);
  const animationDuration = useRef(initialValues.animationDuration);

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
        const newAnimationDuration = (percentage * duration) / 100;

        animationDuration.current = newAnimationDuration;

        setStopAnimation(false);
      }

      activateAnimation();
    }

    function handleMoveAudioProgress(e: MouseEvent) {
      if (isHolding.current === false) return;

      setAudioProgress(e);
    }

    const events: Event[] = [
      {
        type: 'mouseup',
        func: handleSetAudio,
      },
      {
        type: 'mousemove',
        func: handleMoveAudioProgress,
      },
    ];

    iterateEvents('add', events, window);

    return () => {
      iterateEvents('remove', events, window);
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
          duration={animationDuration.current}
          percentage={percentage}
          stopAnimation={stopAnimation}
        />
      </Box>
    </Flex>
  );
}
