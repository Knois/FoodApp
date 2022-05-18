import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import { MAIN, SECONDARY } from "../constants/Constants";

const ScreenHeader = ({ canGoBack, title, action, rightIcon }) => {
  const navigation = useNavigation();

  return (
    <View
      style={{
        width: "100%",
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "space-between",
        height: 100,
      }}
    >
      <View
        style={{
          margin: 10,
          alignItems: "center",
          backgroundColor: SECONDARY,
          borderRadius: 10,
          width: 40,
          height: 40,
          padding: 5,
        }}
      >
        {canGoBack ? (
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Ionicons
              name="ios-arrow-back-circle-outline"
              size={30}
              color={MAIN}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => {
              navigation.toggleDrawer();
            }}
          >
            <Ionicons name="menu-outline" size={30} color={MAIN} />
          </TouchableOpacity>
        )}
      </View>
      <View
        style={{
          margin: 10,
          flex: 5,
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 16,
            height: 30,
            textAlign: "center",
            fontWeight: "bold",
            color: MAIN,
          }}
        >
          {title}
        </Text>
      </View>
      <View
        style={{
          margin: 10,
          alignItems: "center",
          backgroundColor: action == "none" ? "transparent" : SECONDARY,
          borderRadius: 10,
          width: 40,
          height: 40,
          padding: 5,
        }}
      >
        {action !== "none" && (
          <TouchableOpacity
            onPress={() => {
              action();
            }}
          >
            <Ionicons name={rightIcon} size={30} color={MAIN} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default ScreenHeader;
