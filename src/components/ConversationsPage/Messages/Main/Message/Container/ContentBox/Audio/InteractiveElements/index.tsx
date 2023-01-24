import { Dispatch, SetStateAction, useState } from 'react';
import { CurrentButton } from './Buttons/CurrentButton';
import { Duration } from './Duration';
import { Event as EventType } from 'utils/iterateEvents';

// you can get the EventMap by seeing on the targetElement.addEventListener
type EventMap = HTMLMediaElementEventMap;
export type Event = EventType<EventMap>;

export type SetIsPlaying = Dispatch<SetStateAction<boolean>>;

type InteractiveElementsProps = {
  audio: HTMLAudioElement;
};

export function InteractiveElements({ audio }: InteractiveElementsProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <>
      <CurrentButton
        audio={audio}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
      />
      <Duration audio={audio} isPlaying={isPlaying} />
    </>
  );
}
