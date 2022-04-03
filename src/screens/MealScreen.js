import { Text, TextInput, View, Button, FlatList } from "react-native";
import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { token } from "../API/Constants";
import { currentDate } from "../methods/Simple";
import MealEl from "../components/MealEl";

const url = "http://80.87.193.6:8079/v1.0/meal";

const mealToObj = (date_time, meal_type, name, meal_elements, ID) => {
  if (ID) {
    return {
      date_time: date_time,
      meal_type: meal_type,
      name: name,
      meal_elements: meal_elements,
      id: ID,
    };
  } else {
    return {
      date_time: date_time,
      meal_type: meal_type,
      name: name,
      meal_elements: meal_elements,
    };
  }
};

const MealScreen = ({ navigation, route }) => {
  console.log("Render meal screen");
  const [ID, setID] = useState(route.params.mealID);
  const [meal_type, setMeal_type] = useState("BREAKFAST");
  const [date_time, setDate_time] = useState(currentDate());
  const [name, setName] = useState("name");
  const [meal_elements, setMeal_elements] = useState([]);

  const addMealElement = (obj) => {
    let arr = Object.assign([], meal_elements);
    arr = [...arr, obj];
    setMeal_elements(arr);
  };

  let buttonTitle = ID ? "Обновить прием пищи" : "Создать прием пищи";

  const createMeal = async (date_time, meal_type, name, meal_elements) => {
    try {
      const response = await fetch(url, {
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
      const response = await fetch(url, {
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

  return (
    <View>
      <Text>Тип приема пищи:</Text>
      <Picker
        onValueChange={(itemValue, itemIndex) => {
          setMeal_type(itemValue);
        }}
        selectedValue={meal_type}
      >
        <Picker.Item label="BREAKFAST" value="BREAKFAST" />
        <Picker.Item label="LUNCH" value="LUNCH" />
        <Picker.Item label="DINNER" value="DINNER" />
        <Picker.Item label="SUPPER" value="SUPPER" />
        <Picker.Item label="LATE_SUPPER" value="LATE_SUPPER" />
      </Picker>

      <Text>Название:</Text>
      <TextInput
        style={{
          borderWidth: 0.5,
          backgroundColor: "#f9f2d9d9",
          alignSelf: "center",
        }}
        onChangeText={(value) => {
          setName(value);
        }}
        value={name}
      />
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

      <FlatList
        style={{ height: "50%" }}
        data={meal_elements}
        keyExtractor={(item, index) => index}
        renderItem={({ item, index }) => {
          return <MealEl item={item} index={index} />;
        }}
      />
      <Button
        title="Добавить элемент приема пищи"
        onPress={() => {
          navigation.navigate("MealElementScreen", { action: addMealElement });
        }}
      />
      <Button
        title={buttonTitle}
        onPress={() => {
          if (ID) {
            updateMeal(date_time, meal_type, name, meal_elements, ID);
          } else {
            createMeal(date_time, meal_type, name, meal_elements);
          }
        }}
      />
    </View>
  );
};

export default MealScreen;
