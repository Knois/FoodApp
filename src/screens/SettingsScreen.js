import { View, Text, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";

import { Ionicons } from "@expo/vector-icons";
import Modal from "react-native-modal";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo } from "../redux/slices/auth/userInfoSlice";

import { setIsAuthFalse } from "../redux/slices/auth/isAuthSlice";

import ScreenHeader from "../components/ScreenHeader";
import { MAIN, SECONDARY } from "../constants/Constants";

import UpdateUserForm from "../components/profile/UpdateUserForm";
import BackModalButton from "../components/BackModalButton";
import LoadingIndicator from "../components/LoadingIndicator";
import TitleModal from "../components/TitleModal";
import {
  deleteEmailFromStore,
  deletePasswordFromStore,
  deleteTokenFromStore,
  getEmailFromStore,
  getPasswordFromStore,
  getTokenFromStore,
  setEmailToStore,
  setPasswordToStore,
  setTokenToStore,
} from "../methods/SecureStoreMethods";

const SettingsScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const userInfo = useSelector((state) => state.userInfo.value);

  const [isVisible, setIsVisible] = useState(false);
  const [mode, setMode] = useState("");
  const [isLoading, setLoading] = useState(false);

  const toggleModal = () => {
    setIsVisible(!isVisible);
  };

  const setModalMode = (string) => {
    if (string !== mode) setMode(string);
    toggleModal();
  };

  const createErrorAlert = (message) => {
    Alert.alert(
      "Ошибка при запросе на сервер",
      message,
      [{ text: "ОК", onPress: () => null }],
      {
        cancelable: true,
      }
    );
  };

  const createTwoButtonAlert = () =>
    Alert.alert(
      "Выход",
      "Подтверждаете выход из профиля?",
      [
        {
          text: "Отмена",
          style: "cancel",
        },
        { text: "ОК", onPress: () => signOut() },
      ],
      {
        cancelable: true,
      }
    );

  const signOut = () => {
    deleteTokenFromStore();
    dispatch(setIsAuthFalse());
  };

  const updateUserName = async (obj) => {
    if (!isLoading) setLoading(true);
    let token = await getTokenFromStore();

    try {
      const response = await fetch(
        "http://80.87.201.75:8079/gateway/auth/user",
        {
          method: "PUT",
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(obj),
        }
      );

      const json = await response.json();
      if (json) {
        dispatch(setUserInfo(json));
        console.log(json.email);
        await setEmailToStore(json.email);

        setLoading(false);
        toggleModal();
      }
    } catch (error) {
      createErrorAlert("Ошибка при попытке обновить имя");
      setLoading(false);
    } finally {
    }
  };

  const updateUserEmail = async (obj) => {
    if (!isLoading) setLoading(true);
    let token = await getTokenFromStore();

    try {
      const response = await fetch(
        "http://80.87.201.75:8079/gateway/auth/user",
        {
          method: "PUT",
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(obj),
        }
      );

      const json = await response.json();
      if (json.email) {
        setEmailToStore(json.email);
        dispatch(setUserInfo(json));
        await createJwt();
        setLoading(false);
        toggleModal();
      }
    } catch (error) {
      createErrorAlert("Ошибка при попытке обновить email");
      setLoading(false);
    } finally {
    }
  };

  const updateUserPassword = async (obj) => {
    if (!isLoading) setLoading(true);
    let token = await getTokenFromStore();

    try {
      const response = await fetch(
        "http://80.87.201.75:8079/gateway/auth/user",
        {
          method: "PUT",
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(obj),
        }
      );

      const json = await response.json();
      if (json) {
        await setPasswordToStore(obj.password);
        setLoading(false);
        toggleModal();
      }
    } catch (error) {
      createErrorAlert("Ошибка при попытке обновить имя");
      setLoading(false);
    } finally {
    }
  };

  const createJwt = async () => {
    let email = await getEmailFromStore();
    let password = await getPasswordFromStore();
    try {
      const response = await fetch(
        "http://80.87.201.75:8079/gateway/auth/authenticate/jwt",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const json = await response.json();
      if (json.jwt_token) {
        await setTokenToStore(json.jwt_token);
      }
    } catch (error) {
      deleteEmailFromStore();
      deletePasswordFromStore();
      createErrorAlert("Ошибка при получении токена");
      dispatch(setIsAuthFalse());
    } finally {
    }
  };

  const setAction = (obj) => {
    switch (mode) {
      case "name":
        return updateUserName(obj);

      case "email":
        return updateUserEmail(obj);

      case "password":
        return updateUserPassword(obj);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ScreenHeader canGoBack={true} title="Настройки" action="none" />
      <TouchableOpacity /*                                 Кнопка смены имени     */
        style={{
          borderWidth: 2,
          borderColor: MAIN,
          marginVertical: 5,
          flexDirection: "row",
          backgroundColor: SECONDARY,
          justifyContent: "space-between",
          alignSelf: "center",
          padding: 10,
          alignItems: "center",
          borderRadius: 20,
          width: "80%",
          height: 60,
        }}
        onPress={() => {
          setModalMode("name");
        }}
      >
        <View style={{ flex: 2, alignItems: "center" }}>
          <Ionicons name="ios-person-circle-outline" size={30} color={MAIN} />
        </View>
        <View style={{ flex: 10, alignItems: "center" }}>
          <Text
            style={{
              color: MAIN,
              fontWeight: "bold",
              fontSize: 16,
              marginLeft: 10,
              alignSelf: "center",
            }}
          >
            Изменить имя
          </Text>
        </View>
        <View style={{ flex: 2, alignItems: "center" }} />
      </TouchableOpacity>
      <TouchableOpacity /*                                 Кнопка смены email     */
        style={{
          borderWidth: 2,
          borderColor: MAIN,
          marginVertical: 5,
          flexDirection: "row",
          backgroundColor: SECONDARY,
          justifyContent: "space-between",
          alignSelf: "center",
          padding: 10,
          alignItems: "center",
          borderRadius: 20,
          width: "80%",
          height: 60,
        }}
        onPress={() => {
          setModalMode("email");
        }}
      >
        <View style={{ flex: 2, alignItems: "center" }}>
          <Ionicons name="mail-outline" size={30} color={MAIN} />
        </View>
        <View style={{ flex: 10, alignItems: "center" }}>
          <Text
            style={{
              color: MAIN,
              fontWeight: "bold",
              fontSize: 16,
              marginLeft: 10,
            }}
          >
            Изменить email
          </Text>
        </View>
        <View style={{ flex: 2, alignItems: "center" }} />
      </TouchableOpacity>
      <TouchableOpacity /*                                 Кнопка смены пароля     */
        style={{
          borderWidth: 2,
          borderColor: MAIN,
          marginVertical: 5,
          flexDirection: "row",
          backgroundColor: SECONDARY,
          justifyContent: "space-between",
          alignSelf: "center",
          padding: 10,
          alignItems: "center",
          borderRadius: 20,
          width: "80%",
          height: 60,
        }}
        onPress={() => {
          setModalMode("password");
        }}
      >
        <View style={{ flex: 2, alignItems: "center" }}>
          <Ionicons name="ios-key-outline" size={30} color={MAIN} />
        </View>
        <View style={{ flex: 10, alignItems: "center" }}>
          <Text
            style={{
              color: MAIN,
              fontWeight: "bold",
              fontSize: 16,
              marginLeft: 10,
            }}
          >
            Изменить пароль
          </Text>
        </View>
        <View style={{ flex: 2, alignItems: "center" }} />
      </TouchableOpacity>
      <TouchableOpacity /*                                 Кнопка выхода из профиля      */
        style={{
          borderWidth: 2,
          borderColor: SECONDARY,
          marginVertical: 5,
          flexDirection: "row",
          backgroundColor: MAIN,
          justifyContent: "space-between",
          alignSelf: "center",
          padding: 10,
          alignItems: "center",
          borderRadius: 20,
          width: "80%",
          height: 60,
        }}
        onPress={createTwoButtonAlert}
      >
        <View style={{ flex: 2, alignItems: "center" }}>
          <Ionicons name="ios-power" size={30} color="#FFF" />
        </View>
        <View style={{ flex: 10, alignItems: "center" }}>
          <Text
            style={{
              color: "#fff",
              fontWeight: "bold",
              fontSize: 16,
              marginLeft: 10,
            }}
          >
            Выход
          </Text>
        </View>
        <View style={{ flex: 2, alignItems: "center" }} />
      </TouchableOpacity>

      <Modal /*                                 Модальное окно      */
        hideModalContentWhileAnimating={true}
        onBackButtonPress={() => {
          toggleModal();
        }}
        onBackdropPress={() => {
          null;
        }}
        isVisible={isVisible}
        animationIn="slideInUp"
        animationInTiming={500}
        animationOutTiming={500}
        backdropOpacity={0.7}
        backdropTransitionInTiming={1}
        backdropTransitionOutTiming={1}
      >
        {isLoading ? (
          <LoadingIndicator />
        ) : (
          <>
            <TitleModal />
            <UpdateUserForm mode={mode} params={userInfo} action={setAction} />
            <BackModalButton action={toggleModal} />
          </>
        )}
      </Modal>
    </View>
  );
};

export default SettingsScreen;
