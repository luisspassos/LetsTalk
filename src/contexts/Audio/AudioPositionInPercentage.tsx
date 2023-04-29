import {
  createContext,
  Dispatch,
  MutableRefObject,
  ReactNode,
  SetStateAction,
  useContext,
  useRef,
  useState,
} from 'react';

type AudioPositionInPercentageProviderProps = {
  children: ReactNode;
};

type AudioPositionInPercentageContextType = {
  positionInPercentage: number;
  setPositionInPercentage: Dispatch<SetStateAction<number>>;
  isHolding: MutableRefObject<boolean>;
};

export const AudioPositionInPercentageContext = createContext(
  {} as AudioPositionInPercentageContextType
);

export const initialValue = 100;

export function AudioPositionInPercentageProvider({
  children,
}: AudioPositionInPercentageProviderProps) {
  const [positionInPercentage, setPositionInPercentage] =
    useState(initialValue);

  const isHolding = useRef(false);

  return (
    <AudioPositionInPercentageContext.Provider
      value={{ positionInPercentage, setPositionInPercentage, isHolding }}
    >
      {children}
    </AudioPositionInPercentageContext.Provider>
  );
}

export function useAudioPositionInPercentage() {
  const data = useContext(AudioPositionInPercentageContext);

  return data;
}
