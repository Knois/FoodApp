import { View, Text } from "react-native";
import React from "react";

const MealEl = ({ item, index }) => {
  return (
    <View style={{ borderWidth: 1, padding: 5, margin: 5 }}>
      <Text>Calories: {item.calories}</Text>
      <Text>carbohydrates: {item.carbohydrates}</Text>
      <Text>description: {item.description}</Text>
      <Text>fats: {item.fats}</Text>
      <Text>imageUrl: {item.imageUrl}</Text>
      <Text>measurement_type: {item.measurement_type}</Text>
      <Text>name: {item.name}</Text>
      <Text>proteins: {item.proteins}</Text>
      <Text>quantity: {item.quantity}</Text>
      <Text>type: {item.type}</Text>
    </View>
  );
};

export default MealEl;
