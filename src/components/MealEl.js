import { View, Text, Button, TouchableOpacity } from "react-native";
import React from "react";

const MealEl = ({
  item,
  index,
  updateMealElement,
  deleteMealElement,
  navigation,
}) => {
  return (
    <View style={{ borderWidth: 1, padding: 5, margin: 5 }}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("MealElementScreen", {
            item: item,
            action: updateMealElement,
            index: index,
          });
        }}
      >
        <Text>Calories: {item.calories}</Text>
        <Text>carbohydrates: {item.carbohydrates}</Text>
        <Text>fats: {item.fats}</Text>
        <Text>imageUrl: {item.imageUrl}</Text>
        <Text>measurement_type: {item.measurement_type}</Text>
        <Text>name: {item.name}</Text>
        <Text>proteins: {item.proteins}</Text>
        <Text>quantity: {item.quantity}</Text>
      </TouchableOpacity>
      <Button
        title="Удалить элемент"
        onPress={() => {
          deleteMealElement(index);
        }}
      />
    </View>
  );
};

export default MealEl;
