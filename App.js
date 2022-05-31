import React from "react";
import { LogBox } from "react-native";
import AppNavigation from "./src/screens/AppNavigation";

import { TokenProvider } from "./src/context/TokenContext";
import store from "./src/redux/store";
import { Provider } from "react-redux";

LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
]);

export default App = () => {
  return (
    <Provider store={store}>
      <TokenProvider>
        <AppNavigation />
      </TokenProvider>
    </Provider>
  );
};
