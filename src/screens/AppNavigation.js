import React, { useContext } from "react";
import { useWindowDimensions } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { StatusBar } from "expo-status-bar";
import { useSelector, useDispatch } from "react-redux";

import { setUserInfo } from "../redux/slices/auth/userInfoSlice";
import { setProductCategories } from "../redux/slices/productCategoriesSlice";

import MainScreen from "./MainScreen";
import MealScreen from "./MealScreen";
import MealElementScreen from "./MealElementScreen";
import SearchScreen from "./SearchScreen";
import ProfileScreen from "./ProfileScreen";
import CameraScreen from "./CameraScreen";
import LoadingScreen from "./auth/LoadingScreen";
import FormScreen from "./auth/FormScreen";
import AllProductScreen from "./AllProductScreen";
import { MAIN, SECONDARY } from "../constants/Constants";
import ProductScreen from "./ProductScreen";
import { TokenContext } from "../context/TokenContext";
import SettingsScreen from "./SettingsScreen";
import { setUserInfoProperties } from "../redux/slices/auth/userInfoProperties";

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
      <ProductsStack.Screen
        name="AllProductScreen"
        component={AllProductScreen}
      />
      <ProductsStack.Screen name="ProductScreen" component={ProductScreen} />
      <ProductsStack.Screen name="CameraScreen" component={CameraScreen} />
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
      <AuthStack.Screen name="LoadingScreen" component={LoadingScreen} />
      <AuthStack.Screen name="FormScreen" component={FormScreen} />
    </AuthStack.Navigator>
  );
};

const ProfileStackScreen = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <AuthStack.Screen name="ProfileScreen" component={ProfileScreen} />
      <AuthStack.Screen name="SettingsScreen" component={SettingsScreen} />
    </AuthStack.Navigator>
  );
};

const AppNavigation = () => {
  const dispatch = useDispatch();
  const window = useWindowDimensions();
  const { token } = useContext(TokenContext);
  const isAuth = useSelector((state) => state.isAuth.value);

  const getAllProductCategories = async () => {
    try {
      const response = await fetch(
        "http://80.87.201.75:8079/gateway/my-food/product_category?page=0&size=99999",
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );
      const json = await response.json();
      if (json.content) {
        dispatch(setProductCategories(json.content));
      }
    } catch (error) {
    } finally {
    }
  };

  const getUserInfo = async () => {
    try {
      const response = await fetch(
        "http://80.87.201.75:8079/gateway/auth/user",
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );
      const json = await response.json();
      if (json) {
        dispatch(setUserInfo(json));
      }
    } catch (error) {
      createErrorAlert("Ошибка при получении профиля");
    } finally {
    }
  };

  const getUserInfoProperties = async () => {
    try {
      const response = await fetch(
        "http://80.87.201.75:8079/gateway/my-food/user_profile",
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status == 404) {
        await createUserInfoProperties();
      } else {
        const json = await response.json();
        dispatch(setUserInfoProperties(json));
      }
    } catch (error) {
      createErrorAlert("Ошибка при получении свойств профиля");
    } finally {
    }
  };

  const createUserInfoProperties = async () => {
    console.log("createUserInfoProperties start");
    try {
      const response = await fetch(
        "http://80.87.201.75:8079/gateway/my-food/user_profile",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify({
            birthday: null,
            gender: null,
            height: null,
            weight: null,
            dayLimitCal: null,
            targetWeight: null,
            targetWeightType: null,
            physicalActivityLevel: null,
          }),
        }
      );

      const json = await response.json();
      getUserInfoProperties();
    } catch (error) {
      createErrorAlert("Ошибка при создании свойств профиля");
    } finally {
    }
  };

  if (isAuth) {
    getAllProductCategories();
    getUserInfo();
    getUserInfoProperties();
  }

  return (
    <NavigationContainer>
      {isAuth ? (
        <Drawer.Navigator
          screenOptions={{
            headerShown: false,
            swipeEnabled: false,
          }}
        >
          <Drawer.Screen
            name="Приемы пищи"
            component={HomeStackScreen}
            options={{
              drawerActiveTintColor: "#fff",
              drawerActiveBackgroundColor: MAIN,
              drawerInactiveTintColor: "black",
              drawerInactiveBackgroundColor: SECONDARY,
              drawerLabelStyle: { fontWeight: "bold", textAlign: "center" },
              drawerType: "front",
              overlayColor: "rgba(100, 95, 177, 0.3)",
              swipeEdgeWidth: window.width / 2,
            }}
          />
          <Drawer.Screen
            name="Продукты"
            component={ProductsStackScreen}
            options={{
              drawerActiveTintColor: "#fff",
              drawerActiveBackgroundColor: MAIN,
              drawerInactiveTintColor: "black",
              drawerInactiveBackgroundColor: SECONDARY,
              drawerLabelStyle: { fontWeight: "bold", textAlign: "center" },
              drawerType: "front",
              overlayColor: "rgba(100, 95, 177, 0.3)",
              swipeEdgeWidth: window.width / 2,
            }}
          />
          <Drawer.Screen
            name="Профиль"
            component={ProfileStackScreen}
            options={{
              drawerActiveTintColor: "#fff",
              drawerActiveBackgroundColor: MAIN,
              drawerInactiveTintColor: "black",
              drawerInactiveBackgroundColor: SECONDARY,
              drawerLabelStyle: { fontWeight: "bold", textAlign: "center" },
              drawerType: "front",
              overlayColor: "rgba(100, 95, 177, 0.3)",
              swipeEdgeWidth: window.width / 2,
            }}
          />
        </Drawer.Navigator>
      ) : (
        <AuthStackScreen />
      )}
      <StatusBar style={"dark"} />
    </NavigationContainer>
  );
};
export default AppNavigation;
