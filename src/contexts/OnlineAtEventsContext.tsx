import { doc, updateDoc } from 'firebase/firestore';
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
} from 'react';
import { db } from '../services/firebase';
import { OnlineAt } from '../utils/types';
import { useAuth } from './AuthContext';

type OnlineAtEventsProviderProps = {
  children: ReactNode;
};

type TakeUserOfflineOrOnline = {
  events: string[];
  func: () => void;
};

type OnlineAtEventsContextType = {
  takeUserOffline: TakeUserOfflineOrOnline;
  takeUserOnline: TakeUserOfflineOrOnline;
  setUserOnlineAt: (onlineAt: OnlineAt) => Promise<void>;
  clearAllEvents: () => void;
};

export const OnlineAtEventsContext = createContext(
  {} as OnlineAtEventsContextType
);

export function OnlineAtEventsProvider({
  children,
}: OnlineAtEventsProviderProps) {
  const { user } = useAuth();

  const setUserOnlineAt = useCallback(
    async (onlineAt: OnlineAt) => {
      if (!user?.displayName) return;

      const userRef = doc(db, 'users', user.displayName);

      await updateDoc(userRef, {
        onlineAt: onlineAt,
      });
    },
    [user?.displayName]
  );

  const takeUserOnline = useMemo(
    () => ({
      events: ['focus'],
      func: () => {
        setUserOnlineAt('now');
      },
    }),
    [setUserOnlineAt]
  );

  const takeUserOffline = useMemo(
    () => ({
      events: ['beforeunload', 'locationchange', 'unload'],
      func: () => {
        // removed focus event to avoid bugs
        window.removeEventListener('focus', takeUserOnline.func);
        setUserOnlineAt(Date.now());
      },
    }),
    [setUserOnlineAt, takeUserOnline.func]
  );

  const clearAllEvents = useCallback(() => {
    for (let event of takeUserOffline.events) {
      window.removeEventListener(event, takeUserOffline.func);
    }

    for (let event of takeUserOnline.events) {
      window.removeEventListener(event, takeUserOnline.func);
    }
  }, [takeUserOnline, takeUserOffline]);

  return (
    <OnlineAtEventsContext.Provider
      value={{
        takeUserOnline,
        takeUserOffline,
        setUserOnlineAt,
        clearAllEvents,
      }}
    >
      {children}
    </OnlineAtEventsContext.Provider>
  );
}

export function useOnlineAtEvents() {
  const data = useContext(OnlineAtEventsContext);

  return data;
}
