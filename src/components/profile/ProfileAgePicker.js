import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import DatePicker from "react-native-modern-datepicker";
import Modal from "react-native-modal";

import { MAIN } from "../../constants/Constants";
import BackModalButton from "../BackModalButton";
import { birthdayToAge, dateFormatted } from "../../methods/DateMethods";
import TitleModal from "../TitleModal";

const ProfileAgePicker = ({ title, value, setValue, defaultValue, action }) => {
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
              width: "80%",
            }}
          >
            <Text
              style={{
                color: MAIN,
                fontWeight: "bold",
              }}
            >
              {value ? birthdayToAge(value) : ""}
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
      <Modal /*                                 Модальное окно с календарем       */
        hideModalContentWhileAnimating={true}
        onBackButtonPress={() => {
          toggleModal();
        }}
        onBackdropPress={() => {
          toggleModal();
        }}
        isVisible={isVisible}
        animationIn="slideInUp"
        animationInTiming={500}
        animationOutTiming={500}
        backdropOpacity={0.7}
        backdropTransitionInTiming={500}
        backdropTransitionOutTiming={500}
      >
        <TitleModal title="Укажите дату рождения" />
        <DatePicker
          onDateChange={(date) => {
            setValue(dateFormatted(date));
            toggleModal();
          }}
          minimumDate="1920-01-01"
          maximumDate={"2999-01-01"}
          current={value}
          selected={value}
          mode="calendar"
          options={{
            headerAnimationDistance: 100,
            daysAnimationDistance: 100,
            textHeaderColor: "#645fb1",
            textDefaultColor: "#645fb1",
            selectedTextColor: "white",
            mainColor: "#645fb1",
            textSecondaryColor: "#645fb1",
            borderColor: "#645fb1",
          }}
        />
        <BackModalButton action={toggleModal} />
      </Modal>
    </View>
  );
};

export default ProfileAgePicker;
