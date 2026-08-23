import React, { createContext, useContext, useState } from 'react';

interface EntryContextType {
  hasEntered: boolean;
  enterWorld: () => void;
  replayEntry: () => void;
}

const EntryContext = createContext<EntryContextType | undefined>(undefined);

export const EntryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // In development mode, default to false so entry transition can be tested cleanly without manual cache clearing.
  // In production, check stored preference.
  const [hasEntered, setHasEntered] = useState<boolean>(() => {
    if (import.meta.env.DEV) {
      return false;
    }
    return localStorage.getItem('arzael_entered_world') === 'true';
  });

  const enterWorld = () => {
    setHasEntered(true);
    localStorage.setItem('arzael_entered_world', 'true');
  };

  const replayEntry = () => {
    setHasEntered(false);
    localStorage.removeItem('arzael_entered_world');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <EntryContext.Provider value={{ hasEntered, enterWorld, replayEntry }}>
      {children}
    </EntryContext.Provider>
  );
};

export const useEntry = (): EntryContextType => {
  const context = useContext(EntryContext);
  if (!context) {
    throw new Error('useEntry must be used within an EntryProvider');
  }
  return context;
};
