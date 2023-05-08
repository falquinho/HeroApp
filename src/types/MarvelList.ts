export type MarvelList<ItemType> = {
  available: number,
  returned: number,
  collectionURI: string,
  items: Array<ItemType>,
}