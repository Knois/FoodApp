import { useWindowDimensions, View, Text } from "react-native";
import React from "react";
import { useSelector } from "react-redux";

const DailyStats = ({
  dailyCalories,
  dailyProteins,
  dailyFats,
  dailyCarbohydrates,
}) => {
  const window = useWindowDimensions();
  const userInfoProperties = useSelector(
    (state) => state.userInfoProperties.value
  );

  return (
    <View
      style={{
        marginVertical: 15,
        padding: 10,
        backgroundColor: "#d8d6ed",
        borderRadius: 10,
        width: "100%",
        height: (window.height - window.height / 9) / 7,
        justifyContent: "space-around",
      }}
    >
      <View
        style={{
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <Text style={{ fontWeight: "bold", color: "#645fb1" }}>
          Белки: {dailyProteins}
        </Text>
        <Text style={{ fontWeight: "bold", color: "#645fb1" }}>
          Жиры: {dailyFats}
        </Text>
      </View>
      <View
        style={{
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <Text style={{ fontWeight: "bold", color: "#645fb1" }}>
          Углеводы: {dailyCarbohydrates}
        </Text>
        <Text style={{ fontWeight: "bold", color: "#645fb1" }}>
          Калории: {dailyCalories}/
          {userInfoProperties.dayLimitCal ? userInfoProperties.dayLimitCal : 0}
        </Text>
      </View>
    </View>
  );
};

export default DailyStats;
