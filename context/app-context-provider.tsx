"use client";
import { createContext, useState } from "react";

export const AppContext = createContext({});

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [popUpVisible, setPopVisible] = useState<boolean>(false);

  return (
    <AppContext.Provider value={{ popUpVisible, setPopVisible }}>
      {children}
    </AppContext.Provider>
  );
};
