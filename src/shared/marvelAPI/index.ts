import { MARVEL_API_URL, MARVEL_PUB_KEY } from "@env";
import axios, { AxiosResponse } from "axios";
import { CharacterDataContainer } from "../../types/CharacterDataContainerType";
import { CharacterDataWrapperType } from "../../types/CharacterDataWrapperType";
import { GenericObject } from "../../types/GenericObject";


const axiosInstance = axios.create({
  baseURL: MARVEL_API_URL
})

const paramsWithAuth = (params?: GenericObject): GenericObject  => ({
  ...(params || {}),
  apikey: MARVEL_PUB_KEY,
})

const getCharacters = async (searchName?: string): Promise<CharacterDataContainer> => {
  const params = paramsWithAuth({
    limit: 4,
    ...(!!searchName && { nameStartsWith: searchName }) || {},
  });

  console.log('params: ', params);

  const res: AxiosResponse<CharacterDataWrapperType> = await axiosInstance.get(
    '/v1/public/characters',
    { params }
  );
  return res.data.data;
}

export default {
  paramsWithAuth,
  getCharacters,
}