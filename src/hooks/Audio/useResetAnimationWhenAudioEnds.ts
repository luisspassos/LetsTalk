import { useAudio, Event as AudioEvent } from 'contexts/Audio/AudioContext';
import {
  useAudioPositionInPercentage,
  initialValue as percentageInitialValue,
} from 'contexts/Audio/AudioPositionInPercentage';
import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { iterateEvents, Event as EventType } from 'utils/iterateEvents';

type UseResetAnimationWhenAudioEndsParams = {
  animationDuration: MutableRefObject<number>;
  audioDuration: HTMLAudioElement['duration'];
  setResetAnimation: Dispatch<SetStateAction<boolean>>;
};

type DocumentEvent = EventType<DocumentEventMap>;

export function useResetAnimationWhenAudioEnds({
  animationDuration,
  audioDuration,
  setResetAnimation,
}: UseResetAnimationWhenAudioEndsParams) {
  const initialValues = {
    animationDuration: audioDuration,
  };

  const pageIsBlurredAndAudioEnded = useRef(false);

  const [animationIsRestarting, setAnimationRestarting] = useState(false);

  const { setPositionInPercentage, isHolding } = useAudioPositionInPercentage();

  const restartAnimation = useCallback(() => {
    if (isHolding.current === true) return;

    setAnimationRestarting(true);

    animationDuration.current = initialValues.animationDuration;

    setPositionInPercentage(percentageInitialValue);
  }, [
    animationDuration,
    initialValues.animationDuration,
    isHolding,
    setPositionInPercentage,
  ]);

  useEffect(() => {
    // this useEffect serves to wait for positionInPercentage to update to proceed with the reset.
    // positionInPercentage is not enough to trigger this useEffect because the set value may be the same as before, thus not causing the rerender

    function continueAnimationReset() {
      if (animationIsRestarting) {
        setResetAnimation(true);

        setTimeout(() => {
          setResetAnimation(false);
        }, 1);

        setAnimationRestarting(false);
      }
    }

    continueAnimationReset();
  }, [animationDuration, animationIsRestarting, setResetAnimation]);

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
  }, [restartAnimation]);

  const { iterateAudioEvents } = useAudio();

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

    const events: AudioEvent[] = [
      {
        type: 'ended',
        func: restartAnimationWhenAudioEnds,
      },
    ];

    iterateAudioEvents('add', events);

    return () => {
      iterateAudioEvents('remove', events);
    };
  }, [iterateAudioEvents, restartAnimation]);
}
