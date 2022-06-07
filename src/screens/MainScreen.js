import React, { useState, useLayoutEffect, useContext } from "react";
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
import { useIsFocused } from "@react-navigation/native";
import DatePicker from "react-native-modern-datepicker";

import ContainerMeal from "../components/ContainerMeal";
import {
  dateFormatted,
  dateToNormalDate,
  dateToWeekDay,
} from "../methods/DateMethods";
import LoadingIndicator from "../components/LoadingIndicator";
import ScreenHeader from "../components/ScreenHeader";
import { TokenContext } from "../context/TokenContext";
import BackModalButton from "../components/BackModalButton";
import TitleModal from "../components/TitleModal";

const MainScreen = ({ navigation, route }) => {
  const { token } = useContext(TokenContext);

  const [isLoading, setLoading] = useState(false);
  const [meals, setMeals] = useState([]);
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
        "http://80.87.201.75:8079/gateway/my-food/meal/findByDate?date=" +
          urlDate +
          "&size=999&sort=dateTime%2Casc",
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );
      const json = await response.json();
      if (json.content) {
        setMeals(json.content);
      }
    } catch (error) {
      createErrorAlert(
        "Произошла ошибка при попытке получить приемы пищи с сервера"
      );
    } finally {
      setLoading(false);
    }
  };

  const deleteMeal = async (id) => {
    if (!isLoading) setLoading(true);

    try {
      const response = await fetch(
        "http://80.87.201.75:8079/gateway/my-food/meal/" + id,
        {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );
      const json = await response;
    } catch (error) {
      createErrorAlert("Произошла ошибка при попытке удалить прием пищи");
    } finally {
      getAllMeals();
    }
  };

  const createErrorAlert = (message) => {
    Alert.alert(
      "Ошибка при запросе на сервер",
      message,
      [{ text: "ОК", onPress: () => null }],
      {
        cancelable: true,
      }
    );
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
        <>
          <ScreenHeader
            canGoBack={false}
            title="Расписание питания"
            action={getAllMeals}
            rightIcon="refresh"
          />
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
                  <Ionicons name="calendar-outline" size={30} color="#645fb1" />
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
              {isLoading ? (
                <LoadingIndicator />
              ) : (
                <Text style={{ fontWeight: "bold", color: "#645fb1" }}>
                  Место под статистику
                </Text>
              )}
            </View>
            <View
              style={{
                flex: 1,
              }}
            >
              {isLoading ? (
                <LoadingIndicator />
              ) : (
                <FlatList /*                                 Список полученных приемов пищи       */
                  data={meals}
                  keyExtractor={(item) => item.id}
                  renderItem={(item) => {
                    return (
                      <ContainerMeal
                        item={item.item}
                        navigation={navigation}
                        action={createTwoButtonAlert}
                      />
                    );
                  }}
                />
              )}
            </View>

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
          </View>
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
            <TitleModal title="Укажите дату" />
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
              maximumDate="2999-01-01"
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
            <BackModalButton action={toggleModal} />
          </Modal>
        </>
      </View>
    </>
  );
};
export default MainScreen;
