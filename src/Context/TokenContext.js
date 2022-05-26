import { createContext, useMemo, useState } from "react";

export const TokenContext = createContext({});

export const TokenProvider = ({ children }) => {
  const [mainToken, setMainToken] = useState(false);

  const value = useMemo(
    () => ({
      mainToken,
      setMainToken,
    }),
    [mainToken]
  );

  return (
    <TokenContext.Provider value={value}>{children}</TokenContext.Provider>
  );
};
