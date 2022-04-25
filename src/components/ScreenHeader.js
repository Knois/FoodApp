import {
  View,
  Text,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const ScreenHeader = ({ canGoBack, title, action, icon }) => {
  const navigation = useNavigation();
  const window = useWindowDimensions();
  return (
    <View
      style={{
        width: "100%",
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "space-between",
        height: window.height / 9,
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
            <Ionicons
              name="ios-arrow-back-circle-outline"
              size={30}
              color="#645fb1"
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => {
              navigation.toggleDrawer();
            }}
          >
            <Ionicons name="menu-outline" size={30} color="#645fb1" />
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
          backgroundColor: action == "none" ? "transparent" : "#d8d6ed",
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
            <Ionicons name="refresh" size={30} color="#645fb1" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default ScreenHeader;
