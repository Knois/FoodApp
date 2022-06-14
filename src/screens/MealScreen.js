import { Text, View, FlatList, TouchableOpacity, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import Modal from "react-native-modal";
import { Ionicons } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";
import DatePicker from "react-native-modern-datepicker";
import { useSelector, useDispatch } from "react-redux";

import {
  dateToNormalDate,
  dateToNotNormalDate,
  timeNow,
} from "../methods/DateMethods";
import { getSumCaloriesFromArray } from "../methods/InformationMethods";
import BackModalButton from "../components/BackModalButton";
import TitleModal from "../components/TitleModal";
import LoadingIndicator from "../components/LoadingIndicator";
import ContainerMealElement from "../components/ContainerMealElement";
import ScreenHeader from "../components/ScreenHeader";
import { mealTypes } from "../constants/Constants";
import {
  setNeedRefreshFalse,
  setNeedRefreshTrue,
} from "../redux/slices/needRefreshSlice";

const MealScreen = ({ navigation, route }) => {
  const urlDate = route.params.urlDate;
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token.value);
  const needRefresh = useSelector((state) => state.needRefresh.value);

  const [meal_type, setMeal_type] = useState(
    route.params.meal_type ? route.params.meal_type : "BREAKFAST"
  );
  const [date, setDate] = useState(
    route.params.date_time
      ? dateToNormalDate(route.params.date_time)
      : dateToNormalDate(urlDate)
  );
  const [time, setTime] = useState(
    route.params.date_time ? timeNow(route.params.date_time) : timeNow()
  );

  const [meal_elements, setMeal_elements] = useState(
    route.params.mealElements ? route.params.mealElements : []
  );
  const [mealID, setMealID] = useState(route.params.mealID);

  const [isVisible, setVisible] = useState(false);
  const [isVisibleDate, setVisibleDate] = useState(false);
  const [isVisibleTime, setVisibleTime] = useState(false);
  const [isLoading, setLoading] = useState(false);

  let arrBase64 = [];

  const toggleModal = () => {
    setVisible(!isVisible);
  };

  const toggleModalDate = () => {
    setVisibleDate(!isVisibleDate);
  };

  const toggleModalTime = () => {
    setVisibleTime(!isVisibleTime);
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
    let obj = mealID
      ? {
          date_time: dateToNotNormalDate(date) + " " + time + ":00",
          meal_type: meal_type,
          id: mealID,
        }
      : {
          date_time: dateToNotNormalDate(date) + " " + time + ":00",
          meal_type: meal_type,
        };

    return obj;
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
    if (!isLoading) setLoading(true);
    let obj = mealToObj();

    try {
      const response = await fetch(
        "http://80.87.201.75:8079/gateway/my-food/meal",
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(obj),
        }
      );
      const json = await response.json();
      if (json.id) {
        setMealID(json.id);
        await arrUrlToBase64(json.id);
        for (let el of arrBase64) {
          await createMealElement(el);
        }
        navigation.goBack();
        dispatch(setNeedRefreshTrue());
      }
    } catch (error) {
      setLoading(false);
      createErrorAlert("Ошибка при создании приема пищи!");
    } finally {
    }
  };

  const updateMeal = async () => {
    if (!isLoading) setLoading(true);
    let obj = mealToObj();

    try {
      const response = await fetch(
        "http://80.87.201.75:8079/gateway/my-food/meal",
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
      if (json.id) {
        navigation.goBack();
        dispatch(setNeedRefreshTrue());
      }
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
        setLoading(false);
      }
    } catch (error) {
      createErrorAlert("Ошибка при получении элементов приема пищи c сервера");
      setLoading(false);
    } finally {
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
        dispatch(setNeedRefreshTrue());
      }
    } catch (error) {
      setLoading(false);
      createErrorAlert("Ошибка при удалении элемента приема пищи!");
    } finally {
    }
  };

  useEffect(() => {
    if (needRefresh) {
      getMealElements(mealID);
      dispatch(setNeedRefreshFalse());
    }
  }, [needRefresh]);

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
              <Text style={{ color: "#645fb1" }}>Дата:</Text>
              <TouchableOpacity /*                                 Открывает модальное окно с выбором даты*/
                onPress={() => {
                  toggleModalDate();
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
                  {date}
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
              <Text style={{ color: "#645fb1" }}>Время:</Text>
              <TouchableOpacity /*                                 Открывает модальное окно с выбором времени*/
                onPress={() => {
                  toggleModalTime();
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
                  {time}
                </Text>
              </TouchableOpacity>
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
          <Modal //Модальное окно с календарем
            hideModalContentWhileAnimating={true}
            onBackButtonPress={() => {
              toggleModalDate();
            }}
            onBackdropPress={() => {
              toggleModalDate();
            }}
            isVisible={isVisibleDate}
            animationIn="slideInUp"
            animationInTiming={500}
            animationOutTiming={500}
            backdropOpacity={0.7}
            backdropTransitionInTiming={1}
            backdropTransitionOutTiming={1}
          >
            <TitleModal title="Укажите дату" />
            <DatePicker
              onDateChange={(date) => {
                setDate(dateToNormalDate(date));
                toggleModalDate();
              }}
              minimumDate="2022-01-01"
              maximumDate="2999-01-01"
              current={dateToNotNormalDate(date)}
              selected={dateToNotNormalDate(date)}
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
            <BackModalButton action={toggleModalDate} />
          </Modal>
          <Modal //Модальное окно с выбором времени
            hideModalContentWhileAnimating={true}
            onBackButtonPress={() => {
              toggleModalTime();
            }}
            onBackdropPress={() => {
              toggleModalTime();
            }}
            isVisible={isVisibleTime}
            animationIn="slideInUp"
            animationInTiming={500}
            animationOutTiming={500}
            backdropOpacity={0.7}
            backdropTransitionInTiming={1}
            backdropTransitionOutTiming={1}
          >
            <TitleModal title="Укажите время" />
            <DatePicker
              onTimeChange={(time) => {
                setTime(time);
                toggleModalTime();
              }}
              mode="time"
              minuteInterval={5}
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
            <BackModalButton action={toggleModalTime} />
          </Modal>
        </>
      )}
    </View>
  );
};

export default MealScreen;
