import { View, Alert, Text } from "react-native";
import React, { useContext, useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useDispatch, useSelector } from "react-redux";

import { setUserInfo } from "../redux/slices/auth/userInfoSlice";

import ScreenHeader from "../components/ScreenHeader";
import {
  genderArray,
  MAIN,
  physicalActivityLevelArray,
  targetWeightTypeArray,
} from "../constants/Constants";
import { TokenContext } from "../context/TokenContext";
import ProfileInput from "../components/profile/ProfileInput";
import ProfileArrayPicker from "../components/profile/ProfileArrayPicker";

const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const userInfo = useSelector((state) => state.userInfo.value);

  const { token } = useContext(TokenContext);

  const [gender, setGender] = useState(
    userInfo ? userInfo.user_properties.gender : ""
  );
  const [weight, setWeight] = useState(
    userInfo ? userInfo.user_properties.weight : "0"
  );
  const [height, setHeight] = useState(
    userInfo ? userInfo.user_properties.height : "0"
  );
  const [birthday, setBirthday] = useState(
    userInfo ? userInfo.user_properties.birthday : ""
  );
  const [physicalActivityLevel, setPhysicalActivityLevel] = useState(
    userInfo ? userInfo.user_properties.physicalActivityLevel : ""
  );
  const [targetWeight, setTargetWeight] = useState(
    userInfo ? userInfo.user_properties.targetWeight : "0"
  );
  const [targetWeightType, setTargetWeightType] = useState(
    userInfo ? userInfo.user_properties.targetWeightType : ""
  );
  const [dayLimitCal, setDayLimitCal] = useState(
    userInfo ? userInfo.user_properties.dayLimitCal : "0"
  );

  const createErrorAlert = (message) => {
    Alert.alert("Ошибка", message, [{ text: "ОК", onPress: () => null }], {
      cancelable: true,
    });
  };

  const getUserInfo = async () => {
    try {
      const response = await fetch(
        "http://80.87.201.75:8079/gateway/auth/user",
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
        dispatch(setUserInfo(json));
      }
    } catch (error) {
    } finally {
    }
  };

  const updateUser = async (obj) => {
    try {
      const response = await fetch(
        "http://80.87.201.75:8079/gateway/auth/user",
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

      if (json.id) {
        getUserInfo();
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
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ color: MAIN }}>Имя:</Text>
            <Text style={{ color: MAIN, fontWeight: "bold" }}>
              {userInfo.user_properties.name}
            </Text>
          </View>
          <ProfileArrayPicker
            title="Пол"
            value={gender}
            setValue={setGender}
            defaultValue={userInfo.user_properties.gender}
            action={() => {
              updateUser({ gender });
            }}
            data={genderArray}
          />
          <ProfileInput
            title="Вес (кг)"
            value={weight}
            setValue={setWeight}
            defaultValue={userInfo.user_properties.weight}
            action={() => {
              updateUser({ weight });
            }}
          />
          <ProfileInput
            title="Рост (см)"
            value={height}
            setValue={setHeight}
            defaultValue={userInfo.user_properties.height}
            action={() => {
              updateUser({ height });
            }}
          />
          <ProfileInput
            title="Возраст"
            value={birthday}
            setValue={setBirthday}
            defaultValue={userInfo.user_properties.birthday}
            action={() => {
              updateUser({ birthday });
            }}
          />
          <ProfileArrayPicker
            title="Уровень активности"
            value={physicalActivityLevel}
            setValue={setPhysicalActivityLevel}
            defaultValue={userInfo.user_properties.physicalActivityLevel}
            action={() => {
              updateUser({ physicalActivityLevel });
            }}
            data={physicalActivityLevelArray}
          />
          <ProfileInput
            title="Цель (кг)"
            value={targetWeight}
            setValue={setTargetWeight}
            defaultValue={userInfo.user_properties.targetWeight}
            action={() => {
              updateUser({ targetWeight });
            }}
          />
          <ProfileArrayPicker
            title="Тип достижения цели"
            value={targetWeightType}
            setValue={setTargetWeightType}
            defaultValue={userInfo.user_properties.targetWeightType}
            action={() => {
              updateUser({ targetWeightType });
            }}
            data={targetWeightTypeArray}
          />
          <ProfileInput
            title="Ежедневный лимит калорий (ккал)"
            value={dayLimitCal}
            setValue={setDayLimitCal}
            defaultValue={userInfo.user_properties.dayLimitCal}
            action={() => {
              updateUser({ dayLimitCal });
            }}
          />
        </KeyboardAwareScrollView>
      </View>
    </>
  );
};

export default ProfileScreen;
