import React, { useContext } from "react";
import { View, Text } from "react-native";
import * as SecureStore from "expo-secure-store";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import SighInForm from "../components/SighInForm";
import { AppContext } from "../context/AppContext";
import LoadingIndicator from "../components/LoadingIndicator";

const SignIn = ({ navigation }) => {
  const { setAuth } = useContext(AppContext);

  const saveTokenToStore = (token) => {
    SecureStore.setItemAsync("token", token).then(setAuth(true));
  };

  const [signIn, { loading, error }] = useMutation(SIGNIN_USER, {
    onCompleted: (data) => {
      saveTokenToStore(data.signIn);
    },
  });

  if (loading) return <LoadingIndicator />;

  return (
    <KeyboardAwareScrollView style={{ backgroundColor: "#fff" }}>
      <View style={{ padding: 30 }}>
        <Text style={style.signInTitle}>Log In</Text>
        {error && (
          <Text style={{ color: SECONDARY_DARK, alignSelf: "center" }}>
            Error log in
          </Text>
        )}
        <SighInForm action={signIn} formType="signIn" navigation={navigation} />
      </View>
    </KeyboardAwareScrollView>
  );
};

export default SignIn;
