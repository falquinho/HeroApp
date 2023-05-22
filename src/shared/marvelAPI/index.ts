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
import useSWR, { KeyedMutator, mutate } from "swr";


const axiosInstance = axios.create({
  baseURL: MARVEL_API_URL
})

const paramsWithAuth = (params: GenericObject = {}): GenericObject  => { 
  const ts = "timestampis" + Date.now();

  return({
  ...params,
  apikey: MARVEL_PUB_KEY,
  ts,
  hash: MD5(ts + MARVEL_PRIV_KEY + MARVEL_PUB_KEY).toString(),
})}


const buildSearchParam = (searchTerm: string): GenericObject => {
  const param: GenericObject = {};
  !!searchTerm && (param["nameStartsWith"] = searchTerm);
  return param;
}


const buildPaginationParams = (page: number): GenericObject => ({
  limit: 4,
  offset: (page - 1) * 4,
})


const getCharacters = async (page: number = 1, searchName: string = ""): Promise<CharacterDataContainer> => {
  const params = paramsWithAuth({
    ...buildPaginationParams(page),
    ...buildSearchParam(searchName),
  });

  const res: AxiosResponse<CharacterDataWrapperType> = await axiosInstance.get(
    '/v1/public/characters',
    { params }
  );
  return res.data.data;
}


type CharacterPageSWR = {
  characters: Array<Character> | undefined,
  error: AxiosError,
  isLoading: boolean,
  totalNumPages: number,
  mutate: KeyedMutator<any>,
}
const useCharacterPageSWR = (page: number = 1, name: string = ""): CharacterPageSWR => {
  const { data, error, isLoading, mutate } = useSWR(
    ['/v1/public/characters', page, name],
    _ => getCharacters(page, name).then(data => data)
  );
  return ({
    characters: data?.results,
    error,
    isLoading,
    totalNumPages: (data && Math.ceil(data.total / data.limit)) || 1,
    mutate,
  });
}


const refreshCharacterPageSWR = (page: number = 1, name: string = "") => {
  mutate(['/v1/public/characters', page, name]);
}


export default {
  paramsWithAuth,
  useCharacterPageSWR,
  refreshCharacterPageSWR,
}