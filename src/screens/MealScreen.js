import {
  Text,
  TextInput,
  View,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import Modal from "react-native-modal";
import { Ionicons } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";
import { useIsFocused } from "@react-navigation/native";

import { timeNow, toNormalDate } from "../methods/DateMethods";
import { getSumCaloriesFromArray } from "../methods/InformationMethods";
import LoadingIndicator from "../components/LoadingIndicator";
import ContainerMealElement from "../components/ContainerMealElement";
import ScreenHeader from "../components/ScreenHeader";
import { mealTypes } from "../constants/Constants";
import { TokenContext } from "../context/TokenContext";

const MealScreen = ({ navigation, route }) => {
  const { token } = useContext(TokenContext);

  const urlDate = route.params.urlDate;

  const [meal_type, setMeal_type] = useState(
    route.params.meal_type ? route.params.meal_type : "BREAKFAST"
  );
  const [date_time, setDate_time] = useState(
    route.params.date_time
      ? toNormalDate(route.params.date_time)
      : urlDate + " " + timeNow() + ":00"
  );

  const [meal_elements, setMeal_elements] = useState(
    route.params.meal_elements ? route.params.meal_elements : []
  );
  const [mealID, setMealID] = useState(route.params.mealID);

  const [isVisible, setVisible] = useState(false);
  const [isLoading, setLoading] = useState(false);

  let arrBase64 = [];
  let isFocused = useIsFocused();

  const toggleModal = () => {
    setVisible(!isVisible);
  };

  const arrUrlToBase64 = async (id) => {
    let arr = Object.assign([], meal_elements);
    for (let el of arr) {
      if (el.image_url) {
        let image;
        try {
          const { uri } = await FileSystem.downloadAsync(
            el.image_url,
            FileSystem.documentDirectory + "bufferimg.jpg",
            {
              headers: {
                Authorization: "Bearer " + token,
              },
            }
          );
          image = await FileSystem.readAsStringAsync(uri, {
            encoding: "base64",
          });
          await FileSystem.deleteAsync(uri);
          el.image_base64 = image;
          el.image_url = null;
        } catch (err) {
          console.log(err);
        }
      }
      el.meal = {
        id: id,
      };
    }
    arrBase64 = Object.assign([], arr);
  };

  const mealToObj = () => {
    if (mealID) {
      return {
        date_time: date_time,
        meal_type: meal_type,
        id: mealID,
      };
    } else {
      return {
        date_time: date_time,
        meal_type: meal_type,
      };
    }
  };

  const addMealElement = (obj) => {
    let arr = Object.assign([], meal_elements);
    arr = [...arr, obj];
    setMeal_elements(arr);
  };

  const updateMealElement = (obj, index) => {
    let arr = Object.assign([], meal_elements);
    arr.splice(index, 1, obj);
    setMeal_elements(arr);
  };

  const deleteMealElement = (index) => {
    let arr = Object.assign([], meal_elements);
    arr.splice(index, 1);
    setMeal_elements(arr);
  };

  const createErrorAlert = (message) => {
    Alert.alert("Ошибка", message, [{ text: "ОК", onPress: () => null }], {
      cancelable: true,
    });
  };

  const createMeal = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "http://80.87.201.75:8079/gateway/my-food/meal",
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(mealToObj()),
        }
      );
      const json = await response.json();
      if (json.id) {
        setMealID(json.id);
        await arrUrlToBase64(json.id);
        for (let el of arrBase64) {
          await createMealElement(el);
        }
        await getMealElements(json.id);
      }
    } catch (error) {
      createErrorAlert("Ошибка при создании приема пищи!");
    } finally {
      setLoading(false);
    }
  };

  const updateMeal = async () => {
    setLoading(true);

    try {
      const response = await fetch(
        "http://80.87.201.75:8079/gateway/my-food/meal",
        {
          method: "PUT",
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(mealToObj()),
        }
      );
      const json = await response.json();
      navigation.goBack();
    } catch (error) {
      setLoading(false);
      createErrorAlert("Ошибка при обновлении приема пищи");
    } finally {
    }
  };

  const createMealElement = async (mealElement) => {
    try {
      const response = await fetch(
        "http://80.87.201.75:8079/gateway/my-food/meal_element",
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(mealElement),
        }
      );
      const json = await response.json();
      if (json) {
      }
    } catch (error) {
      createErrorAlert(
        "Ошибка при создании элемента приема пищи:\n\n" + mealElement.name
      );
    } finally {
    }
  };

  const getMealElements = async (mealID) => {
    if (!isLoading) setLoading(true);

    try {
      const response = await fetch(
        "http://80.87.201.75:8079/gateway/my-food/meal_element?mealId=" +
          mealID +
          "&page=0&size=999",
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );
      const json = await response.json();
      if (json.content) {
        setMeal_elements(json.content);
      }
    } catch (error) {
      createErrorAlert("Ошибка при получении элементов приема пищи c сервера");
    } finally {
      setLoading(false);
    }
  };

  const deleteMealElementFromServer = async (mealElementID) => {
    if (!isLoading) setLoading(true);

    try {
      const response = await fetch(
        "http://80.87.201.75:8079/gateway/my-food/meal_element/" +
          mealElementID,
        {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status == 200) {
        getMealElements(mealID);
      }
    } catch (error) {
      setLoading(false);
      createErrorAlert("Ошибка при удалении элемента приема пищи!");
    } finally {
    }
  };

  useEffect(() => {
    if (mealID && isFocused) getMealElements(mealID);
  }, [isFocused]);

  return (
    <View style={{ flex: 1 }}>
      {isLoading ? (
        <LoadingIndicator />
      ) : (
        <>
          <ScreenHeader /*                                 Шапка*/
            canGoBack={true}
            title={mealID ? "Прием пищи" : "Создание приема пищи"}
            action={mealID ? updateMeal : createMeal}
            rightIcon="checkmark"
          />
          <View style={{ margin: 10, flex: 1 }}>
            <View
              style={{
                marginVertical: 20,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "#645fb1" }}>Тип приема пищи:</Text>
              <TouchableOpacity /*                                 Открывает модальное окно с выбором meal_type*/
                onPress={() => {
                  toggleModal();
                }}
                style={{
                  borderWidth: 0.5,
                  padding: 5,
                  borderRadius: 5,
                  borderColor: "#645fb1",
                  width: 200,
                  height: 40,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ color: "#645fb1", fontWeight: "bold" }}>
                  {meal_type}
                </Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                marginVertical: 10,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "#645fb1" }}>Дата и время:</Text>
              <TextInput /*                                                   Ввод даты и времени приема пищи*/
                style={{
                  textAlign: "center",
                  borderWidth: 0.5,
                  borderRadius: 5,
                  borderColor: "#645fb1",
                  alignSelf: "center",
                  width: 200,
                  height: 40,
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  color: "#645fb1",
                  fontWeight: "bold",
                }}
                onChangeText={(text) => {
                  setDate_time(text);
                }}
                value={date_time}
                keyboardType="numeric"
              />
            </View>
            <View
              style={{
                marginVertical: 10,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "#645fb1", fontWeight: "bold" }}>
                Сумма калорий: {+getSumCaloriesFromArray(meal_elements)}
              </Text>
            </View>
            <FlatList /*                                                    Список элементов приема пищи*/
              style={{ marginBottom: 10, flex: 1 }}
              data={meal_elements}
              keyExtractor={(item, index) => index}
              renderItem={({ item, index }) => {
                return (
                  <ContainerMealElement
                    item={item}
                    index={index}
                    updateMealElement={updateMealElement}
                    deleteMealElement={
                      mealID ? deleteMealElementFromServer : deleteMealElement
                    }
                    navigation={navigation}
                  />
                );
              }}
            />
            <TouchableOpacity /*                                                    Кнопка добавления элементов приема пищи*/
              style={{
                backgroundColor: "#d8d6ed",
                width: 50,
                height: 50,
                alignItems: "center",
                justifyContent: "center",
                alignSelf: "center",
                marginBottom: 20,
                borderRadius: 10,
                margin: 5,
              }}
              onPress={() => {
                navigation.navigate("MealElementScreen", {
                  action: addMealElement,
                  mealID: mealID,
                });
              }}
            >
              <Ionicons name="add-outline" size={40} color="#645fb1" />
            </TouchableOpacity>
          </View>
          <Modal /*                                 Модальное окно, которое откроет выбор meal_type*/
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
              {mealTypes.map((el) => {
                return (
                  <TouchableOpacity
                    key={Math.random() * 9999}
                    style={{
                      height: 50,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    onPress={() => {
                      setMeal_type(el);
                      toggleModal();
                    }}
                  >
                    <Text>{el}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </Modal>
        </>
      )}
    </View>
  );
};

export default MealScreen;
