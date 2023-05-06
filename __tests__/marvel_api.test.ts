import Config from "react-native-config";
import { paramsWithAuth } from "../src/shared/marvel_api"

test("Given no parameter, 'paramsWithAuth' returns object with defined member 'apikey': ", () => {
  const res = paramsWithAuth();
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

    const res = paramsWithAuth(params);
    expect(res).toEqual({
      ...params,
      apikey: Config.MARVEL_PUB_KEY,
    });
  }
)