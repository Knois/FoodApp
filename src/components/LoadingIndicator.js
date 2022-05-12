import { useWindowDimensions, View } from "react-native";
import React from "react";
import * as Progress from "react-native-progress";

const LoadingIndicator = () => {
  const window = useWindowDimensions();
  return (
    <View
      style={{
        height: "100%",
        alignSelf: "center",
        justifyContent: "center",
      }}
    >
      <Progress.Circle
        size={50}
        indeterminate={true}
        color="black"
        endAngle={0.8}
      />
    </View>
  );
};

export default LoadingIndicator;
