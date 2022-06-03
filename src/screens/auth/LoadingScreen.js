import { useContext, useEffect } from "react";
import { Alert } from "react-native";
import * as SecureStore from "expo-secure-store";
import { useDispatch } from "react-redux";
import { setIsAuthTrue } from "../../redux/slices/auth/isAuthSlice";

import LoadingIndicator from "../../components/LoadingIndicator";
import { TokenContext } from "../../context/TokenContext";

const LoadingScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const { setToken } = useContext(TokenContext);

  const changeScreen = () => {
    navigation.reset({
      index: 1,
      routes: [{ name: "FormScreen" }],
    });
  };

  const createErrorAlert = (message) => {
    Alert.alert(
      "Ошибка",
      message,
      [
        {
          text: "ОК",
          onPress: () => changeScreen(),
        },
      ],
      {
        cancelable: false,
      }
    );
  };

  const deleteToken = async () => {
    await SecureStore.deleteItemAsync("token");
  };

  const saveTokenToStore = (token) => {
    SecureStore.setItemAsync("token", token).then(() =>
      dispatch(setIsAuthTrue())
    );
  };

  const createJwt = async (obj) => {
    try {
      const response = await fetch(
        "http://80.87.201.75:8079/gateway/auth/authenticate/jwt",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(obj),
        }
      );

      const json = await response.json();
      setToken(json.jwt_token);
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
    const email = await SecureStore.getItemAsync("email");
    const password = await SecureStore.getItemAsync("password");
    token ? createJwt({ email, password }) : changeScreen();
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

export default LoadingScreen;
