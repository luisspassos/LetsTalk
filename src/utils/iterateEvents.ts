import { ExcludeFromTuple } from './types';

// you can get the EventMap by seeing on the targetElement.addEventListener
type EventMapType =
  | HTMLElementEventMap
  | WindowEventMap
  | MediaRecorderEventMap;

type EventType<EventMap extends EventMapType> = keyof EventMap;

export type Event<EventMap extends EventMapType> = {
  type: EventType<EventMap>;
  func: Function;
};

export type WindowEvent = Event<WindowEventMap>;

// iterateEvents //

type EventParam = {
  type: string;
  func: Function;
};

type ListenerEvent = {
  type: any;
  func: any;
};

export function iterateEvents(
  method: 'remove' | 'add',
  events: EventParam[],
  target: EventTarget
) {
  for (const { type, func } of events as ListenerEvent[]) {
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

type Base<T extends keyof WindowEventMap> = {
  type: T;
  func: (e: WindowEventMap[T]) => any;
};

type MaybeTypes<Tuple extends [...Base<keyof WindowEventMap>[]]> = {
  [Index in keyof Tuple]: Base<Tuple[Index]['type']>;
} & { length: Tuple['length'] };

// type Result = MaybeTypes<
//   [
//     {
//       type: 'click';
//       func: (e) => {};
//     }
//   ]
// >;

function handler<Arr extends [...Base<keyof WindowEventMap>[]]>(
  arr: MaybeTypes<Arr>
) {}

handler([
  {
    type: 'afterprint',
    func(e) {},
  } as const,
]);

const events: MaybeTypes<MediaRecorderEventMap, ['d']> = [
  {
    type: '',
    func(e) {},
  },
];

const event = 'd';

type Q<T> = T extends keyof WindowEventMap
  ? {
      type: T;
      func: (e: WindowEventMap[T]) => any;
    }
  : string;

function hanlder<T>(a: Q<T>) {
  return a;
}

hanlder('click' as 'click');
