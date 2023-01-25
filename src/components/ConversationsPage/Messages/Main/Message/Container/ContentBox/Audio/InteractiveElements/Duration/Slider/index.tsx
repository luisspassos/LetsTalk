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
import { Event as EventType, iterateEvents } from 'utils/iterateEvents';

// you can get the EventMap by seeing on the targetElement.addEventListener
type EventMap = WindowEventMap;
type WindowEvent = EventType<EventMap>;

type SliderProps = {
  duration: HTMLAudioElement['duration'];
  audio: HTMLAudioElement;
  isPlaying: boolean;
};

export function Slider({ duration, audio, isPlaying }: SliderProps) {
  const initialValues = {
    animationDuration: duration,
    percentage: 100,
  };

  const ref = useRef<HTMLDivElement>(null);
  const isHolding = useRef(false);
  const animationDuration = useRef(0);

  useEffect(() => {
    animationDuration.current = duration;
  }, [duration]);

  const [percentage, setPercentage] = useState(initialValues.percentage);
  const [stopAnimation, setStopAnimation] = useState(false);

  const setAudioProgress = useCallback((e: MouseEvent | ReactMouseEvent) => {
    const slider = ref.current;

    if (slider === null) return;

    function getSliderOffsetLeft(el: HTMLElement): number {
      const offsetParentDoesNotExist = el.offsetParent === null;
      const offsetParentIsNotAValidElement = !(
        el.offsetParent instanceof HTMLElement
      );

      if (offsetParentDoesNotExist || offsetParentIsNotAValidElement) return 0;

      return el ? el.offsetLeft + getSliderOffsetLeft(el.offsetParent) : 0;
    }

    const sliderOffSetLeft = getSliderOffsetLeft(slider);

    const widthClicked = e.clientX - sliderOffSetLeft;
    const widthInPercentage = 100 - (widthClicked / slider.offsetWidth) * 100;

    const newPercentage = Math.max(Math.min(widthInPercentage, 100), 0); // the percentage will be between 0 and 100 for the animation to work correctly

    setPercentage(newPercentage);
    setStopAnimation(true);
  }, []);

  // set window events
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

    const events: WindowEvent[] = [
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

  // set audio events
  // useEffect(() => {
  //   function restartAnimation() {
  //     setStopAnimation(false);
  //   }

  //   const events: AudioEvent[] = [
  //     {
  //       type: 'ended',
  //       func: restartAnimation,
  //     },
  //   ];

  //   iterateEvents('add', events, audio);

  //   return () => {
  //     iterateEvents('remove', events, audio);
  //   };
  // }, [audio]);

  function handleStartSettingAudio(e: ReactMouseEvent) {
    isHolding.current = true;

    setAudioProgress(e);
  }

  function restart() {
    // e: AnimationEvent
    // const animationDidNotRun = e.elapsedTime === 0;

    // if (animationDidNotRun) return;

    setPercentage(initialValues.percentage);
    // setStopAnimation(true);
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
          audio={audio}
          isPlaying={isPlaying}
        />
      </Box>
    </Flex>
  );
}
