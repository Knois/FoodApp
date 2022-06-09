import {
  View,
  Text,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import Modal from "react-native-modal";
import { Ionicons } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";
import { useSelector } from "react-redux";

import ScreenHeader from "../components/ScreenHeader";
import { TokenContext } from "../context/TokenContext";
import { countCalories } from "../methods/InformationMethods";
import LoadingIndicator from "../components/LoadingIndicator";

const ProductScreen = ({ navigation, route }) => {
  const { token } = useContext(TokenContext);
  const productCategories = useSelector((state) => state.productCategories.arr);

  const item = route.params.item;
  const userID = item ? item.user_id : null;
  const itemID = item ? item.id : null;

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
  const [product_category, setProduct_category] = useState({
    id: "other",
    name: "Остальное",
  });

  const [isLoading, setLoading] = useState(false);
  const [isVisible, setVisible] = useState(false);

  const createErrorAlert = (message) => {
    Alert.alert("Ошибка", message, [{ text: "ОК", onPress: () => null }], {
      cancelable: true,
    });
  };

  const createTwoButtonAlert = () =>
    Alert.alert(
      "Удаление продукта",
      "Подтверждаете удаление?",
      [
        {
          text: "Отмена",
          style: "cancel",
        },
        { text: "ОК", onPress: () => deleteProduct() },
      ],
      {
        cancelable: true,
      }
    );

  const stateToObj = () => {
    let obj = {
      calories: calories ? calories : "0",
      carbohydrates: carbohydrates ? carbohydrates : "0",
      fats: fats ? fats : "0",
      image_base64: image_base64 ? image_base64 : null,
      image_url: image_url ? image_url : null,
      measurement_type: "GRAM",
      name: name ? name.trim() : "Без названия",
      proteins: proteins ? proteins : "0",
      quantity: quantity ? quantity : "0",
      product_category: {
        id: product_category.id,
      },
    };
    if (itemID) {
      obj.id = itemID;
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

  const createProduct = async (obj) => {
    if (!isLoading) setLoading(true);
    let formattedObj = await UrlToBase64(obj);

    try {
      const response = await fetch(
        "http://80.87.201.75:8079/gateway/my-food/product",
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
        navigation.goBack();
      }
    } catch (error) {
      createErrorAlert("Ошибка при создании продукта");
      setLoading(false);
    } finally {
    }
  };

  const updateProduct = async (obj) => {
    if (!isLoading) setLoading(true);
    let formattedObj = await UrlToBase64(obj);

    try {
      const response = await fetch(
        "http://80.87.201.75:8079/gateway/my-food/product",
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
        navigation.goBack();
      }
    } catch (error) {
      createErrorAlert("Ошибка при обновлении продукта!");
      setLoading(false);
    } finally {
    }
  };

  const deleteProduct = async () => {
    try {
      const response = await fetch(
        "http://80.87.201.75:8079/gateway/my-food/product/" + item.id,
        {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status == 200) {
        navigation.goBack();
      }
    } catch (error) {
      createErrorAlert("Ошибка при удалении продукта!");
    } finally {
    }
  };

  const goToCamera = () =>
    navigation.navigate("CameraScreen", {
      setImage_base64: setImage_base64,
      setImage_url: setImage_url,
    });

  const toggleModal = () => {
    setVisible(!isVisible);
  };

  let imageKey = new Date();
  let imageUri = image_base64
    ? {
        uri: `data:image/jpg;base64,${image_base64}`,
      }
    : image_url
    ? {
        uri: image_url + "?random_number=" + imageKey,
        headers: {
          Authorization: "Bearer " + token,
          Pragma: "no-cache",
        },
      }
    : require("../../assets/img/addPhoto.png");

  useEffect(() => {
    let countResult = countCalories(proteins, fats, carbohydrates);
    setCalories(String(countResult));
  }, [proteins, fats, carbohydrates]);

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
                route.params.item
                  ? "Редактирование продукта"
                  : "Создание продукта"
              }
              action={userID ? createTwoButtonAlert : "none"}
              rightIcon="trash-outline"
            />
            <ScrollView style={{ margin: 10, flex: 1 }}>
              <TouchableOpacity onPress={item && !userID ? null : goToCamera}>
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
              <TextInput /*                                 Ввод названия продукта*/
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
                placeholder="Введите название продукта"
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
                <Text style={{ color: "#645fb1" }}>Жиры:</Text>
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
                <Text style={{ color: "#645fb1" }}>Углеводы:</Text>
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
                <Text style={{ color: "#645fb1" }}>Калории:</Text>
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
              <View
                style={{
                  marginVertical: 5,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text style={{ color: "#645fb1" }}>Категория:</Text>
                <TouchableOpacity /*                                 Открывает модальное окно с выбором product_category*/
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
                    {product_category.name}
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>

            {(!item || (item && userID)) && (
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
                  item
                    ? updateProduct(stateToObj())
                    : createProduct(stateToObj());
                }}
              >
                <Ionicons name="checkmark" size={40} color="#645fb1" />
              </TouchableOpacity>
            )}
          </>
        )}
      </View>
      <Modal /*                                 Модальное окно, которое откроет выбор категории*/
        hideModalContentWhileAnimating={true}
        onBackButtonPress={() => {
          toggleModal();
        }}
        onBackdropPress={() => {
          toggleModal();
        }}
        isVisible={isVisible}
        animationIn="pulse"
        animationOut="slideOutUp"
        animationInTiming={500}
        animationOutTiming={500}
        backdropOpacity={0.7}
        backdropTransitionInTiming={500}
        backdropTransitionOutTiming={1}
      >
        <ScrollView
          style={{
            width: 200,
            backgroundColor: "white",
            alignSelf: "center",
            borderRadius: 20,
          }}
        >
          {productCategories.map((item) => {
            return (
              <TouchableOpacity
                key={Math.random() * 9999}
                style={{
                  height: 50,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={() => {
                  setProduct_category(item);
                  toggleModal();
                }}
              >
                <Text>{item.name}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </Modal>
    </>
  );
};

export default ProductScreen;
