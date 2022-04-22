import { View, Text } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const ScreenHeader = ({ canGoBack, title, action }) => {
  const navigation = useNavigation();
  return (
    <View style={{ width: "100%", height: 50 }}>
      {canGoBack && (
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
      )}
      <Text>{title}</Text>
      <TouchableOpacity
        onPress={() => {
          action();
        }}
      ></TouchableOpacity>
    </View>
  );
};

export default ScreenHeader;
