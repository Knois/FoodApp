import { useContext, useEffect } from "react";
import * as SecureStore from "expo-secure-store";

import { AppContext } from "../../context/AppContext";
import LoadingIndicator from "../../components/LoadingIndicator";

const AuthLoading = ({ navigation }) => {
  const { setAuth } = useContext(AppContext);

  const checkLoginState = async () => {
    const userToken = await SecureStore.getItemAsync("token");
    console.log(userToken);
    userToken
      ? setAuth(true)
      : navigation.reset({
          index: 1,
          routes: [{ name: "SignIn" }],
        });
  };

  useEffect(() => {
    checkLoginState();
  }, []);

  return (
    <>
      <LoadingIndicator />
    </>
  );
};

export default AuthLoading;
