import {
  View,
  TextInput,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState, useLayoutEffect, useContext } from "react";

import ScreenHeader from "../components/ScreenHeader";
import ProductContainer from "../components/ProductContainer";
import LoadingIndicator from "../components/LoadingIndicator";
import { TokenContext } from "../context/TokenContext";

const SearchScreen = ({ navigation, route }) => {
  const copyToMealElement = route.params.copyToMealElement;
  const { token } = useContext(TokenContext);

  const [name, setName] = useState("");
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);

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
      setData(json.content);
    } catch (error) {
      createErrorAlert("Ошибка при поиске на сервере");
    } finally {
      setLoading(false);
    }
  };

  const action = (obj) => {
    copyToMealElement(obj);
    navigation.goBack();
  };

  useLayoutEffect(() => {
    searchByName();
  }, [name]);

  return (
    <View style={{ flex: 1 }}>
      <ScreenHeader /*                                 Шапка*/
        canGoBack={true}
        title={"Поиск"}
        action="none"
      />
      <View style={{ margin: 10, flex: 1 }}>
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
          placeholder="Введите название приема пищи"
        />
        {isLoading ? (
          <LoadingIndicator />
        ) : (
          <>
            {!data && <Text>Ничего не найдено</Text>}
            <FlatList
              style={{ height: "80%" }}
              data={data}
              keyExtractor={(item) => item.id}
              renderItem={(item) => {
                return (
                  <ProductContainer
                    item={item.item}
                    action={() => action(item.item)}
                  />
                );
              }}
            />
          </>
        )}
      </View>
    </View>
  );
};

export default SearchScreen;
