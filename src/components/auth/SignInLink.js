import { TouchableOpacity, Text, View } from "react-native";
import React from "react";
import { MAIN, SECONDARY } from "../../constants/Constants";

const SignInLink = ({ navigation, formType }) => {
  return (
    <View style={{ flexDirection: "row", justifyContent: "center" }}>
      <Text style={{ color: SECONDARY, fontWeight: "bold" }}>
        {formType == "signUp"
          ? "Уже зарегистрированы? "
          : "Еще не зарегистрированы? "}
      </Text>
      <TouchableOpacity
        onPress={() =>
          navigation.reset({
            index: 1,
            routes: [
              { name: formType !== "signUp" ? "Registration" : "SignIn" },
            ],
          })
        }
      >
        <Text style={{ color: MAIN, fontWeight: "bold" }}>
          {formType == "signUp" ? "Войти" : "Регистрация"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignInLink;
