import React, { useState, useLayoutEffect } from "react";
import {
  Text,
  View,
  FlatList,
  Button,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import Modal from "react-native-modal";
import { Ionicons } from "@expo/vector-icons";
import MealContainer from "../components/MealContainer";
import { token } from "../constants/Constants";
import {
  dateFormatted,
  dateToNormalDate,
  dateToWeekDay,
} from "../methods/DateMethods";
import DatePicker from "react-native-modern-datepicker";
import LoadingIndicator from "../components/LoadingIndicator";
import { useIsFocused } from "@react-navigation/native";
import ScreenHeader from "../components/ScreenHeader";

const MainScreen = ({ navigation, route }) => {
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [urlDate, setUrlDate] = useState(dateFormatted());
  const [isVisible, setVisible] = useState(false);

  const window = useWindowDimensions();

  const toggleModal = () => {
    setVisible(!isVisible);
  };

  const getAllMeals = async () => {
    if (!isLoading) setLoading(true);
    try {
      const response = await fetch(
        "http://80.87.193.6:8079/v1.0/meal/findByDate?date=" +
          urlDate +
          "&size=999&sort=dateTime%2Casc",
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
        <ScreenHeader
          canGoBack={false}
          title="Расписание питания"
          action={getAllMeals}
          icon="refresh"
        />
        {isLoading ? (
          <LoadingIndicator />
        ) : (
          <>
            <View style={{ margin: 10 }}>
              <View /*                                 Дата и иконка календаря        */
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <View>
                  <Text style={{ fontWeight: "bold", color: "#645fb1" }}>
                    {dateToWeekDay(urlDate)},{" "}
                  </Text>
                  <Text style={{ color: "#645fb1" }}>
                    {dateToNormalDate(urlDate)}
                  </Text>
                </View>
                <View
                  style={{
                    alignItems: "center",
                    backgroundColor: "#d8d6ed",
                    borderRadius: 10,
                    width: 40,
                    height: 40,
                    padding: 5,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      toggleModal();
                    }}
                  >
                    <Ionicons name="calendar-outline" size={30} color="black" />
                  </TouchableOpacity>
                </View>
              </View>

              <View /*                                 Блок статистики       */
                style={{
                  marginVertical: 15,
                  borderWidth: 1,
                  borderRadius: 20,
                  width: "100%",
                  height: (window.height - window.height / 9) / 7,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text>Место под статистику</Text>
              </View>

              <FlatList /*                                 Список полученных приемов пищи       */
                style={{
                  height: (window.height - window.height / 9) / 1.7,
                  borderWidth: 1,
                }}
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
