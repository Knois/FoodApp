import { View, Text, Button, TouchableOpacity, Image } from "react-native";
import React from "react";

const MealEl = ({
  item,
  index,
  updateMealElement,
  deleteMealElement,
  navigation,
}) => {
  let imageUri = item.image_base64
    ? {
        uri: `data:image/jpg;base64,${item.image_base64}`,
      }
    : { uri: item.image_url };
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
        <Image
          style={{ width: 100, height: 100 }}
          source={imageUri}
          resizeMethod="auto"
          resizeMode="center"
        />
        <Text>Calories: {item.calories}</Text>
        <Text>carbohydrates: {item.carbohydrates}</Text>
        <Text>fats: {item.fats}</Text>
        <Text>image_url: {item.image_url}</Text>
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
