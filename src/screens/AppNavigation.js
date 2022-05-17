import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { StatusBar } from "expo-status-bar";
import { AppContext } from "../context/AppContext";

import MainScreen from "./MainScreen";
import MealScreen from "./MealScreen";
import MealElementScreen from "./MealElementScreen";
import SearchScreen from "./SearchScreen";
import ProductScreen from "./ProductScreen";
import CameraScreen from "./CameraScreen";
import AuthLoading from "./auth/AuthLoading";
import SignIn from "./auth/SignIn";
import Registration from "./auth/Registration";

const Drawer = createDrawerNavigator();
const HomeStack = createNativeStackNavigator();
const ProductsStack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <HomeStack.Screen name="MainScreen" component={MainScreen} />
      <HomeStack.Screen name="MealScreen" component={MealScreen} />
      <HomeStack.Screen
        name="MealElementScreen"
        component={MealElementScreen}
      />
      <HomeStack.Screen name="SearchScreen" component={SearchScreen} />
      <HomeStack.Screen name="CameraScreen" component={CameraScreen} />
    </HomeStack.Navigator>
  );
};

const ProductsStackScreen = () => {
  return (
    <ProductsStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <ProductsStack.Screen name="ProductScreen" component={ProductScreen} />
    </ProductsStack.Navigator>
  );
};

const AuthStackScreen = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <AuthStack.Screen name="AuthLoading" component={AuthLoading} />
      <AuthStack.Screen name="SignIn" component={SignIn} />
      <AuthStack.Screen name="Registration" component={Registration} />
    </AuthStack.Navigator>
  );
};

const AppNavigation = () => {
  const { isAuth } = useContext(AppContext);

  return (
    <NavigationContainer>
      {isAuth ? (
        <Drawer.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Drawer.Screen name="Приемы пищи" component={HomeStackScreen} />
          <Drawer.Screen name="Продукты" component={ProductsStackScreen} />
        </Drawer.Navigator>
      ) : (
        <AuthStackScreen />
      )}

      <StatusBar style={"dark"} />
    </NavigationContainer>
  );
};
export default AppNavigation;
