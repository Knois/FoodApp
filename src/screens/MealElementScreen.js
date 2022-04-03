import { View, Text, TextInput, Button } from "react-native";
import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";

const MealElementScreen = ({ navigation, route }) => {
  const [calories, setCalories] = useState("0");
  const [carbohydrates, setCarbohydrates] = useState("0");
  const [description, setDescription] = useState("description");
  const [fats, setFats] = useState("0");
  const [imageUrl, setImageUrl] = useState("imageUrl");
  const [measurement_type, setMeasurement_type] = useState("CUP");
  const [name, setName] = useState("name");
  const [proteins, setProteins] = useState("0");
  const [quantity, setQuantity] = useState("quantity");
  const [type, setType] = useState("DISH");

  const stateToObj = () => {
    return {
      calories: calories,
      calories: calories,
      carbohydrates: carbohydrates,
      description: description,
      fats: fats,
      imageUrl: imageUrl,
      measurement_type: measurement_type,
      name: name,
      proteins: proteins,
      quantity: quantity,
      type: type,
    };
  };

  return (
    <>
      <View>
        <Text>calories</Text>
        <TextInput
          style={{
            borderWidth: 0.5,
            backgroundColor: "#f9f2d9d9",
            alignSelf: "center",
          }}
          onChangeText={(value) => {
            setCalories(value);
          }}
          value={calories}
        />
        <Text>carbohydrates</Text>
        <TextInput
          style={{
            borderWidth: 0.5,
            backgroundColor: "#f9f2d9d9",
            alignSelf: "center",
          }}
          onChangeText={(value) => {
            setCarbohydrates(value);
          }}
          value={carbohydrates}
        />
        <Text>description</Text>
        <TextInput
          style={{
            borderWidth: 0.5,
            backgroundColor: "#f9f2d9d9",
            alignSelf: "center",
          }}
          onChangeText={(value) => {
            setDescription(value);
          }}
          value={description}
        />
        <Text>fats</Text>
        <TextInput
          style={{
            borderWidth: 0.5,
            backgroundColor: "#f9f2d9d9",
            alignSelf: "center",
          }}
          onChangeText={(value) => {
            setFats(value);
          }}
          value={fats}
        />
        <Text>imageUrl</Text>
        <TextInput
          style={{
            borderWidth: 0.5,
            backgroundColor: "#f9f2d9d9",
            alignSelf: "center",
          }}
          onChangeText={(value) => {
            setImageUrl(value);
          }}
          value={imageUrl}
        />
        <Text>measurement_type</Text>
        <Picker
          onValueChange={(itemValue, itemIndex) => {
            setMeasurement_type(itemValue);
          }}
          selectedValue={measurement_type}
        >
          <Picker.Item label="CUP" value="CUP" />
          <Picker.Item label="GRAM" value="GRAM" />
          <Picker.Item label="KILOGRAM" value="KILOGRAM" />
          <Picker.Item label="LITER" value="LITER" />
          <Picker.Item label="MILLILITER" value="MILLILITER" />
          <Picker.Item label="PACK" value="PACK" />
          <Picker.Item label="PIECE" value="PIECE" />
          <Picker.Item label="SOUP_SPOON" value="SOUP_SPOON" />
          <Picker.Item label="TEA_SPOON" value="TEA_SPOON" />
          <Picker.Item label="UNIT" value="UNIT" />
        </Picker>
        <Text>name</Text>
        <TextInput
          style={{
            borderWidth: 0.5,
            backgroundColor: "#f9f2d9d9",
            alignSelf: "center",
          }}
          onChangeText={(value) => {
            setName(value);
          }}
          value={name}
        />
        <Text>proteins</Text>
        <TextInput
          style={{
            borderWidth: 0.5,
            backgroundColor: "#f9f2d9d9",
            alignSelf: "center",
          }}
          onChangeText={(value) => {
            setProteins(value);
          }}
          value={proteins}
        />
        <Text>quantity</Text>
        <TextInput
          style={{
            borderWidth: 0.5,
            backgroundColor: "#f9f2d9d9",
            alignSelf: "center",
          }}
          onChangeText={(value) => {
            setQuantity(value);
          }}
          value={quantity}
        />
        <Text>type</Text>
        <Picker
          onValueChange={(itemValue, itemIndex) => {
            setType(itemValue);
          }}
          selectedValue={type}
        >
          <Picker.Item label="DISH" value="DISH" />
          <Picker.Item label="PRODUCT" value="PRODUCT" />
        </Picker>
      </View>
      <Button
        title="Добавить элемент"
        onPress={() => {
          route.params.action(stateToObj());
          navigation.goBack();
        }}
      />
    </>
  );
};

export default MealElementScreen;
