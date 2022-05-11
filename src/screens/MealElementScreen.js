import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import Modal from "react-native-modal";
import { Ionicons } from "@expo/vector-icons";

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
    item ? String(item.measurement_type) : "GRAM"
  );
  const [name, setName] = useState(item ? String(item.name) : "");
  const [proteins, setProteins] = useState(item ? String(item.proteins) : "0");
  const [quantity, setQuantity] = useState(item ? String(item.quantity) : "0");

  const [isVisible, setVisible] = useState(false);

  let imageUri = image_base64
    ? {
        uri: `data:image/jpg;base64,${image_base64}`,
      }
    : {
        uri: image_url ? image_url : "https://clck.ru/gwCcf",
      };

  const measurementTypes = [
    "GRAM",
    "KILOGRAM",
    "LITER",
    "MILLILITER",
    "PACK",
    "PIECE",
    "PACK",
    "SOUP_SPOON",
    "TEA_SPOON",
    "UNIT",
    "CUP",
  ];

  const stateToObj = () => {
    return {
      calories: calories,
      carbohydrates: carbohydrates,
      fats: fats,
      image_base64: image_base64,
      image_url: image_url,
      measurement_type: measurement_type,
      name: name ? name.trim() : "Без названия",
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

  const goToSearch = () => {
    navigation.navigate("SearchScreen", {
      copyToMealElement: copyToMealElement,
    });
  };

  const goToCamera = () =>
    navigation.navigate("CameraScreen", {
      setImage_base64: setImage_base64,
      setImage_url: setImage_url,
    });

  const toggleModal = () => {
    setVisible(!isVisible);
  };

  return (
    <>
      <View style={{ flex: 1 }}>
        <ScreenHeader /*                                 Шапка*/
          canGoBack={true}
          title={route.params.item ? route.params.item.name : "Создание блюда"}
          action={goToSearch}
          rightIcon="search-outline"
        />
        <View style={{ margin: 10, flex: 1 }}>
          <TouchableOpacity onPress={goToCamera}>
            <Image
              style={{
                marginBottom: 5,
                width: "40%",
                height: 200,
                borderRadius: 20,
                alignSelf: "center",
              }}
              source={imageUri}
              resizeMethod="auto"
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TextInput /*                                 Ввод названия блюда*/
            style={{
              marginVertical: 5,
              textAlign: "center",
              borderWidth: 0.5,
              borderRadius: 5,
              borderColor: "#645fb1",
              alignSelf: "center",
              width: "100%",
              height: 40,
              paddingHorizontal: 10,
              paddingVertical: 5,
              color: "#645fb1",
              fontWeight: name.length == 0 ? "normal" : "bold",
            }}
            onChangeText={(value) => {
              setName(value);
            }}
            autoCapitalize="sentences"
            value={name}
            placeholder="Введите название блюда"
          />
          <View
            style={{
              marginVertical: 5,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "#645fb1" }}>Калории :</Text>
            <TextInput /*                                                   Ввод калорий*/
              style={{
                textAlign: "center",
                borderWidth: 0.5,
                borderRadius: 5,
                borderColor: "#645fb1",
                alignSelf: "center",
                width: 200,
                height: 40,
                paddingHorizontal: 10,
                paddingVertical: 5,
                color: "#645fb1",
                fontWeight: "bold",
              }}
              onChangeText={(value) => {
                setCalories(value);
              }}
              value={calories}
              keyboardType="numeric"
            />
          </View>
          <View
            style={{
              marginVertical: 5,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "#645fb1" }}>Углеводы :</Text>
            <TextInput /*                                                   Ввод углеводов*/
              style={{
                textAlign: "center",
                borderWidth: 0.5,
                borderRadius: 5,
                borderColor: "#645fb1",
                alignSelf: "center",
                width: 200,
                height: 40,
                paddingHorizontal: 10,
                paddingVertical: 5,
                color: "#645fb1",
                fontWeight: "bold",
              }}
              onChangeText={(value) => {
                setCarbohydrates(value);
              }}
              value={carbohydrates}
              keyboardType="numeric"
            />
          </View>
          <View
            style={{
              marginVertical: 5,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "#645fb1" }}>Жиры :</Text>
            <TextInput /*                                                   Ввод жиров*/
              style={{
                textAlign: "center",
                borderWidth: 0.5,
                borderRadius: 5,
                borderColor: "#645fb1",
                alignSelf: "center",
                width: 200,
                height: 40,
                paddingHorizontal: 10,
                paddingVertical: 5,
                color: "#645fb1",
                fontWeight: "bold",
              }}
              onChangeText={(value) => {
                setFats(value);
              }}
              value={fats}
              keyboardType="numeric"
            />
          </View>
          <View
            style={{
              marginVertical: 5,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "#645fb1" }}>Белки :</Text>
            <TextInput /*                                                   Ввод белков*/
              style={{
                textAlign: "center",
                borderWidth: 0.5,
                borderRadius: 5,
                borderColor: "#645fb1",
                alignSelf: "center",
                width: 200,
                height: 40,
                paddingHorizontal: 10,
                paddingVertical: 5,
                color: "#645fb1",
                fontWeight: "bold",
              }}
              onChangeText={(value) => {
                setProteins(value);
              }}
              value={proteins}
              keyboardType="numeric"
            />
          </View>
          <View
            style={{
              marginVertical: 5,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "#645fb1" }}>Количество :</Text>
            <TextInput /*                                                   Ввод количества*/
              style={{
                textAlign: "center",
                borderWidth: 0.5,
                borderRadius: 5,
                borderColor: "#645fb1",
                alignSelf: "center",
                width: 200,
                height: 40,
                paddingHorizontal: 10,
                paddingVertical: 5,
                color: "#645fb1",
                fontWeight: "bold",
              }}
              onChangeText={(value) => {
                setQuantity(value);
              }}
              value={quantity}
              keyboardType="numeric"
            />
          </View>
          <View
            style={{
              marginVertical: 5,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "#645fb1" }}>Тип приема пищи:</Text>
            <TouchableOpacity /*                                 Открывает модальное окно с выбором measurement_type*/
              onPress={() => {
                toggleModal();
              }}
              style={{
                borderWidth: 0.5,
                padding: 5,
                borderRadius: 5,
                borderColor: "#645fb1",
                width: 200,
                height: 40,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ color: "#645fb1", fontWeight: "bold" }}>
                {measurement_type}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity /*                                                    Кнопка добавления/обновления элемента приема пищи*/
          style={{
            backgroundColor: "#d8d6ed",
            width: 50,
            height: 50,
            alignItems: "center",
            justifyContent: "center",
            alignSelf: "center",
            marginBottom: 20,
            borderRadius: 10,
            margin: 5,
          }}
          onPress={() => {
            index
              ? route.params.action(stateToObj(), index)
              : route.params.action(stateToObj());
            navigation.goBack();
          }}
        >
          <Ionicons name="checkmark" size={40} color="#645fb1" />
        </TouchableOpacity>
      </View>

      <Modal /*                                 Модальное окно, которое откроет выбор measurement_type*/
        hideModalContentWhileAnimating={true}
        onBackButtonPress={() => {
          toggleModal();
        }}
        onBackdropPress={() => {
          toggleModal();
        }}
        isVisible={isVisible}
        animationIn="slideInUp"
        animationInTiming={500}
        animationOutTiming={500}
        backdropOpacity={0.7}
        backdropTransitionInTiming={1}
        backdropTransitionOutTiming={1}
      >
        <View
          style={{
            width: 200,
            backgroundColor: "white",
            alignSelf: "center",
            borderRadius: 20,
          }}
        >
          {measurementTypes.map((el) => {
            return (
              <TouchableOpacity
                key={Math.random() * 9999}
                style={{
                  height: 50,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={() => {
                  setMeasurement_type(el);
                  toggleModal();
                }}
              >
                <Text>{el}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </Modal>
    </>
  );
};

export default MealElementScreen;
