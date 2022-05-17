import { TouchableOpacity, Text } from "react-native";
import React from "react";
import { MAIN } from "../../constants/Constants";

const SignInButton = ({ handleSubmit, formType }) => {
  return (
    <TouchableOpacity
      style={{
        marginVertical: 40,
        padding: 20,
        alignItems: "center",
        backgroundColor: MAIN,
        borderRadius: 20,
      }}
      onPress={handleSubmit}
    >
      {formType == "signUp" ? (
        <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 15 }}>
          Зарегистрироваться
        </Text>
      ) : (
        <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 15 }}>
          Войти
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default SignInButton;
