import {
  View,
  TextInput,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState, useLayoutEffect, useEffect, useContext } from "react";

import ScreenHeader from "../components/ScreenHeader";
import LoadingIndicator from "../components/LoadingIndicator";
import { TokenContext } from "../context/TokenContext";

const ProductScreen = ({ navigation, route }) => {
  const { token } = useContext(TokenContext);

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
    setLoading(true);

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
    } catch (error) {
      createErrorAlert("Ошибка при поиске на сервере");
    } finally {
      setLoading(false);
    }
  };

  const getAll = async () => {
    setLoading(true);

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
    } catch (error) {
      createErrorAlert("Ошибка при запросе всех продуктов");
    } finally {
      setLoading(false);
    }
  };

  useLayoutEffect(() => {
    getAll();
  }, []);

  useEffect(() => {
    searchByName();
  }, [name]);

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
          <TextInput /*                                 Ввод названия блюда*/
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
                  <TouchableOpacity
                    style={{
                      borderWidth: 0.5,
                      marginVertical: 5,
                      padding: 5,
                      borderRadius: 5,
                      borderColor: "#645fb1",
                    }}
                    onPress={() => {
                      console.log(item.item);
                    }}
                  >
                    <View style={{ flexDirection: "column" }}>
                      <Text
                        style={{
                          textAlign: "center",
                          color: "#645fb1",
                          fontWeight: "bold",
                        }}
                      >
                        {item.item.name}
                      </Text>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignSelf: "center",
                          marginTop: 5,
                        }}
                      >
                        <Text style={{ width: "20%", color: "#645fb1" }}>
                          К : {item.item.calories}
                        </Text>
                        <Text style={{ width: "20%", color: "#645fb1" }}>
                          Б : {item.item.proteins}
                        </Text>
                        <Text style={{ width: "20%", color: "#645fb1" }}>
                          Ж : {item.item.fats}
                        </Text>
                        <Text style={{ width: "20%", color: "#645fb1" }}>
                          У : {item.item.carbohydrates}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          </>
        )}
      </View>
    </View>
  );
};

export default ProductScreen;
