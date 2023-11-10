"use client";

import React, { createContext, useContext, useState } from "react";

interface LayoutContextProps {
  sidebarIsOpen: boolean;
  toggleSidebar: () => void;
}

const LayoutContext = createContext<LayoutContextProps | undefined>(undefined);

export const useLayout = () => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error("useLayout deve ser usado dentro de um LayoutProvider");
  }
  return context;
};

type LayoutProviderProps = {
  children: React.ReactNode;
};

export function LayoutProvider({ children }: LayoutProviderProps) {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarIsOpen(!sidebarIsOpen);
  };

  return <LayoutContext.Provider
    value={{ sidebarIsOpen, toggleSidebar: toggleSidebar }}>{children}</LayoutContext.Provider>;
}
