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

export function iterateEvents(
  method: 'remove' | 'add',
  events: EventParam[],
  target: EventTarget
) {
  for (const { type, func } of events as any) {
    target[`${method}EventListener`](type, func);
  }
}
