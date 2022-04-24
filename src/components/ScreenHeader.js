import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const ScreenHeader = ({ canGoBack, title, action, secondAction }) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        width: "100%",
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "space-between",
        height: 90,
      }}
    >
      <View
        style={{
          margin: 10,
          alignItems: "center",
          backgroundColor: "#d8d6ed",
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
            <Ionicons name="arrow-back" size={30} color="black" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => {
              secondAction();
            }}
          >
            <Ionicons name="ios-calendar-outline" size={30} color="black" />
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
            color: "#645fb1",
          }}
        >
          {title}
        </Text>
      </View>
      <View
        style={{
          margin: 10,
          alignItems: "center",
          backgroundColor: "#d8d6ed",
          borderRadius: 10,
          width: 40,
          height: 40,
          padding: 5,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            action();
          }}
        >
          <Ionicons name="refresh" size={30} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ScreenHeader;
