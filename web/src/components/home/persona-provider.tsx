"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import type { KitFinderPersona } from "@/lib/kit-finder-logic";

type PersonaContextValue = {
  persona: KitFinderPersona | null;
  setPersona: (p: KitFinderPersona | null) => void;
};

const PersonaContext = createContext<PersonaContextValue | null>(null);

export function PersonaProvider({ children }: { children: ReactNode }) {
  const [persona, setPersonaState] = useState<KitFinderPersona | null>(null);
  const setPersona = useCallback((p: KitFinderPersona | null) => {
    setPersonaState(p);
  }, []);
  const value = useMemo(() => ({ persona, setPersona }), [persona, setPersona]);
  return <PersonaContext.Provider value={value}>{children}</PersonaContext.Provider>;
}

export function useHomePersona() {
  const ctx = useContext(PersonaContext);
  if (!ctx) {
    throw new Error("useHomePersona must be used within PersonaProvider");
  }
  return ctx;
}
