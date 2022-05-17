import { View, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";

const PasswordInput = ({ password, setPassword }) => {
  const [isVisible, setVisible] = useState(false);
  return (
    <View style={style.signInFormPasswordInput}>
      <TextInput
        onChangeText={(text) => setPassword(text)}
        value={password}
        textContentType="password"
        secureTextEntry={!isVisible}
        autoCapitalize="none"
        style={{ width: "88%" }}
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
          color={SECONDARY_DARK}
        />
      </TouchableOpacity>
    </View>
  );
};

export default PasswordInput;
