import { View, Text, TouchableOpacity, FlatList } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import Modal from "react-native-modal";

import { MAIN } from "../../constants/Constants";

const ProfileArrayPicker = ({
  title,
  value,
  setValue,
  defaultValue,
  action,
  data,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleModal = () => {
    setIsVisible(!isVisible);
  };

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
        <View style={{ flex: 8 }}>
          <TouchableOpacity
            onPress={() => {
              toggleModal();
            }}
            style={{
              alignSelf: "center",
              alignItems: "center",
              justifyContent: "center",
              borderWidth: 1,
              borderRadius: 10,
              borderColor: MAIN,
              height: 40,
              width: "100%",
            }}
          >
            <Text
              style={{
                color: MAIN,
                fontWeight: "bold",
              }}
            >
              {value ? String(value) : ""}
            </Text>
          </TouchableOpacity>
        </View>
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
      <Modal /*                                 ?????????????????? ????????, ?????????????? ?????????????? ?????????? meal_type*/
        hideModalContentWhileAnimating={true}
        onBackButtonPress={() => {
          toggleModal();
        }}
        onBackdropPress={() => {
          toggleModal();
        }}
        isVisible={isVisible}
        animationIn="pulse"
        animationOut="slideOutUp"
        animationInTiming={500}
        animationOutTiming={500}
        backdropOpacity={0.7}
        backdropTransitionInTiming={500}
        backdropTransitionOutTiming={1}
      >
        <View
          style={{
            width: 200,
            backgroundColor: "white",
            alignSelf: "center",
            borderRadius: 20,
          }}
        >
          <FlatList
            data={data}
            keyExtractor={(item) => {
              return Math.random() * 9999;
            }}
            renderItem={(item) => (
              <TouchableOpacity
                style={{
                  height: 50,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={() => {
                  setValue(item.item);
                  toggleModal();
                }}
              >
                <Text>{item.item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal>
    </View>
  );
};

export default ProfileArrayPicker;
