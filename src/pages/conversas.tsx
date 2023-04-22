import { Conversations } from 'components/ConversationsPage';
import { GetServerSideProps } from 'next';
import { useEffect } from 'react';
import { redirectToUserIfNoUser } from 'utils/redirectToHomeIfNoUser';
import { AudiosPlayingProvider } from 'contexts/Audio/AudiosPlaying';
import { AudioRecordingProvider } from 'contexts/Audio/AudioRecordingContext';
import { useOnAuthStateChanged } from 'hooks/useOnAuthStateChanged';
import { useSetUserOnlineAt } from 'hooks/useSetUserOnlineAt';
import { handler, iterateWindowEvents } from 'utils/iterateEvents';

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

export default function ConversationsPage() {
  const { setUserOnlineAt } = useSetUserOnlineAt();

  useOnAuthStateChanged();

  // handle user online at
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

    iterateWindowEvents('add', events);

    return () => {
      iterateWindowEvents('remove', events);
    };
  }, [setUserOnlineAt]);

  return (
    <AudioRecordingProvider>
      <AudiosPlayingProvider>
        <Conversations />
      </AudiosPlayingProvider>
    </AudioRecordingProvider>
  );
}

export const getServerSideProps: GetServerSideProps = redirectToUserIfNoUser;
