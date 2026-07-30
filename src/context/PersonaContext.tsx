"use client";

import React, { createContext, useContext } from "react";
import { PersonaConfig, personas } from "@/lib/data";

interface PersonaContextType {
  persona: PersonaConfig;
  personaId: string;
}

const PersonaContext = createContext<PersonaContextType>({
  persona: personas.claude,
  personaId: "claude",
});

export const PersonaProvider: React.FC<{
  personaId?: string;
  children: React.ReactNode;
}> = ({ personaId = "claude", children }) => {
  const persona = personas[personaId] || personas.claude;

  return (
    <PersonaContext.Provider value={{ persona, personaId: persona.id }}>
      {children}
    </PersonaContext.Provider>
  );
};

export const usePersona = () => useContext(PersonaContext);
