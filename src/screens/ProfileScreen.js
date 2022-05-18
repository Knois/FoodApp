import { View, Text, TouchableOpacity, TextInput } from "react-native";
import React, { useContext, useState, useLayoutEffect } from "react";
import * as SecureStore from "expo-secure-store";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

import ScreenHeader from "../components/ScreenHeader";
import { AppContext } from "../context/AppContext";
import { MAIN, SECONDARY } from "../constants/Constants";

const ProfileScreen = () => {
  const { setAuth } = useContext(AppContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const deleteToken = async () => {
    await SecureStore.deleteItemAsync("token");
  };

  const signOut = () => {
    deleteToken().then(setAuth(false));
  };

  const getToken = async () => {
    const userToken = await SecureStore.getItemAsync("token");
    return userToken;
  };

  const getUser = async () => {
    const token = await getToken();

    try {
      const response = await fetch(
        "http://80.87.201.75:8079/gateway/auth/user",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      const json = await response.json();
      if (json) {
        setName(json.name);
        setEmail(json.email);
        setBirthday(json.birthday);
      }
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  useLayoutEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <View style={{ flex: 1 }}>
        <ScreenHeader
          canGoBack={false}
          title="Профиль"
          action={() => null}
          rightIcon="pencil"
        />
        <View style={{ margin: 10, flex: 1 }}>
          <View
            style={{
              marginVertical: 5,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ color: MAIN }}>Имя:</Text>
            <Text style={{ color: MAIN, fontWeight: "bold" }}>{name}</Text>
          </View>
          <View
            style={{
              marginVertical: 5,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ color: MAIN }}>Email:</Text>
            <Text style={{ color: MAIN, fontWeight: "bold" }}>{email}</Text>
          </View>
          <View
            style={{
              marginVertical: 5,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ color: MAIN }}>Дата рождения:</Text>
            <Text style={{ color: MAIN, fontWeight: "bold" }}>{birthday}</Text>
          </View>
        </View>

        <TouchableOpacity
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
    </>
  );
};

export default ProfileScreen;
