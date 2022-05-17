import React, { useState } from "react";
import { View, Text, TextInput } from "react-native";
import { MAIN, SECONDARY } from "../../constants/Constants";
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
          <Text
            style={{
              marginVertical: 10,
              marginLeft: 10,
              fontSize: 15,
              color: MAIN,
            }}
          >
            Имя:
          </Text>
          <TextInput
            onChangeText={(text) => setUsername(text)}
            value={username}
            textContentType="username"
            autoComplete="username"
            autoCapitalize="sentences"
            style={{
              borderColor: MAIN,
              borderWidth: 2,
              padding: 15,
              borderRadius: 20,
              marginBottom: 10,
              backgroundColor: SECONDARY,
            }}
            maxLength={50}
          />
        </>
      )}
      <Text
        style={{
          marginVertical: 10,
          marginLeft: 10,
          fontSize: 15,
          color: MAIN,
        }}
      >
        Email:
      </Text>
      <TextInput
        onChangeText={(text) => setEmail(text)}
        value={email}
        textContentType="emailAddress"
        autoComplete="email"
        autoCapitalize="none"
        style={{
          borderColor: MAIN,
          borderWidth: 2,
          padding: 15,
          borderRadius: 20,
          marginBottom: 10,
          backgroundColor: SECONDARY,
        }}
        maxLength={50}
        keyboardType="email-address"
      />
      <Text
        style={{
          marginVertical: 10,
          marginLeft: 10,
          fontSize: 15,
          color: MAIN,
        }}
      >
        Пароль:
      </Text>
      <PasswordInput password={password} setPassword={setPassword} />
      <SignInButton handleSubmit={handleSubmit} formType={formType} />
      <SignInLink navigation={navigation} formType={formType} />
    </View>
  );
};

export default SighInForm;
