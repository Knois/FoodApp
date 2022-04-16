import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Camera } from "expo-camera";

const CameraScreen = ({ navigation, route }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View>
      <Camera
        type={type}
        ref={(ref) => {
          this.camera = ref;
        }}
      >
        <View style={{ height: "100%" }}>
          <TouchableOpacity
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}
          >
            <Text> Flip </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ height: 100 }}
            onPress={async () => {
              if (this.camera) {
                let photo = await this.camera.takePictureAsync({
                  base64: true,
                });
                route.params.setImage_base64(photo.base64);
                navigation.goBack();
              }
            }}
          >
            <Text> take photo </Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
};

export default CameraScreen;
