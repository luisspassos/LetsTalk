import { Box, Flex } from '@chakra-ui/react';
import {
  useEffect,
  useRef,
  useState,
  useCallback,
  MouseEvent as ReactMouseEvent,
} from 'react';
import { Container } from './Container';
import { thumbSize } from './Container/Thumb/Circle';
import { Event as EventType, iterateEvents } from 'utils/iterateEvents';
import { useAudio } from 'contexts/Audio/AudioContext';
import {
  useAudioPositionInPercentage,
  initialValue as percentageInitialValue,
} from 'contexts/Audio/AudioPositionInPercentage';

// you can get the EventMap by seeing on the targetElement.addEventListener
type EventMap = WindowEventMap;
type WindowEvent = EventType<EventMap>;

type SliderProps = {
  duration: HTMLAudioElement['duration'];
};

export function Slider({ duration }: SliderProps) {
  const initialValues = {
    animationDuration: duration,
  };

  const ref = useRef<HTMLDivElement>(null);
  const animationDuration = useRef(0);

  useEffect(() => {
    animationDuration.current = duration;
  }, [duration]);

  const [stopAnimation, setStopAnimation] = useState(false);

  const { audio } = useAudio();
  const { positionInPercentage, setPositionInPercentage, isHolding } =
    useAudioPositionInPercentage();

  const setAudioProgress = useCallback(
    (e: MouseEvent | ReactMouseEvent) => {
      const slider = ref.current;

      if (slider === null) return;

      function getSliderOffsetLeft(el: HTMLElement): number {
        const offsetParentDoesNotExist = el.offsetParent === null;
        const offsetParentIsNotAValidElement = !(
          el.offsetParent instanceof HTMLElement
        );

        if (offsetParentDoesNotExist || offsetParentIsNotAValidElement)
          return 0;

        return el ? el.offsetLeft + getSliderOffsetLeft(el.offsetParent) : 0;
      }

      const sliderOffSetLeft = getSliderOffsetLeft(slider);

      const widthClicked = e.clientX - sliderOffSetLeft;
      const widthInPercentage = 100 - (widthClicked / slider.offsetWidth) * 100;

      const newPercentage = Math.max(Math.min(widthInPercentage, 100), 0); // the percentage will be between 0 and 100 for the animation to work correctly

      setPositionInPercentage(newPercentage);
      setStopAnimation(true);
    },
    [setPositionInPercentage]
  );

  // set window events
  useEffect(() => {
    function handleSetAudio() {
      if (isHolding.current === false) return;

      isHolding.current = false;

      const remainingDuration = (positionInPercentage * duration) / 100;

      function activateAnimation() {
        animationDuration.current = remainingDuration;

        setStopAnimation(false);
      }

      function setNewAudioCurrentTime() {
        const currentTime = duration - remainingDuration;

        if (audio === null) return;

        audio.element.currentTime = currentTime;
      }

      setNewAudioCurrentTime();
      activateAnimation();
    }

    function handleMoveAudioProgress(e: MouseEvent) {
      if (isHolding.current === false) return;

      e.preventDefault();

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
  }, [audio, duration, isHolding, positionInPercentage, setAudioProgress]);

  function handleStartSettingAudio(e: ReactMouseEvent) {
    isHolding.current = true;

    setAudioProgress(e);
  }

  function restartAnimation() {
    setPositionInPercentage(percentageInitialValue);
    animationDuration.current = initialValues.animationDuration;

    setStopAnimation(true);

    setTimeout(() => {
      setStopAnimation(false);
    });
  }

  return (
    <Flex
      align='center'
      justify='center'
      w='100%'
      h={thumbSize}
      cursor='pointer'
      ref={ref}
      onMouseDown={handleStartSettingAudio}
      onAnimationEnd={restartAnimation}
    >
      <Box w={`calc(100% - ${thumbSize})`} pos='relative'>
        <Container
          duration={animationDuration.current}
          stopAnimation={stopAnimation}
        />
      </Box>
    </Flex>
  );
}
