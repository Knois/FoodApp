import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { MAIN, SECONDARY } from "../constants/Constants";

const UpdateUserForm = ({ params, action }) => {
  const [name, setName] = useState(params.name);
  const [email, setEmail] = useState(params.email);
  const [birthday, setBirthday] = useState(params.birthday);
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const [passVisible, setPassVisible] = useState(false);
  const [passVisible2, setPassVisible2] = useState(false);

  const createAlert = () => {
    Alert.alert(
      "Внимание!",
      "Введенные пароли несовпадают",
      [{ text: "ОК", onPress: () => null }],
      {
        cancelable: true,
      }
    );
  };

  const submitData = () => {
    if (password || password2) {
      if (password == password2) {
        action({ name, birthday, password, email });
      } else {
        createAlert();
      }
    } else {
      action({ name, birthday, email });
    }
  };

  return (
    <KeyboardAwareScrollView style={{ backgroundColor: "#fff", padding: 10 }}>
      <Text
        style={{
          marginVertical: 10,
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
      <Text
        style={{
          marginVertical: 10,
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

      <TouchableOpacity /*                                                    Кнопка подтверждения изменений*/
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
        onPress={submitData}
      >
        <Ionicons name="checkmark" size={40} color="#645fb1" />
      </TouchableOpacity>
    </KeyboardAwareScrollView>
  );
};

export default UpdateUserForm;
