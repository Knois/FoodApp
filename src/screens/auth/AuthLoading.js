import { useContext, useEffect } from "react";
import { Text, Alert } from "react-native";
import * as SecureStore from "expo-secure-store";

import { AppContext } from "../../context/AppContext";
import LoadingIndicator from "../../components/LoadingIndicator";

const AuthLoading = ({ navigation }) => {
  const { setAuth } = useContext(AppContext);

  const createErrorAlert = (message) => {
    Alert.alert(
      "Ошибка",
      message,
      [
        {
          text: "ОК",
          onPress: () =>
            navigation.reset({
              index: 1,
              routes: [{ name: "SignIn" }],
            }),
        },
      ],
      {
        cancelable: false,
      }
    );
  };

  const changeScreen = () => {
    navigation.reset({
      index: 1,
      routes: [{ name: "SignIn" }],
    });
  };

  const deleteToken = async () => {
    await SecureStore.deleteItemAsync("token");
  };

  const saveTokenToStore = (token) => {
    SecureStore.setItemAsync("token", token).then(setAuth(true));
  };

  const createJwt = async () => {
    const email = await SecureStore.getItemAsync("email");
    const password = await SecureStore.getItemAsync("password");

    try {
      const response = await fetch(
        "http://80.87.201.75:8079/gateway/auth/authenticate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const json = await response.json();
      await saveTokenToStore(json.jwt_token);
    } catch (error) {
      deleteToken();
      createErrorAlert(
        "Ошибка при попытке залогиниться и получить новый токен"
      );
    } finally {
    }
  };

  const checkLoginState = async () => {
    const token = await SecureStore.getItemAsync("token");
    token ? createJwt() : changeScreen();
  };

  useEffect(() => {
    checkLoginState();
  }, []);

  return (
    <>
      <LoadingIndicator />
    </>
  );
};

export default AuthLoading;
