import { View, Alert, Text } from "react-native";
import React, { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useDispatch, useSelector } from "react-redux";

import ScreenHeader from "../components/ScreenHeader";
import {
  genderArray,
  MAIN,
  physicalActivityLevelArray,
  targetWeightTypeArray,
} from "../constants/Constants";
import ProfileInput from "../components/profile/ProfileInput";
import ProfileArrayPicker from "../components/profile/ProfileArrayPicker";
import ProfileAgePicker from "../components/profile/ProfileAgePicker";
import { setUserInfoProperties } from "../redux/slices/auth/userInfoProperties";
import ProfileObjPicker from "../components/profile/ProfileObjPicker";
import {
  getBodyMassIndex,
  getRecommendedCaloriesPerDay,
} from "../methods/InformationMethods";

const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token.value);
  const userInfo = useSelector((state) => state.userInfo.value);
  const userInfoProperties = useSelector(
    (state) => state.userInfoProperties.value
  );

  const [gender, setGender] = useState(
    userInfo ? userInfoProperties.gender : ""
  );
  const [weight, setWeight] = useState(
    userInfo ? userInfoProperties.weight : "0"
  );
  const [height, setHeight] = useState(
    userInfo ? userInfoProperties.height : "0"
  );
  const [birthday, setBirthday] = useState(
    userInfo ? userInfoProperties.birthday : ""
  );
  const [physicalActivityLevel, setPhysicalActivityLevel] = useState(
    userInfo ? userInfoProperties.physicalActivityLevel : ""
  );
  const [targetWeight, setTargetWeight] = useState(
    userInfo ? userInfoProperties.targetWeight : "0"
  );
  const [targetWeightType, setTargetWeightType] = useState(
    userInfo ? userInfoProperties.targetWeightType : ""
  );
  const [dayLimitCal, setDayLimitCal] = useState(
    userInfo ? userInfoProperties.dayLimitCal : "0"
  );

  let bodyMassIndex = getBodyMassIndex(weight, height);
  let recommendedCaloriesPerDay = getRecommendedCaloriesPerDay(
    gender,
    weight,
    height,
    birthday,
    physicalActivityLevel
  );
  let recommendedLimit = Math.round(
    recommendedCaloriesPerDay * targetWeightType
  );

  const createErrorAlert = (message) => {
    Alert.alert("Ошибка", message, [{ text: "ОК", onPress: () => null }], {
      cancelable: true,
    });
  };

  const getUserInfoProperties = async () => {
    try {
      const response = await fetch(
        "http://80.87.201.75:8079/gateway/my-food/user_profile",
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );

      const json = await response.json();
      if (json) {
        dispatch(setUserInfoProperties(json));
      }
    } catch (error) {
    } finally {
    }
  };

  const updateUserInfoProperties = async (obj) => {
    try {
      const response = await fetch(
        "http://80.87.201.75:8079/gateway/my-food/user_profile",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify(obj),
        }
      );
      const json = await response.json();

      if (json) {
        getUserInfoProperties();
      }
    } catch (error) {
      createErrorAlert("Ошибка при обновлении профиля");
    } finally {
    }
  };

  const goToSettingsScreen = () => {
    navigation.navigate("SettingsScreen");
  };

  return (
    <>
      <View style={{ flex: 1 }}>
        <ScreenHeader
          canGoBack={false}
          title="Профиль"
          action={goToSettingsScreen}
          rightIcon="settings-outline"
        />
        <KeyboardAwareScrollView
          style={{ margin: 10, flex: 1, paddingHorizontal: 10 }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginVertical: 5,
              alignItems: "center",
            }}
          >
            <Text style={{ color: MAIN }}>Email:</Text>
            <Text style={{ color: MAIN, fontWeight: "bold" }}>
              {userInfo.email}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginVertical: 5,
              alignItems: "center",
            }}
          >
            <Text style={{ color: MAIN }}>Имя:</Text>
            <Text style={{ color: MAIN, fontWeight: "bold" }}>
              {userInfo.name}
            </Text>
          </View>
          <ProfileArrayPicker
            title="Пол"
            value={gender}
            setValue={setGender}
            defaultValue={userInfoProperties.gender}
            action={() => {
              updateUserInfoProperties({ gender });
            }}
            data={genderArray}
          />
          <ProfileInput
            title="Вес (кг)"
            value={weight}
            setValue={setWeight}
            defaultValue={userInfoProperties.weight}
            action={() => {
              updateUserInfoProperties({ weight });
            }}
          />
          <ProfileInput
            title="Рост (см)"
            value={height}
            setValue={setHeight}
            defaultValue={userInfoProperties.height}
            action={() => {
              updateUserInfoProperties({ height });
            }}
          />
          <ProfileAgePicker
            title="Возраст"
            value={birthday}
            setValue={setBirthday}
            defaultValue={userInfoProperties.birthday}
            action={() => {
              updateUserInfoProperties({ birthday });
            }}
          />
          <ProfileObjPicker
            title="Уровень активности"
            value={String(physicalActivityLevel)}
            setValue={setPhysicalActivityLevel}
            defaultValue={userInfoProperties.physicalActivityLevel}
            action={() => {
              updateUserInfoProperties({ physicalActivityLevel });
            }}
            data={physicalActivityLevelArray}
          />
          <ProfileInput
            title="Цель (кг)"
            value={targetWeight}
            setValue={setTargetWeight}
            defaultValue={userInfoProperties.targetWeight}
            action={() => {
              updateUserInfoProperties({ targetWeight });
            }}
          />
          <ProfileObjPicker
            title="Тип достижения цели"
            value={String(targetWeightType)}
            setValue={setTargetWeightType}
            defaultValue={userInfoProperties.targetWeightType}
            action={() => {
              updateUserInfoProperties({ targetWeightType });
            }}
            data={targetWeightTypeArray}
          />
          <ProfileInput
            title="Ежедневный лимит калорий (ккал)"
            value={dayLimitCal}
            setValue={setDayLimitCal}
            defaultValue={userInfoProperties.dayLimitCal}
            action={() => {
              updateUserInfoProperties({ dayLimitCal });
            }}
            limit={5}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginVertical: 5,
              alignItems: "center",
            }}
          >
            <Text style={{ color: MAIN, width: "60%" }}>
              Рекомендованный лимит:
            </Text>
            <Text style={{ color: MAIN, fontWeight: "bold" }}>
              {recommendedLimit}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginVertical: 5,
              alignItems: "center",
            }}
          >
            <Text style={{ color: MAIN, width: "60%" }}>
              Суточная норма калорий:
            </Text>
            <Text style={{ color: MAIN, fontWeight: "bold" }}>
              {recommendedCaloriesPerDay}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "column",
              marginVertical: 5,
            }}
          >
            <Text style={{ color: MAIN, width: "60%" }}>
              ИМТ (Индекс массы тела):
            </Text>
            <Text
              style={{ color: MAIN, fontWeight: "bold", alignSelf: "flex-end" }}
            >
              {bodyMassIndex}
            </Text>
          </View>
        </KeyboardAwareScrollView>
      </View>
    </>
  );
};

export default ProfileScreen;
