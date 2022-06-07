import { Text } from "react-native";
import React from "react";
import { MAIN } from "../constants/Constants";

const TitleModal = ({ title }) => {
  return (
    <Text
      style={{
        backgroundColor: "#fff",
        padding: 10,
        textAlign: "center",
        fontWeight: "bold",
        color: MAIN,
      }}
    >
      {title}
    </Text>
  );
};

export default TitleModal;
