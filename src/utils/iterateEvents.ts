type EventMapType = HTMLElementEventMap | WindowEventMap;

type EventType<EventMap extends EventMapType> = keyof EventMap;

export type Event<EventMap extends EventMapType> = {
  type: EventType<EventMap>;
  func: Function;
};

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
