import { TouchableOpacity, Text, View } from "react-native";
import React from "react";

import { MAIN, SECONDARY } from "../../constants/Constants";

const SignInLink = ({ hasProfile, actionLink }) => {
  return (
    <View style={{ flexDirection: "row", justifyContent: "center" }}>
      <Text style={{ color: SECONDARY, fontWeight: "bold" }}>
        {hasProfile ? "Еще не зарегистрированы? " : "Уже зарегистрированы? "}
      </Text>
      <TouchableOpacity
        onPress={() => {
          actionLink();
        }}
      >
        <Text style={{ color: MAIN, fontWeight: "bold" }}>
          {hasProfile ? "Регистрация" : "Войти"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignInLink;
