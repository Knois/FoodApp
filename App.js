import React from "react";
import AppNavigation from "./src/screens/AppNavigation";
import { AppProvider } from "./src/context/AppContext";

export default App = () => {
  return (
    <AppProvider>
      <AppNavigation />
    </AppProvider>
  );
};
