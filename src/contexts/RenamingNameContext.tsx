import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react';

type RenamingNameProviderProps = {
  children: ReactNode;
};

type RenamingNameContextType = {
  renamingName: boolean;
  setRenamingName: Dispatch<SetStateAction<boolean>>;
};

export const RenamingNameContext = createContext({} as RenamingNameContextType);

export function RenamingNameProvider({ children }: RenamingNameProviderProps) {
  const [renamingName, setRenamingName] = useState(false);

  return (
    <RenamingNameContext.Provider value={{ renamingName, setRenamingName }}>
      {children}
    </RenamingNameContext.Provider>
  );
}

export function useRenamingName() {
  const data = useContext(RenamingNameContext);

  return data;
}
