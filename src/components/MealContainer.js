import { View, Text, TouchableOpacity, Pressable } from "react-native";
import React from "react";
import { timeNow } from "../methods/DateMethods";
import { getSumCaloriesFromArray } from "../methods/InformationMethods";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const stringToNormalCase = (str) => {
  let lowerCaseString = str.slice(0).toLowerCase();
  return lowerCaseString[0].toUpperCase() + lowerCaseString.slice(1);
}; /*                         Возвращает строку, где первый символ заглавный, остальные маленькие*/

const MealContainer = ({ item, navigation, action }) => {
  return (
    <>
      <Pressable
        style={{
          backgroundColor: "#f0edf9",
          borderRadius: 10,
          padding: 5,
          marginVertical: 10,
        }}
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
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ fontSize: 16, fontWeight: "bold", color: "#645fb1" }}>
            {stringToNormalCase(item.name)}
          </Text>
          <Text style={{ fontSize: 16, fontWeight: "bold", color: "#9599a4" }}>
            {+getSumCaloriesFromArray(item.meal_elements)} kcal
          </Text>
        </View>
        <Text style={{ color: "#645fb1" }}>
          {stringToNormalCase(item.meal_type)} at {timeNow(item.date_time)}
        </Text>
        <View>
          {item.meal_elements.map((el) => {
            return (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  padding: 5,
                }}
                key={Math.random() * 9999}
              >
                <MaterialCommunityIcons
                  name="silverware-fork-knife"
                  size={24}
                  color="#645fb1"
                />
                <View style={{ marginLeft: 10 }}>
                  <Text
                    style={{
                      fontWeight: "bold",
                      color: "#645fb1",
                    }}
                  >
                    {el.name}
                  </Text>
                  <Text style={{ color: "#9599a4" }}>
                    {el.quantity} {stringToNormalCase(el.measurement_type)}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>

        <TouchableOpacity
          style={{ alignSelf: "flex-end", padding: 5 }}
          onPress={() => {
            action(item.id);
          }}
        >
          <Ionicons name="trash-outline" size={30} color="red" />
        </TouchableOpacity>
      </Pressable>
    </>
  );
};

export default MealContainer;
