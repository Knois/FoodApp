import {
  View,
  TextInput,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useState, useLayoutEffect } from "react";

import ScreenHeader from "../components/ScreenHeader";
import { serverAddress, token } from "../constants/Constants";
import LoadingIndicator from "../components/LoadingIndicator";

const SearchScreen = ({ navigation, route }) => {
  const copyToMealElement = route.params.copyToMealElement;

  const [name, setName] = useState("");
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const searchByName = async () => {
    setLoading(true);
    const url =
      serverAddress +
      "/v1.0/dish/search?search=name%3A" +
      encodeURI(name) +
      "&size=50";
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: "Basic " + token,
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();
      setData(json.content);
    } catch (error) {
    } finally {
      setLoading(false);
    }
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
            {data == false && <Text>Ничего не найдено</Text>}
            <FlatList
              style={{ height: "80%" }}
              data={data}
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
                      copyToMealElement(item.item);
                      navigation.goBack();
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

export default SearchScreen;
