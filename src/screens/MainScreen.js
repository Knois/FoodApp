import React, { useState, useLayoutEffect } from "react";
import { Text, View, FlatList, Button, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import MealContainer from "../components/MealContainer";
import { token } from "../API/Constants";
import { dateFormatted } from "../methods/Simple";
import DatePicker, { getToday } from "react-native-modern-datepicker";
import LoadingIndicator from "../components/LoadingIndicator";

const MainScreen = ({ navigation }) => {
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [urlDate, setUrlDate] = useState(dateFormatted());
  const [utc, setUtc] = useState("Europe/Moscow");
  const [isVisible, setVisible] = useState(false);

  const getAllMeals = async () => {
    if (!isLoading) setLoading(true);
    try {
      const response = await fetch(
        "http://80.87.193.6:8079/v1.0/meal/findByDate?date=" +
          urlDate +
          "&timeZone=Europe%2FMoscow",
        {
          method: "GET",
          headers: {
            Authorization: "Basic " + token,
            "Content-Type": "application/json",
          },
        }
      );
      const json = await response.json();
      setData(json.content);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteMeal = async (id) => {
    setLoading(true);
    try {
      const response = await fetch("http://80.87.193.6:8079/v1.0/meal/" + id, {
        method: "DELETE",
        headers: {
          Authorization: "Basic " + token,
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();
    } catch (error) {
    } finally {
      getAllMeals();
      if (isLoading) setLoading(false);
    }
  };

  useLayoutEffect(() => {
    getAllMeals();
  }, [urlDate]);

  return (
    <>
      <View>
        {isLoading ? (
          <LoadingIndicator />
        ) : (
          <>
            <View>
              <TouchableOpacity
                style={{
                  alignSelf: "center",
                  margin: 5,
                  padding: 5,
                  borderWidth: 1,
                }}
                onPress={() => {
                  setVisible(true);
                }}
              >
                <Text>{urlDate}</Text>
              </TouchableOpacity>
              <FlatList
                style={{ height: 400 }}
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={(item) => {
                  return (
                    <MealContainer
                      item={item.item}
                      navigation={navigation}
                      deleteMeal={deleteMeal}
                    />
                  );
                }}
              />

              <Button
                title="Создать прием пищи"
                onPress={() => {
                  navigation.navigate("MealScreen", { mealID: null });
                }}
              />

              <Modal isVisible={isVisible} animationIn="pulse">
                <View>
                  <DatePicker
                    onSelectedChange={(date) => {
                      if (dateFormatted(date) !== urlDate) {
                        setUrlDate(dateFormatted(date));
                        setVisible(false);
                      }
                    }}
                    minimumDate="2022-01-01"
                    maximumDate="2025-01-01"
                    current={getToday()}
                    selected={urlDate}
                    mode="calendar"
                    options={{
                      headerAnimationDistance: 100,
                      daysAnimationDistance: 100,
                    }}
                  />
                  <Button
                    title="Закрыть календарь"
                    onPress={() => {
                      setVisible(false);
                    }}
                  />
                </View>
              </Modal>
            </View>
          </>
        )}
      </View>
    </>
  );
};
export default MainScreen;
