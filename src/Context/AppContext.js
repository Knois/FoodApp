import { createContext, useMemo, useState } from "react";

export const AppContext = createContext({});

export const AppProvider = ({ children }) => {
  const [isAuth, setAuth] = useState(false);

  const value = useMemo(
    () => ({
      isAuth,
      setAuth,
    }),
    [isAuth]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
