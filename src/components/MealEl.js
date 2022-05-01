import { View, Text, TouchableOpacity, Pressable, Image } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const MealEl = ({
  item,
  index,
  updateMealElement,
  deleteMealElement,
  navigation,
}) => {
  let imageUri = item.image_url
    ? { uri: item.image_url }
    : {
        uri: `data:image/jpg;base64,${item.image_base64}`,
      };
  return (
    <Pressable
      style={{
        backgroundColor: "#f0edf9",
        borderRadius: 10,
        padding: 5,
        marginVertical: 10,
      }}
      onPress={() => {
        navigation.navigate("MealElementScreen", {
          item: item,
          action: updateMealElement,
          index: index,
        });
      }}
    >
      <Text
        style={{
          fontWeight: "bold",
          color: "#645fb1",
          alignSelf: "center",
          marginTop: 10,
        }}
      >
        {item.name}
      </Text>
      <Text
        style={{
          color: "#9599a4",
          alignSelf: "center",
        }}
      >
        {item.quantity} {item.measurement_type}
      </Text>

      <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
        <Image
          style={{ width: "30%", height: 150, borderRadius: 40 }}
          source={imageUri}
          resizeMethod="auto"
          resizeMode="contain"
        />

        <View
          style={{ flexDirection: "column", justifyContent: "space-around" }}
        >
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <View
              style={{
                width: "40%",
                flexDirection: "column",
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  color: "#645fb1",
                }}
              >
                Калории:
              </Text>
              <Text
                style={{
                  fontWeight: "bold",
                  color: "#9599a4",
                }}
              >
                🔥 {item.calories}
              </Text>
            </View>
            <View
              style={{
                width: "40%",
                flexDirection: "column",
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  color: "#645fb1",
                }}
              >
                Белки:
              </Text>
              <Text
                style={{
                  fontWeight: "bold",
                  color: "#9599a4",
                }}
              >
                🍗 {item.proteins}
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <View
              style={{
                width: "40%",
                flexDirection: "column",
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  color: "#645fb1",
                }}
              >
                Жиры:
              </Text>
              <Text
                style={{
                  fontWeight: "bold",
                  color: "#9599a4",
                }}
              >
                🥩 {item.fats}
              </Text>
            </View>
            <View
              style={{
                width: "40%",
                flexDirection: "column",
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  color: "#645fb1",
                }}
              >
                Углеводы:
              </Text>
              <Text
                style={{
                  fontWeight: "bold",
                  color: "#9599a4",
                }}
              >
                🍙 {item.carbohydrates}
              </Text>
            </View>
          </View>
        </View>
      </View>

      <TouchableOpacity
        style={{ alignSelf: "flex-end", padding: 5 }}
        onPress={() => {
          deleteMealElement(index);
        }}
      >
        <Ionicons name="trash-outline" size={30} color="red" />
      </TouchableOpacity>
    </Pressable>
  );
};

export default MealEl;
