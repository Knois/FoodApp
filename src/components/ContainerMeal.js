import { View, Text, TouchableOpacity, Pressable } from "react-native";
import React, { useState, useLayoutEffect, useContext } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

import { timeNow } from "../methods/DateMethods";
import {
  getSumCaloriesFromArray,
  stringToNormalCase,
} from "../methods/InformationMethods";
import LoadingIndicator from "./LoadingIndicator";
import { TokenContext } from "../context/TokenContext";

const ContainerMeal = ({ item, navigation, action }) => {
  const { token } = useContext(TokenContext);

  const [mealElements, setMealElements] = useState([]);
  const [isLoading, setLoading] = useState(false);

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
        setMealElements(json.content);
      }
    } catch (error) {
      createErrorAlert(
        "Ошибка при получении элементов элементов приема пищи c сервера"
      );
    } finally {
      setLoading(false);
    }
  };

  useLayoutEffect(() => {
    getMealElements(item.id);
  }, []);

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
            meal_elements: mealElements,
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
            {getSumCaloriesFromArray(mealElements)} ккал/
          </Text>
        </View>

        <View>
          {isLoading ? (
            <View style={{ height: 1 }}>
              <LoadingIndicator />
            </View>
          ) : (
            mealElements.map((el) => {
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
            })
          )}
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
