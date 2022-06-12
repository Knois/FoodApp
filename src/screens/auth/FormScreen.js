import React, { useState } from "react";
import { Text, Alert } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useDispatch } from "react-redux";

import { setIsAuthTrue } from "../../redux/slices/auth/isAuthSlice";
import SighInForm from "../../components/auth/SignInForm";
import LoadingIndicator from "../../components/LoadingIndicator";
import { MAIN } from "../../constants/Constants";
import {
  setEmailToStore,
  deleteEmailFromStore,
  setPasswordToStore,
  deletePasswordFromStore,
  setTokenToStore,
} from "../../methods/SecureStoreMethods";

const FormScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const [hasProfile, setHasProfile] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const createErrorAlert = (message) => {
    Alert.alert("Ошибка", message, [{ text: "ОК", onPress: () => null }], {
      cancelable: true,
    });
  };

  const createJwt = async (obj) => {
    if (!isLoading) setLoading(true);
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
        await setTokenToStore(json.jwt_token);
        dispatch(setIsAuthTrue());
      }
    } catch (error) {
      deleteEmailFromStore();
      deletePasswordFromStore();
      createErrorAlert("Ошибка при получении токена");
      setLoading(false);
    } finally {
    }
  };

  const createUser = async (obj) => {
    if (!isLoading) setLoading(true);
    try {
      const response = await fetch(
        "http://80.87.201.75:8079/gateway/auth/user",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(obj),
        }
      );
      const json = await response.json();
      if (json.id) {
        await setEmailToStore(obj.email);
        await setPasswordToStore(obj.password);
        await createJwt({ email: obj.email, password: obj.password });
      }
    } catch (error) {
      createErrorAlert("Ошибка при попытке регистрации");
      setLoading(false);
    } finally {
    }
  };

  const toggleHasProfile = () => {
    setHasProfile(!hasProfile);
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
            {hasProfile ? "Вход" : "Регистрация"}
          </Text>
          <SighInForm
            actionButton={hasProfile ? createJwt : createUser}
            hasProfile={hasProfile}
            actionLink={toggleHasProfile}
            email={email}
            setEmail={setEmail}
          />
        </KeyboardAwareScrollView>
      )}
    </>
  );
};

export default FormScreen;
