import { View, Text, TouchableOpacity, Button } from "react-native";
import React from "react";
import moment from "moment";
import { getSumCaloriesFromArray } from "../methods/Simple";

const MealContainer = ({ item, navigation, deleteMeal }) => {
  return (
    <>
      <TouchableOpacity
        style={{ margin: 10, padding: 5, borderWidth: 0.5 }}
        onPress={() => {
          navigation.navigate("MealScreen", {
            mealID: item.id,
            meal_type: item.meal_type,
            date_time: item.date_time,
            name: item.name,
            meal_elements: item.meal_elements,
          });
        }}
      >
        <Text>id : {item.id}</Text>
        <Text>
          Время и дата : {moment(item.date_time).format("HH:mm DD.MM.YYYY")}
        </Text>
        <Text>Название : {item.name}</Text>
        <Text>Тип приема пищи : {item.meal_type}</Text>
        <Text>
          Сумма калорий: {+getSumCaloriesFromArray(item.meal_elements)}
        </Text>

        {item.meal_elements.map((el) => {
          return <Text key={Math.random() * 9999}>- {el.name}</Text>;
        })}

        <Button
          title="Удалить прием пищи"
          onPress={() => {
            deleteMeal(item.id);
          }}
        />
      </TouchableOpacity>
    </>
  );
};

export default MealContainer;
