import { useDisclosure, UseDisclosureReturn } from '@chakra-ui/react';
import { createContext, ReactNode, useContext } from 'react';

type TabToggleProviderProps = {
  children: ReactNode;
};

type TabToggleContextType = Pick<
  UseDisclosureReturn,
  'isOpen' | 'onToggle' | 'onClose'
>;

export const TabToggleContext = createContext({} as TabToggleContextType);

export function TabToggleProvider({ children }: TabToggleProviderProps) {
  const { onToggle, isOpen, onClose } = useDisclosure({
    defaultIsOpen: true,
  });

  return (
    <TabToggleContext.Provider value={{ onToggle, isOpen, onClose }}>
      {children}
    </TabToggleContext.Provider>
  );
}

export function useTabToggle() {
  const data = useContext(TabToggleContext);

  return data;
}
