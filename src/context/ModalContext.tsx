import React, { createContext, useContext, useState } from 'react';

interface ModalContextType {
  isLettersOpen: boolean;
  openLetters: () => void;
  closeLetters: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLettersOpen, setIsLettersOpen] = useState(false);

  const openLetters = () => setIsLettersOpen(true);
  const closeLetters = () => setIsLettersOpen(false);

  return (
    <ModalContext.Provider value={{ isLettersOpen, openLetters, closeLetters }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = (): ModalContextType => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};
