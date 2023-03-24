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
