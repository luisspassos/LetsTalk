import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from 'react';

type TabProviderProps = {
  children: ReactNode;
};

type TabType = 'conversations' | 'configurations';

type TabContextProps = {
  tab: TabType;
  handleChangeTab: (tab: TabType) => void;
};

export const TabContext = createContext({} as TabContextProps);

export function TabProvider({ children }: TabProviderProps) {
  const [tab, setTab] = useState<TabType>('conversations');

  const handleChangeTab = useCallback((tab: TabType) => {
    setTab(tab);
  }, []);

  return (
    <TabContext.Provider value={{ tab, handleChangeTab }}>
      {children}
    </TabContext.Provider>
  );
}

export function useTab() {
  const data = useContext(TabContext);

  return data;
}
