import { View, Text, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import * as SecureStore from "expo-secure-store";
import { Ionicons } from "@expo/vector-icons";

import ScreenHeader from "../components/ScreenHeader";
import { AppContext } from "../context/AppContext";
import { MAIN, SECONDARY } from "../constants/Constants";

const ProfileScreen = () => {
  const { setAuth } = useContext(AppContext);

  const deleteToken = async () => {
    await SecureStore.deleteItemAsync("token");
  };

  const signOut = () => {
    deleteToken().then(setAuth(false));
  };

  return (
    <>
      <View style={{ flex: 1 }}>
        <>
          <ScreenHeader
            canGoBack={false}
            title="Профиль"
            action={() => null}
            rightIcon="refresh"
          />
          <View
            style={{
              flex: 1,
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              style={{
                flexDirection: "row",
                backgroundColor: MAIN,
                justifyContent: "center",
                alignSelf: "center",
                padding: 10,
                alignItems: "center",
                borderRadius: 20,
                width: "50%",
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
      </View>
    </>
  );
};

export default ProfileScreen;
