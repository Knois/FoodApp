import React, { useContext, useState } from "react";
import { View, Text } from "react-native";
import * as SecureStore from "expo-secure-store";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { AppContext } from "../../context/AppContext";
import SighInForm from "../../components/auth/SignInForm";
import LoadingIndicator from "../../components/LoadingIndicator";
import { MAIN } from "../../constants/Constants";

const Registration = ({ navigation }) => {
  const { setAuth } = useContext(AppContext);
  const [isLoading, setLoading] = useState(false);

  const saveTokenToStore = (token) => {
    SecureStore.setItemAsync("token", token).then(setAuth(true));
  };

  return (
    <>
      {isLoading ? (
        <LoadingIndicator />
      ) : (
        <KeyboardAwareScrollView style={{ backgroundColor: "#fff" }}>
          <View style={{ padding: 30 }}>
            <Text
              style={{
                marginTop: 40,
                fontSize: 40,
                marginBottom: 40,
                alignSelf: "center",
                color: MAIN,
              }}
            >
              Регистрация
            </Text>

            <SighInForm
              action={() => null}
              formType="signUp"
              navigation={navigation}
            />
          </View>
        </KeyboardAwareScrollView>
      )}
    </>
  );
};

export default Registration;
