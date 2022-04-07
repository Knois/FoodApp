import {
  View,
  TextInput,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useState, useLayoutEffect } from "react";
import { token } from "../API/Constants";
import LoadingIndicator from "./LoadingIndicator";

const SearchInput = ({ navigation, copyToMealElement }) => {
  const [name, setName] = useState("");
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const searchByName = async () => {
    setLoading(true);
    const url =
      "http://80.87.193.6:8079/v1.0/dish/search?search=name%3A" +
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
      console.log(json);
      setData(json.content);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useLayoutEffect(() => {
    console.log("useLayoutEffect started, name is " + name);
    searchByName();
  }, [name]);

  return (
    <View>
      <TextInput
        style={{
          borderWidth: 0.5,
          backgroundColor: "#f9f2d9d9",
          alignSelf: "center",
          width: "50%",
          margin: 15,
          padding: 5,
        }}
        onChangeText={(value) => {
          setName(value);
        }}
        value={name}
      />
      {isLoading ? (
        <LoadingIndicator />
      ) : (
        <FlatList
          style={{ height: "80%" }}
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={(item) => {
            return (
              <TouchableOpacity
                style={{ borderWidth: 1, margin: 5, padding: 5 }}
                onPress={() => {
                  copyToMealElement(item.item);
                  navigation.goBack();
                }}
              >
                <Text>Name :{item.item.name}</Text>
                <Text>Calories :{item.item.calories}</Text>
              </TouchableOpacity>
            );
          }}
        />
      )}
    </View>
  );
};

export default SearchInput;
