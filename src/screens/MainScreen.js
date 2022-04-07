import React, { useState, useLayoutEffect } from "react";
import { Text, View, FlatList, Button, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import MealContainer from "../components/MealContainer";
import { token } from "../API/Constants";
import { dateFormatted } from "../methods/Simple";
import DatePicker from "react-native-modern-datepicker";
import LoadingIndicator from "../components/LoadingIndicator";
import { useIsFocused } from "@react-navigation/native";

const MainScreen = ({ navigation, route }) => {
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [urlDate, setUrlDate] = useState(dateFormatted());
  const [isVisible, setVisible] = useState(false);

  const toggleModal = () => {
    setVisible(!isVisible);
  };

  const getAllMeals = async () => {
    console.log("getAllMeal start and date is " + urlDate);
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

  let isFocused = useIsFocused();

  useLayoutEffect(() => {
    if (isFocused) {
      getAllMeals();
    }
  }, [urlDate, isFocused]);

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
                  toggleModal();
                }}
              >
                <Text>{urlDate}</Text>
              </TouchableOpacity>
              <View style={{ width: 100, alignSelf: "center" }}>
                <Button
                  title="Обновить"
                  onPress={() => {
                    getAllMeals();
                  }}
                />
              </View>
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
                  navigation.navigate("MealScreen", {
                    mealID: null,
                    urlDate: urlDate,
                  });
                }}
              />
              <Modal
                hideModalContentWhileAnimating={true}
                onBackButtonPress={() => {
                  toggleModal();
                }}
                onBackdropPress={() => {
                  toggleModal();
                }}
                isVisible={isVisible}
                animationIn="slideInUp"
                animationInTiming={500}
                animationOutTiming={500}
                backdropOpacity={0.7}
                backdropTransitionInTiming={1}
                backdropTransitionOutTiming={1}
              >
                <View
                  style={{
                    alignSelf: "center",
                    height: "70%",
                    width: "100%",
                    backgroundColor: "#FFFFFF",
                    justifyContent: "space-between",
                  }}
                >
                  <DatePicker
                    onSelectedChange={(date) => {
                      if (dateFormatted(date) !== urlDate) {
                        setUrlDate(dateFormatted(date));
                        toggleModal();
                      }
                    }}
                    minimumDate="2022-01-01"
                    maximumDate="2025-01-01"
                    current={urlDate}
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
                      toggleModal();
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
