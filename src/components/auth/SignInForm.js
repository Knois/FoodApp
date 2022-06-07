import React, { useState } from "react";
import { View, Text, TextInput } from "react-native";
import * as SecureStore from "expo-secure-store";

import { MAIN, SECONDARY } from "../../constants/Constants";
import PasswordInput from "./PasswordInput";
import SignInButton from "./SignInButton";
import SignInLink from "./SignInLink";

const SighInForm = ({
  actionButton,
  actionLink,
  email,
  setEmail,
  hasProfile,
}) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    SecureStore.setItemAsync("email", email)
      .then(SecureStore.setItemAsync("password", password))
      .then(
        actionButton(
          hasProfile ? { password, email } : { password, email, name }
        )
      );
  };

  return (
    <View>
      {!hasProfile && (
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
            onChangeText={(text) => setName(text)}
            value={name}
            autoCapitalize="sentences"
            style={{
              borderColor: MAIN,
              borderWidth: 2,
              padding: 15,
              borderRadius: 10,
              marginBottom: 10,
              color: "#645fb1",
              fontWeight: "bold",
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
        keyboardType="email-address"
        style={{
          borderColor: MAIN,
          borderWidth: 2,
          padding: 15,
          borderRadius: 10,
          marginBottom: 10,
          color: "#645fb1",
          fontWeight: "bold",
          backgroundColor: SECONDARY,
        }}
        maxLength={50}
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
      <SignInButton handleSubmit={handleSubmit} hasProfile={hasProfile} />
      <SignInLink hasProfile={hasProfile} actionLink={actionLink} />
    </View>
  );
};

export default SighInForm;
