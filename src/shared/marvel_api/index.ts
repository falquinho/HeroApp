import axios from "axios";
import Config from "react-native-config";
import { GenericObject } from "../types/GenericObject";

const apikey = Config.MARVEL_PUB_KEY;

const axiosInstance = axios.create({
  baseURL: Config.MARVEL_API_URL
})

export const paramsWithAuth = (params?: GenericObject): GenericObject  => ({
  ...(params || {}),
  apikey,
})

export const getCharacters = () => {
  axiosInstance.get('', { params: paramsWithAuth() })
}