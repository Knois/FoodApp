import {
  View,
  Text,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";

import { setNeedRefreshTrue } from "../redux/slices/needRefreshSlice";
import ScreenHeader from "../components/ScreenHeader";
import { countCalories } from "../methods/InformationMethods";
import LoadingIndicator from "../components/LoadingIndicator";
import { getTokenFromStore } from "../methods/SecureStoreMethods";
import { useDispatch } from "react-redux";

const MealElementScreen = ({ navigation, route }) => {
  const item = route.params.item;
  const mealElementID = item ? item.id : null;
  const index = route.params.index;
  const mealID = route.params.mealID;
  const action = route.params.action;
  const dispatch = useDispatch();

  const [calories, setCalories] = useState(item ? String(item.calories) : "0");
  const [carbohydrates, setCarbohydrates] = useState(
    item ? String(item.carbohydrates) : "0"
  );
  const [fats, setFats] = useState(item ? String(item.fats) : "0");
  const [image_base64, setImage_base64] = useState(
    item ? item.image_base64 : null
  );
  const [image_url, setImage_url] = useState(item ? item.image_url : null);
  const [name, setName] = useState(item ? String(item.name) : "");
  const [proteins, setProteins] = useState(item ? String(item.proteins) : "0");
  const [quantity, setQuantity] = useState(item ? String(item.quantity) : "0");

  const [massParam, setMassParam] = useState(null);
  const [proteinsParam, setProteinsParam] = useState(null);
  const [fatsParam, setFatsParam] = useState(null);
  const [carbohydratesParam, setCarbohydratesParam] = useState(null);
  const [fromSearch, setFromSearch] = useState(false);

  const [isLoading, setLoading] = useState(false);

  const createErrorAlert = (message) => {
    Alert.alert("Ошибка", message, [{ text: "ОК", onPress: () => null }], {
      cancelable: true,
    });
  };

  const stateToObj = () => {
    let obj = {
      calories: calories ? calories : "0",
      carbohydrates: carbohydrates ? carbohydrates : "0",
      fats: fats ? fats : "0",
      image_base64: image_base64,
      image_url: image_url,
      measurement_type: "GRAM",
      name: name ? name.trim() : "Без названия",
      proteins: proteins ? proteins : "0",
      quantity: quantity ? quantity : "0",
    };

    if (mealID) {
      obj.meal = {
        id: mealID,
      };
    }
    if (mealElementID) {
      obj.id = mealElementID;
    }

    return obj;
  };

  const UrlToBase64 = async (obj) => {
    let formattedObj = Object.assign({}, obj);
    if (formattedObj.image_url) {
      let image;
      try {
        const { uri } = await FileSystem.downloadAsync(
          formattedObj.image_url,
          FileSystem.documentDirectory + "bufferimg.jpg",
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        image = await FileSystem.readAsStringAsync(uri, {
          encoding: "base64",
        });
        await FileSystem.deleteAsync(uri);
        formattedObj.image_base64 = image;
        formattedObj.image_url = null;
      } catch (err) {
        console.log(err);
      }
    }
    return formattedObj;
  };

  const copyToMealElement = (obj) => {
    setFromSearch(true);
    setMassParam(obj.quantity);
    setQuantity("" + obj.quantity);
    setProteinsParam("" + obj.proteins);
    setCalories("" + obj.calories);
    setCarbohydratesParam("" + obj.carbohydrates);
    setFatsParam("" + obj.fats);
    setImage_url("" + obj.image_url);
    setName("" + obj.name);
  };

  const createMealElementOnServer = async (obj) => {
    if (!isLoading) setLoading(true);
    let token = await getTokenFromStore();
    let formattedObj = await UrlToBase64(obj);

    try {
      const response = await fetch(
        "http://80.87.201.75:8079/gateway/my-food/meal_element",
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formattedObj),
        }
      );
      const json = await response.json();

      if (json.id) {
        dispatch(setNeedRefreshTrue());
        navigation.goBack();
      }
    } catch (error) {
      createErrorAlert("Ошибка при создании элемента приема пищи");
      setLoading(false);
    } finally {
    }
  };

  const updateMealElementOnServer = async (obj) => {
    if (!isLoading) setLoading(true);
    let token = await getTokenFromStore();
    let formattedObj = await UrlToBase64(obj);
    try {
      const response = await fetch(
        "http://80.87.201.75:8079/gateway/my-food/meal_element",
        {
          method: "PUT",
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formattedObj),
        }
      );
      const json = await response.json();
      if (json.id) {
        dispatch(setNeedRefreshTrue());
        navigation.goBack();
      }
    } catch (error) {
      createErrorAlert("Ошибка при обновлении элемента приема пищи!");
      setLoading(false);
    } finally {
    }
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

  let imageKey = new Date();
  let imageUri = image_base64
    ? {
        uri: `data:image/jpg;base64,${image_base64}`,
      }
    : image_url
    ? {
        uri: image_url + "?random_number=" + imageKey,
        headers: {
          Authorization: "Bearer " + getTokenFromStore(),
          "Content-Type": "application/json",
          Pragma: "no-cache",
        },
      }
    : require("../../assets/img/addPhoto.png");

  useEffect(() => {
    let countResult = countCalories(proteins, fats, carbohydrates);
    setCalories(String(countResult));
  }, [proteins, fats, carbohydrates]);

  useEffect(() => {
    if (fromSearch) {
      setProteins(+proteinsParam * (+quantity / +massParam));
      setFats(+fatsParam * (+quantity / +massParam));
      setCarbohydrates(+carbohydratesParam * (+quantity / +massParam));
    }
  }, [quantity]);

  return (
    <>
      <View style={{ flex: 1 }}>
        {isLoading ? (
          <LoadingIndicator />
        ) : (
          <>
            <ScreenHeader /*                                 Шапка*/
              canGoBack={true}
              title={
                route.params.item ? "Редактирование продукта" : "Создание блюда"
              }
              action={goToSearch}
              rightIcon="search-outline"
            />
            <ScrollView style={{ margin: 10, flex: 1 }}>
              <TouchableOpacity onPress={goToCamera}>
                <Image
                  style={{
                    marginBottom: 5,
                    width: "50%",
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
                <Text style={{ color: "#645fb1" }}>Белки:</Text>
                <TextInput /*                                                   Ввод белков*/
                  style={{
                    textAlign: "center",
                    borderWidth: fromSearch ? 0 : 0.5,
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
                  value={String(proteins)}
                  keyboardType="numeric"
                  editable={!fromSearch}
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
                <Text style={{ color: "#645fb1" }}>Жиры:</Text>
                <TextInput /*                                                   Ввод жиров*/
                  style={{
                    textAlign: "center",
                    borderWidth: fromSearch ? 0 : 0.5,
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
                  value={String(fats)}
                  keyboardType="numeric"
                  editable={!fromSearch}
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
                <Text style={{ color: "#645fb1" }}>Углеводы:</Text>
                <TextInput /*                                                   Ввод углеводов*/
                  style={{
                    textAlign: "center",
                    borderWidth: fromSearch ? 0 : 0.5,
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
                  value={String(carbohydrates)}
                  keyboardType="numeric"
                  editable={!fromSearch}
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
                <Text style={{ color: "#645fb1" }}>Калории:</Text>
                <TextInput /*                                                   Ввод калорий*/
                  style={{
                    textAlign: "center",
                    borderWidth: fromSearch ? 0 : 0.5,
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
                  editable={!fromSearch}
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
                <Text style={{ color: "#645fb1" }}>Количество (гр.):</Text>
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
            </ScrollView>
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
                if (mealID) {
                  createMealElementOnServer(stateToObj());
                } else {
                  if (mealElementID) {
                    updateMealElementOnServer(stateToObj());
                  } else {
                    index ? action(stateToObj(), index) : action(stateToObj());
                    navigation.goBack();
                  }
                }
              }}
            >
              <Ionicons name="checkmark" size={40} color="#645fb1" />
            </TouchableOpacity>
          </>
        )}
      </View>
    </>
  );
};

export default MealElementScreen;
