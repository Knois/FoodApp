import { View, Text, TouchableOpacity, Button, FlatList } from "react-native";
import React from "react";
import { getSumCaloriesFromArray, timeNow } from "../methods/DateMethods";

const stringToNormalCase = (str) => {
  let lowerCaseString = str.slice(0).toLowerCase();
  return lowerCaseString[0].toUpperCase() + lowerCaseString.slice(1);
}; /*                         Возвращает строку, где первый символ заглавный, остальные маленькие*/

const MealContainer = ({ item, navigation, deleteMeal }) => {
  return (
    <>
      <TouchableOpacity
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
        <Text style={{ fontWeight: "bold", color: "#645fb1" }}>
          {item.name}
        </Text>
        <Text style={{ color: "#645fb1" }}>
          {stringToNormalCase(item.meal_type)} at {timeNow(item.date_time)}
        </Text>
        <Text>
          Сумма калорий: {+getSumCaloriesFromArray(item.meal_elements)}
        </Text>
        <View
          style={{
            marginLeft: 40,
          }}
        >
          {item.meal_elements.map((el) => {
            return (
              <View
                style={{ marginLeft: 20, padding: 5 }}
                key={Math.random() * 9999}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    color: "#645fb1",
                  }}
                >
                  {el.name}
                </Text>
                <Text
                  style={{
                    color: "#645fb1",
                  }}
                >
                  {el.quantity}
                </Text>
              </View>
            );
          })}
        </View>

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
