import { View, Text, TouchableOpacity, TextInput } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

import { MAIN } from "../../constants/Constants";

const ProfileInput = ({ title, value, setValue, defaultValue, action }) => {
  return (
    <View
      style={{
        marginVertical: 5,
      }}
    >
      <Text style={{ color: MAIN }}>{title}:</Text>
      <View
        style={{
          marginVertical: 10,
          flexDirection: "row",
          justifyContent: "center",
          alignSelf: "center",
          width: "52%",
          borderBottomWidth: 1,
          borderBottomColor: MAIN,
        }}
      >
        <View
          style={{
            alignSelf: "center",
            flex: 2,
          }}
        >
          {defaultValue != value && (
            <TouchableOpacity
              style={{ alignSelf: "center" }}
              onPress={() => {
                setValue(defaultValue);
              }}
            >
              <Ionicons name="close-outline" size={30} color="red" />
            </TouchableOpacity>
          )}
        </View>
        <TextInput
          maxLength={5}
          keyboardType="numeric"
          onChangeText={(text) => setValue(text)}
          value={value ? String(value) : ""}
          style={{
            height: 40,
            color: MAIN,
            fontWeight: "bold",
            flex: 8,
            alignSelf: "center",
            textAlign: "center",
          }}
        />
        <View
          style={{
            alignSelf: "center",
            flex: 2,
          }}
        >
          {defaultValue != value && (
            <TouchableOpacity
              style={{ alignSelf: "center" }}
              onPress={() => {
                action();
              }}
            >
              <Ionicons name="checkmark" size={30} color="green" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export default ProfileInput;
