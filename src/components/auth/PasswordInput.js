import { View, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { MAIN, SECONDARY } from "../../constants/Constants";

const PasswordInput = ({ password, setPassword }) => {
  const [isVisible, setVisible] = useState(false);
  return (
    <View
      style={{
        borderColor: MAIN,
        borderWidth: 2,
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        backgroundColor: SECONDARY,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <TextInput
        onChangeText={(text) => setPassword(text)}
        value={password}
        textContentType="password"
        secureTextEntry={!isVisible}
        autoCapitalize="none"
        style={{ width: "88%", color: "#645fb1", fontWeight: "bold" }}
        maxLength={50}
      />
      <TouchableOpacity
        onPress={() => {
          setVisible(!isVisible);
        }}
      >
        <FontAwesome
          name={isVisible ? "eye-slash" : "eye"}
          size={24}
          color={MAIN}
        />
      </TouchableOpacity>
    </View>
  );
};

export default PasswordInput;
