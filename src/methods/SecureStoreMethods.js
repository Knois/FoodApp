import * as SecureStore from "expo-secure-store";

export const getTokenFromStore = async () => {
  let token = await SecureStore.getItemAsync("token");
  return token;
};

export const setTokenToStore = async (token) => {
  await SecureStore.setItemAsync("token", token);
};

export const deleteTokenFromStore = async () => {
  await SecureStore.deleteItemAsync("token");
};

export const getEmailFromStore = async () => {
  let email = await SecureStore.getItemAsync("email");
  return email;
};

export const setEmailToStore = async (email) => {
  await SecureStore.setItemAsync("email", email);
};

export const deleteEmailFromStore = async () => {
  await SecureStore.deleteItemAsync("email");
};

export const getPasswordFromStore = async () => {
  let password = await SecureStore.getItemAsync("password");
  return password;
};

export const setPasswordToStore = async (password) => {
  await SecureStore.setItemAsync("password", password);
};

export const deletePasswordFromStore = async () => {
  await SecureStore.deleteItemAsync("password");
};
