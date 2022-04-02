import { createContext, useMemo, useState } from "react";

export const AppContext = createContext({});

export const AppProvider = ({ children }) => {
  const [something, setSomething] = useState(false);

  const value = useMemo(
    () => ({
      something,
      setSomething,
    }),
    [something]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
