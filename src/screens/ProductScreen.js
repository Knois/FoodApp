import { View, Text } from "react-native";
import React from "react";
import ScreenHeader from "../components/ScreenHeader";

const ProductScreen = () => {
  return (
    <>
      <View style={{ flex: 1 }}>
        <>
          <ScreenHeader
            canGoBack={false}
            title="Продукты"
            action={() => null}
            rightIcon="refresh"
          />
        </>
      </View>
    </>
  );
};

export default ProductScreen;
