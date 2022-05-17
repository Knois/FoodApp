import { TouchableOpacity, Text } from "react-native";
import React from "react";

const SignInButton = ({ handleSubmit, formType }) => {
  return (
    <TouchableOpacity style={style.signInButton} onPress={handleSubmit}>
      {formType == "signUp" ? (
        <Text style={style.signInButtonText}>Sign Up</Text>
      ) : (
        <Text style={style.signInButtonText}>Log In</Text>
      )}
    </TouchableOpacity>
  );
};

export default SignInButton;
