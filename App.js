import React from "react";
import AppNavigation from "./src/screens/AppNavigation";
import { AppProvider } from "./src/context/AppContext";
import { LogBox } from "react-native";

LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
]);

export default App = () => {
  return (
    <AppProvider>
      <AppNavigation />
    </AppProvider>
  );
};
