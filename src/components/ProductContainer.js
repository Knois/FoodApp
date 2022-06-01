import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { MAIN } from "../constants/Constants";

const ProductContainer = ({ item, action }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={{
        borderWidth: 0.5,
        marginVertical: 5,
        padding: 5,
        borderRadius: 5,
        borderColor: MAIN,
      }}
      onPress={() => {
        action(item);
      }}
    >
      <View style={{ flexDirection: "column" }}>
        <Text
          style={{
            alignSelf: "center",
            textAlign: "center",
            color: MAIN,
            fontWeight: "bold",
          }}
        >
          {item.name}
        </Text>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignSelf: "center",
            marginTop: 5,
          }}
        >
          <Text style={{ width: "20%", color: MAIN }}>К : {item.calories}</Text>
          <Text style={{ width: "20%", color: MAIN }}>Б : {item.proteins}</Text>
          <Text style={{ width: "20%", color: MAIN }}>Ж : {item.fats}</Text>
          <Text style={{ width: "20%", color: MAIN }}>
            У : {item.carbohydrates}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignSelf: "center",
            alignContent: "center",
            marginTop: 5,
          }}
        >
          <Text
            style={{
              flex: 9,
              color: MAIN,
              textAlign: "left",
              marginHorizontal: 5,
              alignSelf: "center",
            }}
          >
            Категория: {item.product_category.name}
          </Text>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignContent: "center",
              alignSelf: "center",
            }}
          >
            {item.user_id && (
              <Ionicons name="person-outline" size={15} color={MAIN} />
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProductContainer;
