import { Dispatch, SetStateAction, useState } from 'react';
import { Paused } from './Paused';
import { Send } from './Send';
import { Recording } from './Recording';
import { SetIsRecordingAudio } from '..';

const components = {
  recording: Recording,
  send: Send,
  paused: Paused,
};

type CurrentComponent = keyof typeof components;

export type Props = {
  setCurrentComponent: Dispatch<SetStateAction<CurrentComponent>>;
};

type AudioProps = {
  setIsRecordingAudio: SetIsRecordingAudio;
};

export function Audio({ setIsRecordingAudio }: AudioProps) {
  const [currentComponent, setCurrentComponent] =
    useState<CurrentComponent>('recording');

  const Component = components[currentComponent];

  return (
    <Component
      setIsRecordingAudio={setIsRecordingAudio}
      setCurrentComponent={setCurrentComponent}
    />
  );
}
