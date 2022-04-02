import { View, Text } from "react-native";
import React from "react";

const MealContainer = ({ item }) => {
  return (
    <View style={{ margin: 10, padding: 5, borderWidth: 0.5 }}>
      <Text>id :{item.id}</Text>
      <Text>date_time :{item.date_time}</Text>
      <Text>meal_type :{item.meal_type}</Text>
    </View>
  );
};

export default MealContainer;
