import { Flex, FlexProps, LayoutProps } from '@chakra-ui/react';
import {
  useEffect,
  useState,
  useCallback,
  MouseEvent as ReactMouseEvent,
  useRef,
  TouchEvent as ReactTouchEvent,
} from 'react';
import { iterateWindowEvents, windowHandler } from 'utils/iterateEvents';
import { useAudio } from 'contexts/Audio/AudioContext';
import { useAudioPositionInPercentage } from 'contexts/Audio/AudioPositionInPercentage';
import { useResetAnimationWhenAudioEnds } from 'hooks/Audio/useResetAnimationWhenAudioEnds';
import { ProgressBar } from './ProgressBar';

type MouseEvents = MouseEvent | ReactMouseEvent;

type ResetAnimation = boolean;

export type SliderProps = {
  duration: HTMLAudioElement['duration'];
  progressBarProps?: FlexProps;
  height?: LayoutProps['height'];
};

export function Slider({
  duration,
  height = '0.9375rem',
  progressBarProps,
}: SliderProps) {
  const animationDuration = useRef(0);

  useEffect(() => {
    animationDuration.current = duration;
  }, [duration]);

  const ref = useRef<HTMLDivElement>(null);

  const [resetAnimation, setResetAnimation] = useState<ResetAnimation>(false);

  const { audio } = useAudio();
  const { positionInPercentage, setPositionInPercentage, isHolding } =
    useAudioPositionInPercentage();

  const setAudioProgress = useCallback(
    (e: MouseEvents | TouchEvent | ReactTouchEvent) => {
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

      function isMouseEvent(e: any): e is MouseEvents {
        return 'clientX' in e;
      }

      const clientX = isMouseEvent(e) ? e.clientX : e.touches[0].clientX;

      const widthClicked = clientX - sliderOffSetLeft;

      const widthInPercentage = 100 - (widthClicked / slider.offsetWidth) * 100;

      const newPercentage = Math.max(Math.min(widthInPercentage, 100), 0); // the percentage will be between 0 and 100 for the animation to work correctly

      setPositionInPercentage(newPercentage);
      setResetAnimation(true);
    },
    [setPositionInPercentage]
  );

  const setAudioCurrentTime = useCallback(() => {
    const remainingDuration = (positionInPercentage * duration) / 100;

    function activateAnimation() {
      animationDuration.current = remainingDuration;

      setResetAnimation(false);
    }

    function setNewAudioCurrentTime() {
      const currentTime = duration - remainingDuration;

      if (audio === null) return;

      audio.element.currentTime = currentTime;
    }

    setNewAudioCurrentTime();
    activateAnimation();
  }, [audio, duration, positionInPercentage]);

  // set window events
  useEffect(() => {
    function handleSetAudioCurrentTime() {
      if (isHolding.current === false) return;

      isHolding.current = false;

      setAudioCurrentTime();
    }

    function handleMoveAudioProgress(e: MouseEvent | TouchEvent) {
      if (isHolding.current === false) return;

      e.preventDefault();

      setAudioProgress(e);
    }

    const events = [
      windowHandler({
        type: 'mouseup',
        func: handleSetAudioCurrentTime,
      }),
      windowHandler({
        type: 'mousemove',
        func: handleMoveAudioProgress,
      }),
      windowHandler({
        type: 'touchend',
        func: handleSetAudioCurrentTime,
      }),
      windowHandler({
        type: 'touchmove',
        func: handleMoveAudioProgress,
      }),
    ];

    iterateWindowEvents('add', events);

    return () => {
      iterateWindowEvents('remove', events);
    };
  }, [isHolding, setAudioCurrentTime, setAudioProgress]);

  function handleStartSettingAudio(e: ReactMouseEvent | ReactTouchEvent) {
    isHolding.current = true;

    setAudioProgress(e);
  }

  useResetAnimationWhenAudioEnds({
    animationDuration,
    setResetAnimation,
    audioDuration: duration,
  });

  return (
    <Flex
      align='center'
      justify='center'
      h={height}
      w='100%'
      cursor='pointer'
      ref={ref}
      onMouseDown={handleStartSettingAudio}
      onTouchStart={handleStartSettingAudio}
    >
      <Flex align='center' h='100%' w={`calc(100% - ${height})`} pos='relative'>
        <ProgressBar
          duration={animationDuration.current}
          resetAnimation={resetAnimation}
          {...progressBarProps}
        />
      </Flex>
    </Flex>
  );
}
