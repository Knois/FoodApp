import { View, Text } from "react-native";
import React from "react";
import SearchInput from "../components/SearchInput";
import ScreenHeader from "../components/ScreenHeader";

const SearchScreen = ({ navigation, route }) => {
  return (
    <View>
      <SearchInput
        copyToMealElement={route.params.copyToMealElement}
        navigation={navigation}
      />
    </View>
  );
};

export default SearchScreen;
