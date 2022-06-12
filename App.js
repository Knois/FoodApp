import React from "react";
import { LogBox } from "react-native";
import { Provider } from "react-redux";

import store from "./src/redux/store";
import AppNavigation from "./src/screens/AppNavigation";

LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
]);

export default App = () => {
  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
  );
};
