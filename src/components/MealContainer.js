import { View, Text } from "react-native";
import React from "react";
import moment from "moment";

const MealContainer = ({ item, navigation }) => {
  //console.log(item);
  return (
    <View style={{ margin: 10, padding: 5, borderWidth: 0.5 }}>
      <Text>id : {item.id}</Text>
      <Text>
        Время и дата : {moment(item.date_time).format("HH:mm DD.MM.YYYY")}
      </Text>
      <Text>Название : {item.name}</Text>
      <Text>Тип приема пищи : {item.meal_type}</Text>
    </View>
  );
};

export default MealContainer;
