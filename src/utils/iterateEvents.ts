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

// function myAddEventHandler<E extends keyof WindowEventMap>(
//   type: E,
//   func: (e: WindowEventMap[E]) => any
// ) {
//   return '';
// }

// function myAddEventHandler<E extends keyof WindowEventMap>([{ func, type }]: {
//   type: E;
//   func: (e: WindowEventMap[E]) => any;
// }[]) {
//   return '';
// }

// myAddEventHandler([{ type: 'afterprint', func: (e) => {} }, { type: 'abort', func: (e) => {} }]);

// ///

// type BothEqual<T extends Base<any>> =
//   T['func'] extends WindowEventMap[T['type']]
//     ? WindowEventMap[T['type']] extends T['func']
//       ? T
//       : never
//     : never;

// type Validation<
//   Arr extends Array<unknown>,
//   Result extends Array<unknown> = []
// > = Arr extends []
//   ? []
//   : Arr extends [infer H extends Base<any>]
//   ? [...Result, BothEqual<H>]
//   : Arr extends [infer Head extends Base<any>, ...infer Tail]
//   ? Validation<[...Tail], [...Result, BothEqual<Head>]>
//   : Readonly<Result>;

// type Result = Validation<
//   [{ type: 'click'; func: TouchEvent }, { type: ''; func: MouseEvent }]
// >;

// ///

// type Validation<
//   Arr extends Array<unknown>,
//   Result extends Array<unknown> = []
// > = Arr extends []
//   ? []
//   : Arr extends [infer H extends Base<any>]
//   ? [...Result, Base<H['type']>]
//   : Arr extends [infer Head extends Base<any>, ...infer Tail]
//   ? Validation<[...Tail], [...Result, Base<Head['type']>]>
//   : Readonly<Result>;

// type Result = Validation<
//   [
//     {
//       type: 'click';
//       func: (e: TouchEvent) => {};
//     }
//   ]
// >;

// function f<T extends keyof WindowEventMap>(a: {
//   type: T;
//   func: (e: WindowEventMap[T]) => any;
// }) {
//   return a;
// }

// const event = f({
//   type: 'click',
//   func: (e: TouchEvent) => {},
// });

// type BothEqual<T extends Base<any>> = Parameters<
//   T['func']
// >[0] extends WindowEventMap[T['type']]
//   ? WindowEventMap[T['type']] extends Parameters<T['func']>[0]
//     ? T
//     : never
//   : never;

// type Base<K extends keyof WindowEventMap> = {
//   type: K;
//   func: (e: WindowEventMap[K]) => any;
// };

// function handler<EventMap extends EventMapType>(
//   type: keyof EventMapType,
//   func: (e: EventMap[keyof EventMapType]) => void
// ) {
//   return { type, func };
// }

// const events = [
//   handler<WindowEventMap>('', (e) => {}),
//   handler<WindowEventMap>('animationend', (e) => {}),
// ];

// handler;
