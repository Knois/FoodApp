import {
  useWindowDimensions,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Camera } from "expo-camera";
import LoadingIndicator from "../components/LoadingIndicator";
import ScreenHeader from "../components/ScreenHeader";
import { Ionicons } from "@expo/vector-icons";

const CameraScreen = ({ navigation, route }) => {
  const window = useWindowDimensions();

  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [isLoading, setLoading] = useState(false);

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

  const changeCamera = () => {
    setType(
      type === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  const takePhoto = async () => {
    if (this.camera) {
      setLoading(true);
      let photo = await this.camera.takePictureAsync({
        base64: true,
      });
      route.params.setImage_base64(photo.base64);
      navigation.goBack();
    }
  };

  return (
    <View>
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
        <View style={{ height: "100%" }}>
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
