import { Text, TouchableOpacity } from "react-native";
import React from "react";

const BackModalButton = ({ action }) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: "#645fb1",
        padding: 10,
        alignItems: "center",
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
