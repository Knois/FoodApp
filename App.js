import React from "react";
import { LogBox } from "react-native";
import AppNavigation from "./src/screens/AppNavigation";
import { AppProvider } from "./src/context/AppContext";
import { TokenProvider } from "./src/context/TokenContext";
import store from "./src/redux/store";
import { Provider } from "react-redux";

LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
]);

export default App = () => {
  return (
    <Provider store={store}>
      {
        //<AppProvider>
      }
      <TokenProvider>
        <AppNavigation />
      </TokenProvider>
      {
        //</AppProvider>
      }
    </Provider>
  );
};
