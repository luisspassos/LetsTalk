type EventMapType = HTMLElementEventMap | WindowEventMap;

type EventType<EventMap extends EventMapType> = keyof EventMap;

export type Event<Target extends EventTarget, EventMap extends EventMapType> = {
  type: EventType<EventMap>;
  func: (this: Target, ev: EventMap[EventType<EventMap>]) => any;
};

// iterateEvents //

type EventListenerParams = Parameters<EventTarget['addEventListener']>;

type EventParam = {
  type: EventListenerParams[0];
  func: EventListenerParams[1];
};

export function iterateEvents(
  method: 'remove' | 'add',
  events: EventParam[],
  target: EventTarget
) {
  for (const { type, func } of events) {
    target[`${method}EventListener`](type, func);
  }
}
