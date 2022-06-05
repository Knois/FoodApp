import { View, Text, TouchableOpacity, Alert } from "react-native";
import React, { useContext, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo } from "../redux/slices/auth/userInfoSlice";

import { setIsAuthFalse } from "../redux/slices/auth/isAuthSlice";

import ScreenHeader from "../components/ScreenHeader";
import { MAIN, SECONDARY } from "../constants/Constants";
import { TokenContext } from "../context/TokenContext";

const SettingsScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const userInfo = useSelector((state) => state.userInfo.value);

  const deleteToken = async () => {
    await SecureStore.deleteItemAsync("token");
  };

  const createTwoButtonAlert = () =>
    Alert.alert(
      "Выход",
      "Подтверждаете выход из профиля?",
      [
        {
          text: "Отмена",
          style: "cancel",
        },
        { text: "ОК", onPress: () => signOut() },
      ],
      {
        cancelable: true,
      }
    );

  const signOut = () => {
    deleteToken().then(() => dispatch(setIsAuthFalse()));
  };

  return (
    <View style={{ flex: 1 }}>
      <ScreenHeader canGoBack={true} title="Настройки" action="none" />
      <TouchableOpacity /*                                 Кнопка смены имени     */
        style={{
          borderWidth: 2,
          borderColor: MAIN,
          marginVertical: 5,
          flexDirection: "row",
          backgroundColor: SECONDARY,
          justifyContent: "space-between",
          alignSelf: "center",
          padding: 10,
          alignItems: "center",
          borderRadius: 20,
          width: "80%",
          height: 60,
        }}
        onPress={null}
      >
        <View style={{ flex: 2, alignItems: "center" }}>
          <Ionicons name="ios-person-circle-outline" size={30} color={MAIN} />
        </View>
        <View style={{ flex: 10, alignItems: "center" }}>
          <Text
            style={{
              color: MAIN,
              fontWeight: "bold",
              fontSize: 16,
              marginLeft: 10,
              alignSelf: "center",
            }}
          >
            Изменить имя
          </Text>
        </View>
        <View style={{ flex: 2, alignItems: "center" }} />
      </TouchableOpacity>
      <TouchableOpacity /*                                 Кнопка смены email     */
        style={{
          borderWidth: 2,
          borderColor: MAIN,
          marginVertical: 5,
          flexDirection: "row",
          backgroundColor: SECONDARY,
          justifyContent: "space-between",
          alignSelf: "center",
          padding: 10,
          alignItems: "center",
          borderRadius: 20,
          width: "80%",
          height: 60,
        }}
        onPress={null}
      >
        <View style={{ flex: 2, alignItems: "center" }}>
          <Ionicons name="mail-outline" size={30} color={MAIN} />
        </View>
        <View style={{ flex: 10, alignItems: "center" }}>
          <Text
            style={{
              color: MAIN,
              fontWeight: "bold",
              fontSize: 16,
              marginLeft: 10,
            }}
          >
            Изменить email
          </Text>
        </View>
        <View style={{ flex: 2, alignItems: "center" }} />
      </TouchableOpacity>
      <TouchableOpacity /*                                 Кнопка смены пароля     */
        style={{
          borderWidth: 2,
          borderColor: MAIN,
          marginVertical: 5,
          flexDirection: "row",
          backgroundColor: SECONDARY,
          justifyContent: "space-between",
          alignSelf: "center",
          padding: 10,
          alignItems: "center",
          borderRadius: 20,
          width: "80%",
          height: 60,
        }}
        onPress={null}
      >
        <View style={{ flex: 2, alignItems: "center" }}>
          <Ionicons name="ios-key-outline" size={30} color={MAIN} />
        </View>
        <View style={{ flex: 10, alignItems: "center" }}>
          <Text
            style={{
              color: MAIN,
              fontWeight: "bold",
              fontSize: 16,
              marginLeft: 10,
            }}
          >
            Изменить пароль
          </Text>
        </View>
        <View style={{ flex: 2, alignItems: "center" }} />
      </TouchableOpacity>
      <TouchableOpacity /*                                 Кнопка выхода из профиля      */
        style={{
          borderWidth: 2,
          borderColor: SECONDARY,
          marginVertical: 5,
          flexDirection: "row",
          backgroundColor: MAIN,
          justifyContent: "space-between",
          alignSelf: "center",
          padding: 10,
          alignItems: "center",
          borderRadius: 20,
          width: "80%",
          height: 60,
        }}
        onPress={createTwoButtonAlert}
      >
        <View style={{ flex: 2, alignItems: "center" }}>
          <Ionicons name="ios-power" size={30} color="#FFF" />
        </View>
        <View style={{ flex: 10, alignItems: "center" }}>
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
        </View>
        <View style={{ flex: 2, alignItems: "center" }} />
      </TouchableOpacity>
    </View>
  );
};

export default SettingsScreen;
