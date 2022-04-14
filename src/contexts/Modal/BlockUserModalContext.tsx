import { useDisclosure } from '@chakra-ui/react';
import { createContext, ReactNode, useContext } from 'react';

type BlockUserModalProviderProps = {
  children: ReactNode;
};

type BlockUserModalContextType = {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
};

export const BlockUserModalContext = createContext(
  {} as BlockUserModalContextType
);

export function BlockUserModalProvider({
  children,
}: BlockUserModalProviderProps) {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <BlockUserModalContext.Provider value={{ isOpen, onClose, onOpen }}>
      {children}
    </BlockUserModalContext.Provider>
  );
}

export function useBlockUserModal() {
  const data = useContext(BlockUserModalContext);

  return data;
}
