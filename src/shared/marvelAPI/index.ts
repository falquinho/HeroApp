import {
  MARVEL_API_URL,
  MARVEL_PUB_KEY,
  MARVEL_PRIV_KEY,
} from "@env";
import axios, { AxiosError, AxiosResponse } from "axios";
import MD5 from "crypto-js/md5";
import { Character } from "../../types/Character";
import { CharacterDataContainer } from "../../types/CharacterDataContainerType";
import { CharacterDataWrapperType } from "../../types/CharacterDataWrapperType";
import { GenericObject } from "../../types/GenericObject";


const axiosInstance = axios.create({
  baseURL: MARVEL_API_URL
})

const paramsWithAuth = (params?: GenericObject): GenericObject  => { 
  const ts = "timestampis" + Date.now();

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

  const res: AxiosResponse<CharacterDataWrapperType> = await axiosInstance.get(
    '/v1/public/characters',
    { params }
  );
  return res.data.data;
}


export const buildCharacterPageDataFetcher = (config: {
  characterDataSetter: (characters: Character[]) => void,
  onError: (error: AxiosError) => void,
  pageSetter?: (page: number) => void,
  totalPagesSetter?: (pages: number) => void,
  loadingSetter?: (isLoading: boolean) => void,
}): (page?: number, search?: string) => void => {
  const {
    characterDataSetter,
    onError,
    pageSetter = _ => {},
    totalPagesSetter = _ => {},
    loadingSetter = _ => {},
  } = config;

  return (page: number = 1, search: string = '') => {
    loadingSetter(true);
    getCharacters(page, search)
    .then(res => {
      characterDataSetter(res.results);
      pageSetter(page);
      totalPagesSetter(Math.ceil(res.total / res.limit));
    })
    .catch(onError)
    .finally(() => {
      loadingSetter(false);
    })
  }
}


export default {
  paramsWithAuth,
  getCharacters,
}