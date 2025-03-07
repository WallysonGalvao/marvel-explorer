import axios from "axios";
import Constants from "expo-constants";
import md5 from "md5";

const timestamp = new Date().getTime();
const privateKey = Constants.expoConfig?.extra?.privateKey;
const publicKey = Constants.expoConfig?.extra?.publicKey;
const hash = md5(timestamp + privateKey + publicKey);

const api = axios.create({
  baseURL: Constants.expoConfig?.extra?.baseURL,
  params: {
    hash,
    apikey: publicKey,
    ts: timestamp,
  },
});

export default api;
