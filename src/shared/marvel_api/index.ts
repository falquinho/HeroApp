import axios, { AxiosResponse } from "axios";
import Config from "react-native-config";
import { CharacterDataContainer } from "../types/CharacterDataContainerType";
import { CharacterDataWrapperType } from "../types/CharacterDataWrapperType";
import { GenericObject } from "../types/GenericObject";

const apikey = Config.MARVEL_PUB_KEY;

const axiosInstance = axios.create({
  baseURL: Config.MARVEL_API_URL
})

export const paramsWithAuth = (params?: GenericObject): GenericObject  => ({
  ...(params || {}),
  apikey,
})

export const getCharacters = async (searchName?: string): Promise<CharacterDataContainer> => {
  const params = {
    limit: 4,
    ...(!!searchName && { nameStartsWith: searchName }) || {},
  };
  const res: AxiosResponse<CharacterDataWrapperType> = await axiosInstance.get(
    '/v1/public/characters',
    { params: paramsWithAuth(params) }
  );
  return res.data.data;
}