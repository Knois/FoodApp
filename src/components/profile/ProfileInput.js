import { View, Text, TouchableOpacity, TextInput } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

import { MAIN } from "../../constants/Constants";

const ProfileInput = ({
  title,
  value,
  setValue,
  defaultValue,
  action,
  noEdit,
}) => {
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
          width: "100%",
          borderBottomWidth: noEdit ? 0 : 1,
          borderBottomColor: MAIN,
        }}
      >
        <View
          style={{
            alignSelf: "center",
            flex: 2,
          }}
        ></View>
        <TextInput
          editable={!noEdit}
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
              onPress={() => {
                action();
              }}
            >
              <Ionicons name="checkmark" size={40} color="#645fb1" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export default ProfileInput;
