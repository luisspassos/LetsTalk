import { Flex, LayoutProps } from '@chakra-ui/react';
import {
  useEffect,
  useState,
  useCallback,
  MouseEvent as ReactMouseEvent,
  useRef,
} from 'react';
import { Container } from './Container';
import { Event as EventType, iterateEvents } from 'utils/iterateEvents';
import { useAudio, Event } from 'contexts/Audio/AudioContext';
import {
  useAudioPositionInPercentage,
  initialValue as percentageInitialValue,
} from 'contexts/Audio/AudioPositionInPercentage';
import { useAudioIsPlaying } from 'hooks/Audio/useAudioIsPlaying';

// you can get the EventMap by seeing on the targetElement.addEventListener
type WindowEvent = EventType<WindowEventMap>;
type DocumentEvent = EventType<DocumentEventMap>;

export type SliderProps = {
  duration: HTMLAudioElement['duration'];
  height?: LayoutProps['height'];
};

export function Slider({ duration, height = '0.9375rem' }: SliderProps) {
  const initialValues = {
    animationDuration: duration,
  };

  const ref = useRef<HTMLDivElement>(null);
  const animationDuration = useRef(0);

  useEffect(() => {
    animationDuration.current = duration;
  }, [duration]);

  const [stopAnimation, setStopAnimation] = useState(false);

  const { audio, iterateAudioEvents } = useAudio();
  const { positionInPercentage, setPositionInPercentage, isHolding } =
    useAudioPositionInPercentage();
  const { isPlaying } = useAudioIsPlaying();

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

  const pageIsBlurredAndAudioEnded = useRef(false);

  const [yes, setYes] = useState(false);

  const restartAnimation = useCallback(() => {
    setYes(true);

    animationDuration.current = initialValues.animationDuration;

    setPositionInPercentage(percentageInitialValue);
  }, [initialValues.animationDuration, setPositionInPercentage]);

  useEffect(() => {
    if (positionInPercentage === percentageInitialValue && yes === true) {
      setStopAnimation(true);

      setTimeout(() => {
        setStopAnimation(false);
      }, 1);

      setYes(false);
    }
  }, [initialValues.animationDuration, positionInPercentage, yes]);

  // set document events
  useEffect(() => {
    function resetAnimationWhenReturningToPage() {
      // this function is to fix the animation if the user leaves the page, wait for the audio to end and return. When returning, the animation will be in the wrong position.

      if (pageIsBlurredAndAudioEnded.current === false) return;

      restartAnimation();

      pageIsBlurredAndAudioEnded.current = false;
    }

    const events: DocumentEvent[] = [
      {
        type: 'visibilitychange',
        func: resetAnimationWhenReturningToPage,
      },
    ];

    iterateEvents('add', events, document);

    return () => {
      iterateEvents('remove', events, document);
    };
  }, [isPlaying, restartAnimation]);

  // set audio events
  useEffect(() => {
    function restartAnimationWhenAudioEnds() {
      const pageIsBlurred = document.visibilityState === 'hidden';

      if (pageIsBlurred === true) {
        pageIsBlurredAndAudioEnded.current = true;

        return;
      }

      restartAnimation();
    }

    const events: Event[] = [
      {
        type: 'ended',
        func: restartAnimationWhenAudioEnds,
      },
    ];

    iterateAudioEvents('add', events);

    return () => {
      iterateAudioEvents('remove', events);
    };
  }, [
    initialValues.animationDuration,
    iterateAudioEvents,
    restartAnimation,
    setPositionInPercentage,
  ]);

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
  }, [
    audio,
    duration,
    isHolding,
    positionInPercentage,
    setAudioProgress,
    setPositionInPercentage,
  ]);

  function handleStartSettingAudio(e: ReactMouseEvent) {
    isHolding.current = true;

    setAudioProgress(e);
  }

  return (
    <Flex
      align='center'
      justify='center'
      h={height}
      w='100%'
      cursor='pointer'
      ref={ref}
      onMouseDown={handleStartSettingAudio}
    >
      <Flex align='center' h='100%' w={`calc(100% - ${height})`} pos='relative'>
        <Container
          duration={animationDuration.current}
          stopAnimation={stopAnimation}
        />
      </Flex>
    </Flex>
  );
}
