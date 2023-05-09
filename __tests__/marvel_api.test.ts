import {
  MARVEL_PUB_KEY,
  MARVEL_PRIV_KEY,
} from "@env";
import mockAxios from "jest-mock-axios";
import marvelAPI from "../src/shared/marvelAPI";
import { CharacterDataWrapperType } from "../src/types/CharacterDataWrapperType";
import MD5 from "crypto-js/md5";


afterEach(() => {
  mockAxios.reset();
})

Date.now = jest.fn(() => 9999);


describe("marvelAPI.paramsWithAuth", () => {
  describe("given no parameter or object parameter", () => {
    const resA = marvelAPI.paramsWithAuth();
    const resB = marvelAPI.paramsWithAuth({ test: 'test' });

    it.each([[resA], [resB]])("should return an object.", (res) => {
      expect(typeof res).toBe("object");
    });

    it.each([[resA], [resB]])("returned object should have defined member 'apikey'.", (res) => {
      expect(res).toHaveProperty('apikey');
      expect(res.apikey).toBeDefined();
    });

    it.each([[resA], [resB]])("returned object should have defined member 'ts'.", (res) => {
      expect(res).toHaveProperty('ts');
      expect(res.ts).toBeDefined();
    });

    it.each([[resA], [resB]])("returned object should have defined member 'hash'.", (res) => {
      expect(res).toHaveProperty('hash');
      expect(res.hash).toBeDefined();
    });

    it.each([[resA], [resB]])("returned object member 'hash' should be a MD5 of composed string 'ts' + 'privateKey' + 'publicKey'.", (res) => {
      expect(res.hash).toStrictEqual(
        MD5("" + Date.now() + MARVEL_PRIV_KEY + MARVEL_PUB_KEY)
      );
    });
  });

  describe("given an object as parameter", () => {
    const param = { test: 'test' }
    const res = marvelAPI.paramsWithAuth(param);

    it("should return object that is exactly the parameter merged with the auth attributes.", () => {
      expect(res).toStrictEqual({
        ...param, 
        ...{
          apikey: MARVEL_PUB_KEY,
          ts: "" + Date.now(),
          hash: MD5("" + Date.now() + MARVEL_PRIV_KEY + MARVEL_PUB_KEY),
        }
      });
    });
  })
}); // END OF marvelAPI.paramsWithAuth TESTS


describe("marvelAPI.getCharacters", () => {
  describe("given no parameter, only page or page and searchTerm", () => {
    it.each([
      [undefined, undefined],
      [1, undefined],
      [1, "sp"],
    ])("should resolve to an object of type CharacterDataContainer.", (page, searchTerm) => {
      marvelAPI.getCharacters().then(data => {
        expect(data).toEqual({
          count: 0,
          limit: 20,
          offset: 0,
          total: 0,
          results: [],
        });
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
    });
  });
}); // END OF marvelAPI.getCharacters TESTS
