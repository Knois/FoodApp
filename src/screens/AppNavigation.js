import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { AppContext } from "../Context/AppContext";

import MainScreen from "./MainScreen";
import MealScreen from "./MealScreen";
import MealElementScreen from "./MealElementScreen";

const Main = createNativeStackNavigator();

const AppNavigation = () => {
  const { something } = useContext(AppContext);

  return (
    <NavigationContainer>
      <Main.Navigator>
        <Main.Screen name="MainScreen" component={MainScreen} />
        <Main.Screen name="MealScreen" component={MealScreen} />
        <Main.Screen name="MealElementScreen" component={MealElementScreen} />
      </Main.Navigator>
      <StatusBar style={"dark"} />
    </NavigationContainer>
  );
};
export default AppNavigation;
