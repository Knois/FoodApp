import { useLayoutEffect } from "react";
import { Alert } from "react-native";
import { useDispatch } from "react-redux";

import { setIsAuthTrue } from "../../redux/slices/auth/isAuthSlice";
import { setToken } from "../../redux/slices/auth/tokenSlice";
import LoadingIndicator from "../../components/LoadingIndicator";
import {
  getEmailFromStore,
  deleteEmailFromStore,
  getPasswordFromStore,
  deletePasswordFromStore,
} from "../../methods/SecureStoreMethods";

const LoadingScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const changeScreen = () => {
    navigation.reset({
      index: 1,
      routes: [{ name: "FormScreen" }],
    });
  };

  const createErrorAlert = (message, action) => {
    Alert.alert(
      "Ошибка",
      message,
      [
        {
          text: "ОК",
          onPress: () => action(),
        },
      ],
      {
        cancelable: false,
      }
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
      if (json.jwt_token) {
        dispatch(setToken(json.jwt_token));
        dispatch(setIsAuthTrue());
      }
    } catch (error) {
      deleteEmailFromStore();
      deletePasswordFromStore();
      createErrorAlert("Ошибка при получении токена", changeScreen);
    } finally {
    }
  };

  const checkLoginState = async () => {
    const email = await getEmailFromStore();
    const password = await getPasswordFromStore();
    email && password ? createJwt({ email, password }) : changeScreen();
  };

  useLayoutEffect(() => {
    checkLoginState();
  }, []);

  return (
    <>
      <LoadingIndicator />
    </>
  );
};

export default LoadingScreen;
