import { View, Text, TextInput, Button } from "react-native";
import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";

const MealElementScreen = ({ navigation, route }) => {
  const item = route.params.item;
  const index = route.params.index;

  const [calories, setCalories] = useState(!item ? "0" : item.calories);
  const [carbohydrates, setCarbohydrates] = useState(
    !item ? "0" : item.carbohydrates
  );
  const [description, setDescription] = useState(
    !item ? "description" : item.description
  );
  const [fats, setFats] = useState(!item ? "0" : item.fats);
  const [imageUrl, setImageUrl] = useState(!item ? "imageUrl" : item.imageUrl);
  const [measurement_type, setMeasurement_type] = useState(
    !item ? "CUP" : item.measurement_type
  );
  const [name, setName] = useState(!item ? "name" : item.name);
  const [proteins, setProteins] = useState(!item ? "0" : item.proteins);
  const [quantity, setQuantity] = useState(!item ? "quantity" : item.quantity);
  const [type, setType] = useState(!item ? "DISH" : item.type);

  let buttonTitle = item ? "Обновить элемент" : "Создать элемент";

  const stateToObj = () => {
    return {
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

  const copyToMealElement = (obj) => {
    setCalories("" + obj.calories);
    setCarbohydrates("" + obj.carbohydrates);
    setDescription("" + obj.description);
    setFats("" + obj.fats);
    setImageUrl("" + obj.imageUrl);
    setMeasurement_type("" + obj.measurement_type);
    setName("" + obj.name);
    setProteins("" + obj.proteins);
    setQuantity("" + obj.quantity);
  };

  return (
    <>
      <View>
        <View style={{ width: "40%", alignSelf: "center", margin: 15 }}>
          <Button
            title="Поиск в базе"
            onPress={() => {
              navigation.navigate("SearchScreen", {
                copyToMealElement: copyToMealElement,
              });
            }}
          />
        </View>
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
        title={buttonTitle}
        onPress={() => {
          index
            ? route.params.action(stateToObj(), index)
            : route.params.action(stateToObj());
          navigation.goBack();
        }}
      />
    </>
  );
};

export default MealElementScreen;
