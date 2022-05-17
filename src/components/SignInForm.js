import React, { useState } from "react";
import { View, Text, TextInput } from "react-native";
import PasswordInput from "./PasswordInput";
import SignInButton from "./SignInButton";
import SignInLink from "./SignInLink";

const SighInForm = ({ action, navigation, formType }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleSubmit = () => {
    action({
      variables: {
        email: email,
        password: password,
        username: username,
      },
    });
  };

  return (
    <View>
      {formType == "signUp" && (
        <>
          <Text style={style.signInFormText}>Username:</Text>
          <TextInput
            onChangeText={(text) => setUsername(text)}
            value={username}
            textContentType="username"
            autoComplete="username"
            autoCapitalize="none"
            style={style.signInFormTextInput}
            maxLength={50}
          />
        </>
      )}
      <Text style={style.signInFormText}>Email:</Text>
      <TextInput
        onChangeText={(text) => setEmail(text)}
        value={email}
        textContentType="emailAddress"
        autoComplete="email"
        autoCapitalize="none"
        style={style.signInFormTextInput}
        maxLength={50}
        keyboardType="email-address"
      />
      <Text style={style.signInFormText}>Password:</Text>
      <PasswordInput password={password} setPassword={setPassword} />
      <SignInButton handleSubmit={handleSubmit} formType={formType} />
      <SignInLink navigation={navigation} formType={formType} />
    </View>
  );
};

export default SighInForm;