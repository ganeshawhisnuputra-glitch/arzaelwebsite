import React, { createContext, useContext, useState } from 'react';

interface EntryContextType {
  hasEntered: boolean;
  enterWorld: () => void;
  replayEntry: () => void;
}

const EntryContext = createContext<EntryContextType | undefined>(undefined);

const SESSION_KEY = 'arzael_entered_session';

export const EntryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Session-scoped entry state:
  // On a clean first visit (fresh browser session / new window), hasEntered is always false so snake intro renders.
  // When completed or skipped in the active tab/session, hasEntered is true and persists across refreshes within that session.
  const [hasEntered, setHasEntered] = useState<boolean>(() => {
    try {
      // Remove any legacy persistent localStorage key that would permanently bypass the intro
      if (typeof localStorage !== 'undefined') {
        localStorage.removeItem('arzael_entered_world');
      }
      if (typeof sessionStorage !== 'undefined') {
        return sessionStorage.getItem(SESSION_KEY) === 'true';
      }
    } catch {
      // Storage access restricted or disabled
    }
    return false;
  });

  const enterWorld = () => {
    setHasEntered(true);
    try {
      if (typeof sessionStorage !== 'undefined') {
        sessionStorage.setItem(SESSION_KEY, 'true');
      }
    } catch {
      // Storage access restricted or disabled
    }
  };

  const replayEntry = () => {
    setHasEntered(false);
    try {
      if (typeof sessionStorage !== 'undefined') {
        sessionStorage.removeItem(SESSION_KEY);
      }
    } catch {}
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
