import {
  Text,
  TextInput,
  View,
  Button,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import Modal from "react-native-modal";
import DatePicker from "react-native-modern-datepicker";

import { serverAddress, token } from "../constants/Constants";
import { timeNow, toNormalDate } from "../methods/DateMethods";
import { getSumCaloriesFromArray } from "../methods/InformationMethods";
import MealEl from "../components/MealEl";
import ScreenHeader from "../components/ScreenHeader";

const MealScreen = ({ navigation, route }) => {
  const mealToObj = (date_time, meal_type, name, meal_elements, ID) => {
    if (ID) {
      return {
        date_time: date_time,
        meal_type: meal_type,
        name: name ? name.trim() : "Без названия",
        meal_elements: meal_elements,
        id: ID,
      };
    } else {
      return {
        date_time: date_time,
        meal_type: meal_type,
        name: name ? name.trim() : "Без названия",
        meal_elements: meal_elements,
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

  const createMeal = async (date_time, meal_type, name, meal_elements) => {
    try {
      const response = await fetch(serverAddress + "/v1.0/meal", {
        method: "POST",
        headers: {
          Authorization: "Basic " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          mealToObj(date_time, meal_type, name, meal_elements)
        ),
      });
      const json = await response.json();
      setID(json.id);
    } catch (error) {
      console.error("Сервер прислал ошибку");
    } finally {
    }
  };

  const updateMeal = async (date_time, meal_type, name, meal_elements, ID) => {
    try {
      const response = await fetch(serverAddress + "/v1.0/meal", {
        method: "PUT",
        headers: {
          Authorization: "Basic " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          mealToObj(date_time, meal_type, name, meal_elements, ID)
        ),
      });
      const json = await response.json();
    } catch (error) {
      console.error("Сервер прислал ошибку");
    } finally {
    }
  };

  const toggleModal = () => {
    setVisible(!isVisible);
  };

  const urlDate = route.params.urlDate;

  const [ID, setID] = useState(route.params.mealID);
  const [meal_type, setMeal_type] = useState(
    route.params.meal_type ? route.params.meal_type : "BREAKFAST"
  );
  const [date_time, setDate_time] = useState(
    route.params.date_time
      ? toNormalDate(route.params.date_time)
      : urlDate + " " + timeNow() + ":00"
  );
  const [name, setName] = useState(route.params.name ? route.params.name : "");
  const [meal_elements, setMeal_elements] = useState(
    route.params.meal_elements ? route.params.meal_elements : []
  );

  const [isVisible, setVisible] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);

  let buttonTitle = ID ? "Обновить прием пищи" : "Создать прием пищи";

  const mealTypes = ["BREAKFAST", "LUNCH", "DINNER", "SUPPER", "LATE_SUPPER"];

  return (
    <View style={{ flex: 1 }}>
      <ScreenHeader
        canGoBack={true}
        title={route.params.mealID ? "Прием пищи" : "Создание приема пищи"}
        action="none"
      />
      <View style={{ margin: 10, flex: 1 }}>
        <TextInput
          style={{
            textAlign: "center",
            borderWidth: 0.5,
            borderRadius: 5,
            borderColor: "#645fb1",
            alignSelf: "center",
            width: "100%",
            height: 40,
            paddingHorizontal: 10,
            paddingVertical: 5,
            color: "#645fb1",
            fontWeight: name.length == 0 ? "normal" : "bold",
          }}
          onChangeText={(value) => {
            setName(value);
          }}
          value={name}
          placeholder="Введите название приема пищи"
        />
        <View
          style={{
            marginVertical: 20,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#645fb1" }}>Тип приема пищи:</Text>
          <TouchableOpacity
            onPress={() => {
              setShowCalendar(false);
              toggleModal();
            }}
            style={{
              borderWidth: 0.5,
              padding: 5,
              borderRadius: 5,
              borderColor: "#645fb1",
              width: 150,
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
          <TouchableOpacity
            onPress={() => {
              setShowCalendar(true);
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
              {date_time}
            </Text>
          </TouchableOpacity>
        </View>

        <Text>Дата и время:</Text>
        <TextInput
          style={{
            borderWidth: 0.5,
            backgroundColor: "#f9f2d9d9",
            alignSelf: "center",
          }}
          onChangeText={(value) => {
            setDate_time(value);
          }}
          value={date_time}
        />
        {ID ? (
          <Text>MEAL ID присвоен:{ID}</Text>
        ) : (
          <Text>MEAL ID не присвоен</Text>
        )}
        <Text>Сумма калорий: {+getSumCaloriesFromArray(meal_elements)}</Text>
        <FlatList
          style={{ height: "50%" }}
          data={meal_elements}
          keyExtractor={(item, index) => index}
          renderItem={({ item, index }) => {
            return (
              <MealEl
                item={item}
                index={index}
                updateMealElement={updateMealElement}
                deleteMealElement={deleteMealElement}
                navigation={navigation}
              />
            );
          }}
        />
        <Button
          title="Добавить элемент приема пищи"
          onPress={() => {
            navigation.navigate("MealElementScreen", {
              action: addMealElement,
            });
          }}
        />
        <Button
          title={buttonTitle}
          onPress={() => {
            ID
              ? updateMeal(date_time, meal_type, name, meal_elements, ID)
              : createMeal(date_time, meal_type, name, meal_elements);
          }}
        />
      </View>
      <Modal /*                                 Модальное окно, которое откроет либо выбор meal_type, либо календарь       */
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
        backdropTransitionInTiming={1}
        backdropTransitionOutTiming={1}
      >
        {showCalendar ? (
          <DatePicker
            /*onDateChange={(date) => {
            if (dateFormatted(date) == urlDate) {
              getAllMeals();
              toggleModal();
            }
            if (dateFormatted(date) !== urlDate) {
              setUrlDate(dateFormatted(date));
              toggleModal();
            }
          }}*/
            minimumDate="2022-01-01"
            maximumDate="2025-01-01"
            current={urlDate}
            selected={urlDate}
            mode="time"
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
        ) : (
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
        )}
      </Modal>
    </View>
  );
};

export default MealScreen;
