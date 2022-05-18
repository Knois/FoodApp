import React, { useState } from "react";
import { View, Text, TextInput } from "react-native";

import { MAIN, SECONDARY } from "../../constants/Constants";
import PasswordInput from "./PasswordInput";
import SignInButton from "./SignInButton";
import SignInLink from "./SignInLink";

const SighInForm = ({ action, navigation, formType }) => {
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("2022-05-17");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = () => {
    formType == "signIn"
      ? action({ password: password, email: email })
      : action({
          password: password,
          email: email,
          birthday: birthday,
          name: name,
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
            onChangeText={(text) => setName(text)}
            value={name}
            textContentType="username"
            autoComplete="username"
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
          <Text
            style={{
              marginVertical: 10,
              marginLeft: 10,
              fontSize: 15,
              color: MAIN,
            }}
          >
            Дата рождения:
          </Text>
          <TextInput
            onChangeText={(text) => setBirthday(text)}
            value={birthday}
            textContentType="username"
            autoComplete="username"
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
      <SignInButton handleSubmit={handleSubmit} formType={formType} />
      <SignInLink navigation={navigation} formType={formType} />
    </View>
  );
};

export default SighInForm;
