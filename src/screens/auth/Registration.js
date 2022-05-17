import React, { useContext } from "react";
import { View, Text } from "react-native";
import * as SecureStore from "expo-secure-store";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { AppContext } from "../../context/AppContext";
import SighInForm from "../../components/auth/SignInForm";
import LoadingIndicator from "../../components/LoadingIndicator";

const Registration = ({ navigation }) => {
  const { setAuth } = useContext(AppContext);

  const saveTokenToStore = (token) => {
    SecureStore.setItemAsync("token", token).then(setAuth(true));
  };

  const [signUp, { loading, error }] = useMutation(REGISTRATION_USER, {
    onCompleted: (data) => {
      saveTokenToStore(data.signUp);
    },
  });

  if (loading) return <LoadingIndicator />;

  return (
    <KeyboardAwareScrollView style={{ backgroundColor: MAIN }}>
      <View style={{ padding: 30 }}>
        <Text style={style.signInTitle}>Sign Up</Text>
        {error && (
          <Text style={{ color: SECONDARY_DARK, alignSelf: "center" }}>
            Error sign up
          </Text>
        )}
        <SighInForm action={signUp} formType="signUp" navigation={navigation} />
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Registration;
