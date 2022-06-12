import { Text, TouchableOpacity } from "react-native";
import React from "react";

const BackModalButton = ({ action }) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: "#645fb1",
        padding: 10,
        alignItems: "center",
        borderBottomStartRadius: 10,
        borderBottomEndRadius: 10,
      }}
      onPress={() => {
        action();
      }}
    >
      <Text style={{ color: "white" }}>Назад</Text>
    </TouchableOpacity>
  );
};

export default BackModalButton;
