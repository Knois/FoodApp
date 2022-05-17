import { TouchableOpacity, Text, View } from "react-native";
import React from "react";

const SignInLink = ({ navigation, formType }) => {
  return (
    <View style={{ flexDirection: "row", justifyContent: "center" }}>
      <Text style={{ color: SECONDARY }}>
        {formType == "signUp"
          ? "Already have an account? "
          : "Don't have an account? "}
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
        <Text style={{ color: SECONDARY_DARK, fontWeight: "bold" }}>
          {formType == "signUp" ? "Log in" : "Sign up"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignInLink;
