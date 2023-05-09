import {
  MARVEL_API_URL,
  MARVEL_PUB_KEY,
  MARVEL_PRIV_KEY,
} from "@env";
import axios, { AxiosResponse } from "axios";
import MD5 from "crypto-js/md5";
import { CharacterDataContainer } from "../../types/CharacterDataContainerType";
import { CharacterDataWrapperType } from "../../types/CharacterDataWrapperType";
import { GenericObject } from "../../types/GenericObject";


const axiosInstance = axios.create({
  baseURL: MARVEL_API_URL
})

const paramsWithAuth = (params?: GenericObject): GenericObject  => { 
  const ts = "" + Date.now();

  return({
  ...(params || {}),
  apikey: MARVEL_PUB_KEY,
  ts,
  hash: MD5(ts + MARVEL_PRIV_KEY + MARVEL_PUB_KEY).toString(),
})}

const getCharacters = async (page: number = 1, searchName: string = ""): Promise<CharacterDataContainer> => {
  const params = paramsWithAuth({
    limit: 4,
    offset: (page - 1) * 4,
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