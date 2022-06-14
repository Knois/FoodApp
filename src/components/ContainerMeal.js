import { View, Text, TouchableOpacity, Pressable } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

import { timeNow } from "../methods/DateMethods";
import {
  getSumCaloriesFromArray,
  stringToNormalCase,
} from "../methods/InformationMethods";

const ContainerMeal = ({ item, navigation, action }) => {
  const sumCalories = getSumCaloriesFromArray(item.mealElements);

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
            mealElements: item.mealElements,
          });
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#645fb1" }}>
            {stringToNormalCase(item.meal_type)} at {timeNow(item.date_time)}
          </Text>
          <Text style={{ fontSize: 16, fontWeight: "bold", color: "#9599a4" }}>
            {sumCalories} ккал
          </Text>
        </View>

        <View>
          {item.mealElements.map((el) => {
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
                <View
                  style={{
                    width: "90%",
                    marginLeft: 10,
                  }}
                >
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

export default ContainerMeal;
