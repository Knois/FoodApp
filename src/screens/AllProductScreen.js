import {
  View,
  TextInput,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState, useLayoutEffect, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";

import ScreenHeader from "../components/ScreenHeader";
import LoadingIndicator from "../components/LoadingIndicator";
import ContainerProduct from "../components/ContainerProduct";
import { getTokenFromStore } from "../methods/SecureStoreMethods";
import { setNeedRefreshFalse } from "../redux/slices/needRefreshSlice";

const AllProductScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();

  const needRefresh = useSelector((state) => state.needRefresh.value);
  const [name, setName] = useState("");
  const [dataAll, setDataAll] = useState([]);
  const [dataSearch, setDataSearch] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [showMy, setShowMy] = useState(true);

  const createErrorAlert = (message) => {
    Alert.alert("Ошибка", message, [{ text: "ОК", onPress: () => null }], {
      cancelable: true,
    });
  };

  const searchByName = async () => {
    if (!isLoading) setLoading(true);
    let token = await getTokenFromStore();

    const url =
      "http://80.87.201.75:8079/gateway/my-food/product/search?search=name%3A" +
      encodeURI(name) +
      "&size=99999";

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();
      setDataSearch(json.content);
      setLoading(false);
    } catch (error) {
      createErrorAlert("Ошибка при поиске на сервере");
      setLoading(false);
    } finally {
    }
  };

  const getMyProducts = async () => {
    if (!isLoading) setLoading(true);
    let token = await getTokenFromStore();
    const url =
      "http://80.87.201.75:8079/gateway/my-food/product?page=0&size=99999";

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();
      setDataAll(json.content);
      setLoading(false);
    } catch (error) {
      createErrorAlert("Ошибка при запросе всех продуктов");
      setLoading(false);
    } finally {
    }
  };

  const goToProductScreen = (item) => {
    navigation.navigate("ProductScreen", { item: item });
  };

  useLayoutEffect(() => {
    getMyProducts();
  }, []);

  useEffect(() => {
    searchByName();
  }, [name]);

  useEffect(() => {
    if (needRefresh) {
      getMyProducts();
      dispatch(setNeedRefreshFalse());
    }
  }, [needRefresh]);

  return (
    <View style={{ flex: 1 }}>
      <ScreenHeader /*                                 Шапка*/
        canGoBack={false}
        title={showMy ? "Мои продукты" : "Все продукты"}
        action={() => setShowMy(!showMy)}
        rightIcon={showMy ? "library-outline" : "cube-outline"}
      />
      <View style={{ margin: 10, flex: 1 }}>
        {!showMy && (
          <TextInput /*                                 Ввод названия продукта*/
            style={{
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
              marginBottom: 5,
            }}
            onChangeText={(value) => {
              setName(value);
            }}
            value={name}
            autoCapitalize="sentences"
            placeholder="Введите название продукта"
          />
        )}
        {isLoading ? (
          <LoadingIndicator />
        ) : (
          <>
            {!dataAll && <Text>Ничего не найдено</Text>}
            <FlatList
              style={{ height: "80%" }}
              data={showMy ? dataAll : dataSearch}
              keyExtractor={(item) => item.id}
              renderItem={(item) => {
                return (
                  <ContainerProduct
                    item={item.item}
                    action={goToProductScreen}
                  />
                );
              }}
            />
          </>
        )}
      </View>
      <TouchableOpacity /*                                                    Кнопка добавления элементов приема пищи*/
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
          navigation.navigate("ProductScreen", {
            item: null,
          });
        }}
      >
        <Ionicons name="add-outline" size={40} color="#645fb1" />
      </TouchableOpacity>
    </View>
  );
};

export default AllProductScreen;
