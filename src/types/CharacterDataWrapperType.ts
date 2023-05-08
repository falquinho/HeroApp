import { CharacterDataContainer } from "./CharacterDataContainerType";

export type CharacterDataWrapperType = {
  code: number,
  status: string,
  copyright: string,
  attributionText: string,
  attributionHTML: string,
  data: CharacterDataContainer,
  etag: string,
}