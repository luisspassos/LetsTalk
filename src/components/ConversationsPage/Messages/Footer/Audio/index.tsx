import { Dispatch, SetStateAction, useState } from 'react';
import { Paused } from './Paused';
import { Record } from './Record';
import { Send } from './Send';
import { Recording } from './Recording';

const components = {
  record: Record,
  recording: Recording,
  send: Send,
  paused: Paused,
};

type CurrentComponent = keyof typeof components;

export type Props = {
  setCurrentComponent: Dispatch<SetStateAction<CurrentComponent>>;
};

export function Audio() {
  const [currentComponent, setCurrentComponent] =
    useState<CurrentComponent>('record');

  const Component = components[currentComponent];

  return <Component />;
}
