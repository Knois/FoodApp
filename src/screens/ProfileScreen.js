import { View, Text, TouchableOpacity } from "react-native";
import React, { useContext, useState, useLayoutEffect } from "react";
import * as SecureStore from "expo-secure-store";
import { Ionicons } from "@expo/vector-icons";
import Modal from "react-native-modal";

import ScreenHeader from "../components/ScreenHeader";
import { AppContext } from "../context/AppContext";
import { MAIN, SECONDARY } from "../constants/Constants";
import UpdateUserForm from "../components/UpdateUserForm";

const ProfileScreen = () => {
  const { setAuth } = useContext(AppContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const [isVisible, setVisible] = useState(false);

  const toggleModal = () => {
    setVisible(!isVisible);
  };

  const deleteToken = async () => {
    await SecureStore.deleteItemAsync("token");
  };

  const signOut = () => {
    deleteToken().then(setAuth(false));
  };

  const getToken = async () => {
    const userToken = await SecureStore.getItemAsync("token");
    return userToken;
  };

  const getUser = async () => {
    const token = await getToken();

    try {
      const response = await fetch(
        "http://80.87.201.75:8079/gateway/auth/user",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      const json = await response.json();
      if (json) {
        setName(json.name);
        setEmail(json.email);
        setBirthday(json.birthday);
      }
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  const updateUser = async (obj) => {
    const token = await getToken();

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
        console.log(json.id);
        await getUser();
        toggleModal();
      }
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  useLayoutEffect(async () => {
    await getUser();
  }, []);

  return (
    <>
      <View style={{ flex: 1 }}>
        <ScreenHeader
          canGoBack={false}
          title="Профиль"
          action={toggleModal}
          rightIcon="pencil"
        />
        <View style={{ margin: 10, flex: 1 }}>
          <View
            style={{
              marginVertical: 5,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ color: MAIN }}>Имя:</Text>
            <Text style={{ color: MAIN, fontWeight: "bold" }}>{name}</Text>
          </View>
          <View
            style={{
              marginVertical: 5,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ color: MAIN }}>Email:</Text>
            <Text style={{ color: MAIN, fontWeight: "bold" }}>{email}</Text>
          </View>
          <View
            style={{
              marginVertical: 5,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ color: MAIN }}>Дата рождения:</Text>
            <Text style={{ color: MAIN, fontWeight: "bold" }}>{birthday}</Text>
          </View>
        </View>

        <TouchableOpacity /*                                 Кнопка выхода из профиля      */
          style={{
            borderWidth: 2,
            borderColor: SECONDARY,
            marginTop: 25,
            marginBottom: 50,
            flexDirection: "row",
            backgroundColor: MAIN,
            justifyContent: "center",
            alignSelf: "center",
            padding: 10,
            alignItems: "center",
            borderRadius: 20,
            width: "60%",
          }}
          onPress={signOut}
        >
          <Ionicons name="ios-power" size={30} color="#FFF" />
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
        </TouchableOpacity>
      </View>

      <Modal /*                                 Модальное окно c редактированием профиля      */
        hideModalContentWhileAnimating={true}
        onBackButtonPress={() => {
          toggleModal();
        }}
        onBackdropPress={() => null}
        isVisible={isVisible}
        animationIn="slideInUp"
        animationInTiming={1000}
        animationOutTiming={1000}
        backdropOpacity={0.7}
        backdropTransitionInTiming={1000}
        backdropTransitionOutTiming={1000}
        style={{ width: "95%", alignSelf: "center" }}
      >
        <UpdateUserForm
          params={{ name, birthday, email }}
          action={updateUser}
        />
        <TouchableOpacity
          style={{
            backgroundColor: "#645fb1",
            padding: 10,
            alignItems: "center",
          }}
          onPress={() => {
            toggleModal();
          }}
        >
          <Text style={{ color: "white" }}>Назад</Text>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

export default ProfileScreen;
