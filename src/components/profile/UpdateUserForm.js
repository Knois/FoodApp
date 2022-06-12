import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

import { MAIN, SECONDARY } from "../../constants/Constants";

const UpdateUserForm = ({ mode, params, action }) => {
  const [name, setName] = useState(params.name);
  const [email, setEmail] = useState(params.email);

  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const [passVisible, setPassVisible] = useState(false);
  const [passVisible2, setPassVisible2] = useState(false);

  const createAlert = (message) => {
    Alert.alert("Внимание!", message, [{ text: "ОК", onPress: () => null }], {
      cancelable: true,
    });
  };

  const submitData = () => {
    if (password || password2) {
      if (password == password2) {
        action(obj);
      } else {
        createAlert("Введенные пароли несовпадают");
      }
    } else {
      action(obj);
    }
  };

  const setObj = (mode) => {
    switch (mode) {
      case "name":
        return { name };

      case "email":
        return { email };

      case "password":
        return { password };
    }
  };

  return (
    <View
      style={{
        backgroundColor: "#fff",
        padding: 10,
        justifyContent: "center",
        height: "70%",
      }}
    >
      {mode == "name" && (
        <>
          <Text
            style={{
              marginVertical: 10,
              fontSize: 15,
              color: MAIN,
            }}
          >
            Name:
          </Text>
          <TextInput
            onChangeText={(text) => setName(text)}
            value={name}
            textContentType="emailAddress"
            autoComplete="email"
            autoCapitalize="none"
            keyboardType="email-address"
            style={{
              borderWidth: 2,
              borderRadius: 5,
              borderColor: MAIN,
              padding: 10,
              paddingHorizontal: 20,
              borderRadius: 10,
              marginBottom: 10,
              color: MAIN,
              fontWeight: "bold",
              backgroundColor: SECONDARY,
              fontWeight: "bold",
            }}
            maxLength={50}
          />
        </>
      )}
      {mode == "email" && (
        <>
          <Text
            style={{
              marginVertical: 10,
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
              borderWidth: 2,
              borderRadius: 5,
              borderColor: MAIN,
              padding: 10,
              paddingHorizontal: 20,
              borderRadius: 10,
              marginBottom: 10,
              color: MAIN,
              fontWeight: "bold",
              backgroundColor: SECONDARY,
              fontWeight: "bold",
            }}
            maxLength={50}
          />
        </>
      )}
      {mode == "password" && (
        <>
          <Text
            style={{
              marginVertical: 10,
              fontSize: 15,
              color: MAIN,
            }}
          >
            Пароль:
          </Text>
          <View
            style={{
              borderColor: MAIN,
              borderWidth: 2,
              padding: 10,
              paddingHorizontal: 20,
              borderRadius: 10,
              marginBottom: 10,
              backgroundColor: SECONDARY,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <TextInput
              onChangeText={(text) => setPassword(text)}
              value={password}
              textContentType="password"
              secureTextEntry={!passVisible}
              autoCapitalize="none"
              style={{ width: "88%", color: "#645fb1", fontWeight: "bold" }}
              maxLength={50}
            />
            <TouchableOpacity
              onPress={() => {
                setPassVisible(!passVisible);
              }}
            >
              <FontAwesome
                name={passVisible ? "eye-slash" : "eye"}
                size={24}
                color={MAIN}
              />
            </TouchableOpacity>
          </View>
          <Text
            style={{
              marginVertical: 10,
              fontSize: 15,
              color: MAIN,
            }}
          >
            Подтверждение пароля:
          </Text>
          <View
            style={{
              borderColor: MAIN,
              borderWidth: 2,
              padding: 10,
              paddingHorizontal: 20,
              borderRadius: 10,
              marginBottom: 10,
              backgroundColor: SECONDARY,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <TextInput
              onChangeText={(text) => setPassword2(text)}
              value={password2}
              textContentType="password"
              secureTextEntry={!passVisible2}
              autoCapitalize="none"
              style={{ width: "88%", color: "#645fb1", fontWeight: "bold" }}
              maxLength={50}
            />
            <TouchableOpacity
              onPress={() => {
                setPassVisible2(!passVisible2);
              }}
            >
              <FontAwesome
                name={passVisible2 ? "eye-slash" : "eye"}
                size={24}
                color={MAIN}
              />
            </TouchableOpacity>
          </View>
        </>
      )}
      <TouchableOpacity /*                              Кнопка подтверждения изменений*/
        style={{
          backgroundColor: "#d8d6ed",
          width: 50,
          height: 50,
          alignItems: "center",
          justifyContent: "center",
          alignSelf: "center",
          marginBottom: 20,
          borderRadius: 10,
          margin: 5,
        }}
        onPress={() => {
          action(setObj(mode));
        }}
      >
        <Ionicons name="checkmark" size={40} color="#645fb1" />
      </TouchableOpacity>
    </View>
  );
};

export default UpdateUserForm;
