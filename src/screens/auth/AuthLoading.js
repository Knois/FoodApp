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

  const checkToken = async (token) => {
    try {
      const response = await fetch(
        "http://80.87.201.75:8079/gateway/auth/check_token",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      const json = await response.json();
      setAuth(true);
    } catch (error) {
      deleteToken();
      createErrorAlert("Ошибка при проверке токена на сервере");
    } finally {
    }
  };

  const checkLoginState = async () => {
    const token = await SecureStore.getItemAsync("token");
    console.log(token);
    token ? checkToken(token) : changeScreen();
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
