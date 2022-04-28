import React, { useState, useLayoutEffect } from "react";
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  useWindowDimensions,
  Alert,
} from "react-native";
import Modal from "react-native-modal";
import { Ionicons } from "@expo/vector-icons";
import MealContainer from "../components/MealContainer";
import { token, serverAddress } from "../constants/Constants";
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
        serverAddress +
          "/v1.0/meal/findByDate?date=" +
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
      const response = await fetch(serverAddress + "/v1.0/meal/" + id, {
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

  const createTwoButtonAlert = (id) =>
    Alert.alert(
      "Удаление приема пищи",
      "Подтверждаете удаление?",
      [
        {
          text: "Отмена",
          style: "cancel",
        },
        { text: "ОК", onPress: () => deleteMeal(id) },
      ],
      {
        cancelable: true,
      }
    );

  let isFocused = useIsFocused();

  useLayoutEffect(() => {
    if (isFocused) {
      getAllMeals();
    }
  }, [urlDate, isFocused]);

  return (
    <>
      <View style={{ flex: 1 }}>
        <ScreenHeader
          canGoBack={false}
          title="Расписание питания"
          action={getAllMeals}
          rightIcon="refresh"
        />
        {isLoading ? (
          <LoadingIndicator />
        ) : (
          <>
            <View style={{ margin: 10, flex: 1 }}>
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
                    <Ionicons
                      name="calendar-outline"
                      size={30}
                      color="#645fb1"
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <View /*                                 Блок статистики       */
                style={{
                  marginVertical: 15,
                  backgroundColor: "#d8d6ed",
                  borderRadius: 10,
                  width: "100%",
                  height: (window.height - window.height / 9) / 7,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontWeight: "bold", color: "#645fb1" }}>
                  Место под статистику
                </Text>
              </View>

              <FlatList /*                                 Список полученных приемов пищи       */
                style={{
                  height: (window.height - window.height / 9) / 1.7,
                }}
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={(item) => {
                  return (
                    <MealContainer
                      item={item.item}
                      navigation={navigation}
                      action={createTwoButtonAlert}
                    />
                  );
                }}
              />
              <TouchableOpacity /*                                 Кнопка создания приема пищи, переход на другой экран       */
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
                  navigation.navigate("MealScreen", {
                    mealID: null,
                    urlDate: urlDate,
                  });
                }}
              >
                <Ionicons name="add-outline" size={40} color="#645fb1" />
              </TouchableOpacity>

              <Modal /*                                 Модальное окно с календарем       */
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
                <DatePicker
                  onDateChange={(date) => {
                    if (dateFormatted(date) == urlDate) {
                      getAllMeals();
                      toggleModal();
                    }
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
                    textHeaderColor: "#645fb1",
                    textDefaultColor: "#645fb1",
                    selectedTextColor: "white",
                    mainColor: "#645fb1",
                    textSecondaryColor: "#645fb1",
                    borderColor: "#645fb1",
                  }}
                />
                <TouchableOpacity
                  style={{
                    backgroundColor: "#645fb1",
                    padding: 10,
                    alignItems: "center",
                  }}
                  onPress={() => {
                    toggleModal();
                  }}
                >
                  <Text style={{ color: "white" }}>Закрыть календарь</Text>
                </TouchableOpacity>
              </Modal>
            </View>
          </>
        )}
      </View>
    </>
  );
};
export default MainScreen;
