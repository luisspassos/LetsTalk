import { useEffect, useRef } from 'react';
import {
  handler,
  iterateWindowEvents,
  Event as EventType,
} from 'utils/iterateEvents';
import { useSetUserOnlineAt } from './useSetUserOnlineAt';

type WindowEventMapType = WindowEventMap & {
  locationchange: Event;
};

function createLocationchangeEvent() {
  let oldPushState = history.pushState;
  history.pushState = function pushState() {
    const args: any = arguments;
    let ret = oldPushState.apply(this, args);
    window.dispatchEvent(new Event('pushstate'));
    window.dispatchEvent(new Event('locationchange'));
    return ret;
  };

  let oldReplaceState = history.replaceState;
  history.replaceState = function replaceState() {
    const args: any = arguments;
    let ret = oldReplaceState.apply(this, args);
    window.dispatchEvent(new Event('replacestate'));
    window.dispatchEvent(new Event('locationchange'));
    return ret;
  };

  window.addEventListener('popstate', () => {
    window.dispatchEvent(new Event('locationchange'));
  });
}

export function useHandleUserOnlineAt() {
  const { setUserOnlineAt } = useSetUserOnlineAt();

  const onlineAtEvents = useRef<EventType[]>([]);

  useEffect(() => {
    createLocationchangeEvent();

    function takeUserOnline() {
      setUserOnlineAt('now');
    }

    takeUserOnline();

    function takeUserOffline() {
      // removed focus event to avoid bugs
      window.removeEventListener('focus', takeUserOnline);
      setUserOnlineAt();
    }

    const h = handler<WindowEventMapType>();

    const events = [
      h({
        type: 'focus',
        func: takeUserOnline,
      }),
      h({
        type: 'beforeunload',
        func: takeUserOffline,
      }),
      h({
        type: 'locationchange',
        func: takeUserOffline,
      }),
      h({
        type: 'unload',
        func: takeUserOffline,
      }),
    ];

    onlineAtEvents.current = events;

    iterateWindowEvents('add', events);

    return () => {
      iterateWindowEvents('remove', events);
    };
  }, [setUserOnlineAt]);

  return { onlineAtEvents };
}
