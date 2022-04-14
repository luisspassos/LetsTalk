import { useDisclosure } from '@chakra-ui/react';
import { createContext, ReactNode, useContext } from 'react';

type ModalProviderProps = {
  children: ReactNode;
};

type ModalContextType = {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
};

export function createModalContext() {
  const ModalContext = createContext({} as ModalContextType);

  function ModalProvider({ children }: ModalProviderProps) {
    const { isOpen, onClose, onOpen } = useDisclosure();

    return (
      <ModalContext.Provider value={{ isOpen, onClose, onOpen }}>
        {children}
      </ModalContext.Provider>
    );
  }

  function useModal() {
    const data = useContext(ModalContext);

    return data;
  }

  return { ModalProvider, useModal };
}
