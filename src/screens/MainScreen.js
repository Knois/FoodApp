import React, { useState, useLayoutEffect, useEffect } from "react";
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
import DatePicker from "react-native-modern-datepicker";
import { useSelector, useDispatch } from "react-redux";

import {
  setNeedRefreshFalse,
  setNeedRefreshTrue,
} from "../redux/slices/needRefreshSlice";

import ContainerMeal from "../components/ContainerMeal";
import {
  dateFormatted,
  dateToNormalDate,
  dateToWeekDay,
} from "../methods/DateMethods";
import LoadingIndicator from "../components/LoadingIndicator";
import ScreenHeader from "../components/ScreenHeader";
import BackModalButton from "../components/BackModalButton";
import TitleModal from "../components/TitleModal";
import { getTokenFromStore } from "../methods/SecureStoreMethods";

const MainScreen = ({ navigation, route }) => {
  const window = useWindowDimensions();
  const dispatch = useDispatch();

  const needRefresh = useSelector((state) => state.needRefresh.value);
  const [isLoading, setLoading] = useState(false);
  const [meals, setMeals] = useState([]);
  const [urlDate, setUrlDate] = useState(dateFormatted());
  const [isVisible, setVisible] = useState(false);

  const toggleModal = () => {
    setVisible(!isVisible);
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

  const getAllMeals = async (urlDate) => {
    if (!isLoading) setLoading(true);
    let token = await getTokenFromStore();

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
    let token = await getTokenFromStore();

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
      if (response.status == 200) {
        dispatch(setNeedRefreshTrue());
      }
    } catch (error) {
      createErrorAlert("Произошла ошибка при попытке удалить прием пищи");
      setLoading(false);
    } finally {
    }
  };

  useLayoutEffect(() => {
    getAllMeals(urlDate);
  }, [urlDate]);

  useEffect(() => {
    if (needRefresh) {
      getAllMeals(urlDate);
      dispatch(setNeedRefreshFalse());
    }
  }, [needRefresh]);

  return (
    <>
      <View style={{ flex: 1 }}>
        <>
          <ScreenHeader
            canGoBack={false}
            title="Расписание питания"
            action={toggleModal}
            rightIcon="calendar-outline"
          />
          <View style={{ margin: 10, flex: 1 }}>
            <View /*                                 Дата         */
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
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
