import { Flex, useColorModeValue } from '@chakra-ui/react';
import { Avatar } from './Avatar';
import { CurrentButton } from './Buttons/CurrentButton';
import { Duration } from './Duration';
import { Event as EventType } from 'utils/iterateEvents';

// you can get the EventMap by seeing on the targetElement.addEventListener
type EventMap = HTMLMediaElementEventMap;
export type Event = EventType<EventMap>;

export function AudioComponent() {
  const audio = new Audio('audio.mp3');
  audio.preload = 'metadata';

  return (
    <Flex
      color={useColorModeValue('blue.900', 'current')}
      align='center'
      p='.65em'
      bg='inherit'
      borderRadius='inherit'
      gap='.9em'
    >
      <Avatar />
      <CurrentButton audio={audio} />
      <Duration audio={audio} />
    </Flex>
  );
}
