import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import * as SecureStore from "expo-secure-store";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";

import { setIsAuthFalse } from "../redux/slices/auth/isAuthSlice";

import ScreenHeader from "../components/ScreenHeader";
import { MAIN, SECONDARY } from "../constants/Constants";

const SettingsScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const deleteToken = async () => {
    await SecureStore.deleteItemAsync("token");
  };

  const signOut = () => {
    deleteToken().then(() => dispatch(setIsAuthFalse()));
  };

  return (
    <View style={{ flex: 1 }}>
      <ScreenHeader canGoBack={true} title="Настройки" action="none" />
      <TouchableOpacity /*                                 Кнопка выхода из профиля      */
        style={{
          borderWidth: 2,
          borderColor: SECONDARY,
          marginTop: 25,
          marginBottom: 50,
          flexDirection: "row",
          backgroundColor: MAIN,
          justifyContent: "center",
          alignSelf: "center",
          padding: 10,
          alignItems: "center",
          borderRadius: 20,
          width: "60%",
        }}
        onPress={signOut}
      >
        <Ionicons name="ios-power" size={30} color="#FFF" />
        <Text
          style={{
            color: "#fff",
            fontWeight: "bold",
            fontSize: 16,
            marginLeft: 10,
          }}
        >
          Выход
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SettingsScreen;
