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
                      padding: 10,
                      borderRadius: 5,
                      borderColor: "#645fb1",
                    }}
                    onPress={() => {
                      copyToMealElement(item.item);
                      navigation.goBack();
                    }}
                  >
                    <Text>{item.item.name}</Text>
                    <Text>Калории : {item.item.calories}</Text>
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
