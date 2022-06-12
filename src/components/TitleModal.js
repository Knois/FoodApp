import { View, Text } from "react-native";
import React from "react";
import { MAIN } from "../constants/Constants";

const TitleModal = ({ title }) => {
  return (
    <View
      style={{
        borderTopStartRadius: 10,
        borderTopEndRadius: 10,
        backgroundColor: "#fff",
      }}
    >
      <Text
        style={{
          padding: 10,
          textAlign: "center",
          fontWeight: "bold",
          color: MAIN,
        }}
      >
        {title}
      </Text>
    </View>
  );
};

export default TitleModal;
