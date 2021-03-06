import {
  useWindowDimensions,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Camera } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";

import ScreenHeader from "../components/ScreenHeader";

const CameraScreen = ({ navigation, route }) => {
  const window = useWindowDimensions();

  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const changeCamera = () => {
    setType(
      type === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  const takePhoto = async () => {
    if (this.camera) {
      let photo = await this.camera.takePictureAsync({
        skipProcessing: false,
        base64: true,
      });
      route.params.setImage_base64(photo.base64);
      route.params.setImage_url(null);
      navigation.goBack();
    }
  };

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return (
      <View style={{ flex: 1 }}>
        <ScreenHeader /*                                 Шапка*/
          canGoBack={true}
          title="Камера"
          action="none"
          rightIcon="camera-reverse-outline"
        />
        <View
          style={{ flex: 1, justifyContent: "center", alignContent: "center" }}
        >
          <Text
            style={{ textAlign: "center", marginBottom: 10, color: "#645fb1" }}
          >
            НЕТ ДОСТУПА К КАМЕРЕ
          </Text>

          <TouchableOpacity
            style={{
              backgroundColor: "#d8d6ed",
              width: "60%",
              alignItems: "center",
              justifyContent: "center",
              alignSelf: "center",
              marginBottom: 50,
              borderRadius: 10,
            }}
            onPress={takePhoto}
          >
            <Text
              style={{
                margin: 10,
                fontSize: 16,
                fontWeight: "bold",
                textAlign: "center",
                marginBottom: 10,
                color: "#645fb1",
              }}
            >
              Запросить{`\n`}разрешение
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <ScreenHeader /*                                 Шапка*/
        canGoBack={true}
        title="Камера"
        action={changeCamera}
        rightIcon="camera-reverse-outline"
      />
      <Camera
        ratio="16:9"
        pictureSize="1280x720"
        type={type}
        ref={(ref) => {
          this.camera = ref;
        }}
      >
        <View style={{ width: window.width, height: (window.width / 9) * 16 }}>
          <View style={{ bottom: -(window.height / 1.3) }}>
            <TouchableOpacity
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
              onPress={takePhoto}
            >
              <Ionicons name="checkmark" size={30} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </Camera>
    </View>
  );
};

export default CameraScreen;
