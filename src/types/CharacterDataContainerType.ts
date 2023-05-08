import { Character } from "./Character";

export type CharacterDataContainer = {
  offset: number,
  limit: number,
  total: number,
  count: number,
  results: Array<Character>,
}