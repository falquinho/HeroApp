import { ComicList } from "./ComicList";
import { EventList } from "./EventList";
import { MarvelImage } from "./MarvelImage";
import { MarvelUrl } from "./MarvelUrl";
import { SeriesList } from "./SeriesList";
import { StoryList } from "./StoryList";

export type Character = {
  id: number,
  name: string,
  description: string,
  modified: Date,
  resourceURI: string,
  urls: Array<MarvelUrl>,
  thumbnail: MarvelImage,
  comics: ComicList,
  stories: StoryList,
  events: EventList,
  series: SeriesList,
}