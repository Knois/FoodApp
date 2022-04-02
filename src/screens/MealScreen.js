import { Text, TextInput, View, FlatList } from "react-native";
import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import MealEl from "../components/MealEl";
import { token } from "../../Token";

const url = "http://80.87.193.6:8079/v1.0/meal";

const mealToObj = (date_time, meal_type, name, mealID) => {
  if (mealID) {
    return {
      date_time: date_time,
      meal_type: meal_type,
      name: name,
      id: mealID,
    };
  } else {
    return { date_time: date_time, meal_type: meal_type, name: name };
  }
};

const MealScreen = ({ navigation, route }) => {
  console.log("Render meal screen");
  const [mealID, setMealID] = useState(route.params.mealID);
  const [meal_type, setMeal_type] = useState("BREAKFAST");
  const [date_time, setDate_time] = useState("2021-08-23T14:19:20+03:00");
  const [name, setName] = useState("name");
  const [meal_elements, setMeal_elements] = useState([]);

  const createMeal = async (date_time, meal_type, name) => {
    try {
      console.log("Start fetch POST");
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: "Basic " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mealToObj(date_time, meal_type, name)),
      });
      const json = await response.json();
      setMealID(json.id);
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  const updateMeal = async (date_time, meal_type, name, mealID) => {
    try {
      console.log("Start fetch PUT");
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          Authorization: "Basic " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mealToObj(date_time, meal_type, name, mealID)),
      });
      const json = await response.json();
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  return (
    <View>
      <Text>Тип приема пищи:</Text>
      <Picker
        onValueChange={async (itemValue, itemIndex) => {
          console.log("PICKER SELECT onValueChange start");
          await setMeal_type(itemValue);
          if (!mealID) {
            createMeal(date_time, meal_type, name);
          } else {
            updateMeal(date_time, meal_type, name, mealID);
          }
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

      {mealID ? (
        <Text>MEAL ID присвоен:{mealID}</Text>
      ) : (
        <Text>MEAL ID не присвоен</Text>
      )}

      <FlatList
        style={{ height: "50%" }}
        data={meal_elements}
        keyExtractor={(item, index) => index}
        renderItem={({ item, index }) => {
          return (
            <MealEl item={item} index={index} deleteMealEl={deleteMealEl} />
          );
        }}
      />
    </View>
  );
};

export default MealScreen;
