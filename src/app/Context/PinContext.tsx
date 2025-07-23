'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';

type PinContextType = {
  pin: string | null;
  setPin: (pin: string) => void;
};

const PinContext = createContext<PinContextType | undefined>(undefined);

export const PinProvider = ({ children }: { children: ReactNode }) => {
  const [pin, setPin] = useState<string | null>(null);
  return (
    <PinContext.Provider value={{ pin, setPin }}>
      {children}
    </PinContext.Provider>
  );
};

export const usePin = () => {
  const context = useContext(PinContext);
  if (!context) throw new Error('usePin must be used within a PinProvider');
  return context;
};
