import React, { useState, useLayoutEffect } from "react";
import {
  TextInput,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Button,
} from "react-native";
import MealContainer from "../components/MealContainer";
import { token } from "../API/Constants";
import { currentDateFormatted } from "../methods/Simple";

const createUrl = (date) => {
  let url =
    "http://80.87.193.6:8079/v1.0/meal/findByDate?date=" +
    date +
    "&timeZone=Europe%2FMoscow";
  return url;
};

const MainScreen = ({ navigation }) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [date, setDate] = useState(currentDateFormatted());
  const [url, setUrl] = useState(createUrl(date));
  const [utc, setUtc] = useState("Europe/Moscow");

  const getAllMeals = async () => {
    setLoading(true);
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
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useLayoutEffect(() => {
    getAllMeals();
  }, []);

  return (
    <>
      <View>
        {isLoading ? (
          <Text>Loading</Text>
        ) : (
          <>
            <View>
              <TextInput
                style={{
                  borderWidth: 0.5,
                  backgroundColor: "#f9f2d9d9",
                  alignSelf: "center",
                }}
                onChangeText={(value) => {
                  setDate(value);
                }}
                value={date}
              />
              <TextInput
                style={{
                  borderWidth: 0.5,
                  backgroundColor: "#f9f2d9d9",
                  alignSelf: "center",
                }}
                onChangeText={(value) => {
                  setUtc(value);
                }}
                value={utc}
              />

              <TouchableOpacity
                style={{ borderWidth: 1, alignSelf: "center" }}
                onPress={() => {
                  setUrl(createUrl(date));
                  getAllMeals();
                }}
              >
                <Text>Направить запрос</Text>
              </TouchableOpacity>

              <FlatList
                style={{ height: 400 }}
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={(item) => {
                  return (
                    <MealContainer item={item.item} navigation={navigation} />
                  );
                }}
              />

              <Button
                title="Создать прием пищи"
                onPress={() => {
                  navigation.navigate("MealScreen", { mealID: null });
                }}
              />
            </View>
          </>
        )}
      </View>
    </>
  );
};
export default MainScreen;
