import { View, Text, TextInput, Button, Image } from "react-native";
import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";

import ScreenHeader from "../components/ScreenHeader";

const MealElementScreen = ({ navigation, route }) => {
  const item = route.params.item;
  const index = route.params.index;

  const [calories, setCalories] = useState(item ? String(item.calories) : "0");
  const [carbohydrates, setCarbohydrates] = useState(
    item ? String(item.carbohydrates) : "0"
  );
  const [fats, setFats] = useState(item ? String(item.fats) : "0");
  const [image_base64, setImage_base64] = useState(
    item ? String(item.image_base64) : null
  );
  const [image_url, setImage_url] = useState(
    item ? String(item.image_url) : null
  );
  const [measurement_type, setMeasurement_type] = useState(
    item ? String(item.measurement_type) : "CUP"
  );
  const [name, setName] = useState(item ? String(item.name) : "name");
  const [proteins, setProteins] = useState(item ? String(item.proteins) : "0");
  const [quantity, setQuantity] = useState(
    item ? String(item.quantity) : "quantity"
  );

  let imageUri = image_base64
    ? {
        uri: `data:image/jpg;base64,${image_base64}`,
      }
    : { uri: image_url };

  let buttonTitle = item ? "Обновить элемент" : "Создать элемент";

  const stateToObj = () => {
    return {
      calories: calories,
      carbohydrates: carbohydrates,
      fats: fats,
      image_base64: image_base64,
      image_url: image_url,
      measurement_type: measurement_type,
      name: name,
      proteins: proteins,
      quantity: quantity,
    };
  };

  const copyToMealElement = (obj) => {
    setCalories("" + obj.calories);
    setCarbohydrates("" + obj.carbohydrates);
    setFats("" + obj.fats);
    setImage_url("" + obj.image_url);
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
        <View>
          <TextInput
            value={image_base64}
            style={{
              borderWidth: 0.5,
              backgroundColor: "#f9f2d9d9",
              alignSelf: "center",
            }}
          />
          <Image style={{ height: 100, width: 100 }} source={imageUri} />
          {image_base64 ? (
            <>
              <Text>Фото добавлено</Text>
              <Button
                title="Изменить фото"
                onPress={() =>
                  navigation.navigate("CameraScreen", {
                    setImage_base64: setImage_base64,
                  })
                }
              />
            </>
          ) : (
            <Button
              title="Добавить фото"
              onPress={() =>
                navigation.navigate("CameraScreen", {
                  setImage_base64: setImage_base64,
                })
              }
            />
          )}
        </View>
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
