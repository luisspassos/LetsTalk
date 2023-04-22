import { ExcludeFromTuple } from './types';

type Base<EventMap extends EventMapType, T extends keyof EventMap> = {
  type: T;
  func: (e: EventMap[T]) => any;
};

export type Event = Base<any, any>;

export function handler<EventMap extends EventMapType>() {
  return <T extends keyof EventMap>(obj: Base<EventMap, T>) => {
    return obj;
  };
}

// you can get the EventMap by seeing on the targetElement.addEventListener
type EventMapType =
  | HTMLElementEventMap
  | WindowEventMap
  | MediaRecorderEventMap;

// iterateEvents //

export function iterateEvents(
  method: 'remove' | 'add',
  events: Event[],
  target: EventTarget
) {
  for (const { type, func } of events) {
    target[`${method}EventListener`](type, func);
  }
}

type IterateEventsParamsWithoutTarget = ExcludeFromTuple<
  Parameters<typeof iterateEvents>,
  EventTarget
>;

export type IterateEventsWithoutTarget = (
  ...params: IterateEventsParamsWithoutTarget
) => void;

// Window

export const windowHandler = handler<WindowEventMap>();

export const iterateWindowEvents: IterateEventsWithoutTarget = (
  method,
  events
) => {
  iterateEvents(method, events, window);
};
