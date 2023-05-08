import Config from "react-native-config";
import mockAxios from "jest-mock-axios";
import marvelAPI from "../src/shared/marvelAPI";
import { CharacterDataWrapperType } from "../src/shared/types/CharacterDataWrapperType";


afterEach(() => {
  mockAxios.reset();
})

test("Given no parameter, 'paramsWithAuth' returns object with defined member 'apikey': ", () => {
  const res = marvelAPI.paramsWithAuth();
  expect(typeof res).toBe("object");
  expect(res).toHaveProperty('apikey');
  expect(res.apikey).toBe(Config.MARVEL_PUB_KEY);
});

test(
  "Given an object, 'paramssWithAuth' returns the object with additional defined attribute 'apikey'.",
  () => {
    const params = {
      param1: "value1",
      param2: "value2",
      param3: "value3",
    }

    const res = marvelAPI.paramsWithAuth(params);
    expect(res).toEqual({
      ...params,
      apikey: Config.MARVEL_PUB_KEY,
    });
  }
)

test(
  "Given no parameter, getCharacters should resolve to the list of all characters, limited to 4 per page.", 
  () => {
    marvelAPI.getCharacters().then(data => {
      expect(data).toBeDefined();
      expect(data.count).toBeLessThanOrEqual(4);
    });

    mockAxios.mockResponse({ 
      data: {
        attributionHTML: '',
        attributionText: '',
        code: 200,
        copyright: '',
        status: '200',
        etag: '',
        data: {
          count: 0,
          limit: 20,
          offset: 0,
          total: 0,
          results: [],
        }
      } as CharacterDataWrapperType
    });
  }
);

test(
  "Given a non-empty string, getCharacters should resolve to a whatever number of characters, limited to 4 per page.", 
  () => {
    marvelAPI.getCharacters("sp").then(data => {
      expect(data).toBeDefined();
      expect(data.count).toBeLessThanOrEqual(4);
    });

    mockAxios.mockResponse({ 
      data: {
        attributionHTML: '',
        attributionText: '',
        code: 200,
        copyright: '',
        status: '200',
        etag: '',
        data: {
          count: 0,
          limit: 20,
          offset: 0,
          total: 0,
          results: [],
        }
      } as CharacterDataWrapperType
    });
  }
);