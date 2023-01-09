import { Flex, useColorModeValue } from '@chakra-ui/react';
import { Avatar } from './Avatar';
import { CurrentButton } from './Buttons/CurrentButton';
import { Duration } from './Duration';

type EventType = keyof HTMLMediaElementEventMap;

export type Event = {
  type: EventType;
  func: (
    this: HTMLAudioElement,
    ev: HTMLMediaElementEventMap[EventType]
  ) => any;
};

export function iterateEvents(
  method: 'remove' | 'add',
  events: Event[],
  audio: HTMLAudioElement
) {
  for (const { type, func } of events) {
    audio[`${method}EventListener`](type, func);
  }
}

export function AudioComponent() {
  const audio = new Audio('horse.wav');
  audio.preload = 'metadata';

  return (
    <Flex
      color={useColorModeValue('blue.900', 'current')}
      align='center'
      p='.65em'
      bg='inherit'
      borderRadius='inherit'
    >
      <Avatar />
      <CurrentButton audio={audio} />
      <Duration audio={audio} />
    </Flex>
  );
}
