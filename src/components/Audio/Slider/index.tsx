import { Flex, FlexProps, LayoutProps } from '@chakra-ui/react';
import {
  useEffect,
  useState,
  useCallback,
  MouseEvent as ReactMouseEvent,
  useRef,
  TouchEvent as ReactTouchEvent,
} from 'react';
import { handler, iterateEvents } from 'utils/iterateEvents';
import { useAudio } from 'contexts/Audio/AudioContext';
import { useAudioPositionInPercentage } from 'contexts/Audio/AudioPositionInPercentage';
import { useResetAnimationWhenAudioEnds } from 'hooks/Audio/useResetAnimationWhenAudioEnds';
import { ProgressBar } from './ProgressBar';

type MouseEvents = MouseEvent | ReactMouseEvent;

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

  const [resetAnimation, setResetAnimation] = useState(false);

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

  // set window events
  useEffect(() => {
    function handleSetAudio() {
      if (isHolding.current === false) return;

      isHolding.current = false;

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
    }

    function handleMoveAudioProgress(e: MouseEvent | TouchEvent) {
      if (isHolding.current === false) return;

      e.preventDefault();

      setAudioProgress(e);
    }

    const h = handler<WindowEventMap>();

    const events = [
      h({
        type: 'mouseup',
        func: handleSetAudio,
      }),
      h({
        type: 'mousemove',
        func: handleMoveAudioProgress,
      }),
      h({
        type: 'touchend',
        func: handleSetAudio,
      }),
      h({
        type: 'touchmove',
        func: handleMoveAudioProgress,
      }),
    ];

    iterateEvents('add', events, window);

    return () => {
      iterateEvents('remove', events, window);
    };
  }, [audio, duration, isHolding, positionInPercentage, setAudioProgress]);

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
