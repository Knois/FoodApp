import React, { useContext, useState } from "react";
import { Text, Alert } from "react-native";
import * as SecureStore from "expo-secure-store";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import SighInForm from "../../components/auth/SignInForm";
import { AppContext } from "../../context/AppContext";
import LoadingIndicator from "../../components/LoadingIndicator";
import { MAIN } from "../../constants/Constants";

const SignIn = ({ navigation }) => {
  const { setAuth } = useContext(AppContext);
  const [isLoading, setLoading] = useState(false);

  const createErrorAlert = (message) => {
    Alert.alert("Ошибка", message, [{ text: "ОК", onPress: () => null }], {
      cancelable: true,
    });
  };

  const saveTokenToStore = (token) => {
    SecureStore.setItemAsync("token", token).then(setAuth(true));
  };

  const createJwt = async (obj) => {
    if (!isLoading) setLoading(true);
    try {
      const response = await fetch(
        "http://80.87.201.75:8079/gateway/auth/authenticate",
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
        await saveTokenToStore(json.jwt_token);
      }
    } catch (error) {
      setLoading(false);
      createErrorAlert("Ошибка при попытке залогиниться");
    } finally {
    }
  };

  return (
    <>
      {isLoading ? (
        <LoadingIndicator />
      ) : (
        <KeyboardAwareScrollView
          style={{ backgroundColor: "#fff", padding: 30 }}
        >
          <Text
            style={{
              marginTop: 40,
              fontSize: 40,
              marginBottom: 40,
              alignSelf: "center",
              color: MAIN,
            }}
          >
            Вход
          </Text>
          <SighInForm
            action={createJwt}
            formType="signIn"
            navigation={navigation}
          />
        </KeyboardAwareScrollView>
      )}
    </>
  );
};

export default SignIn;
