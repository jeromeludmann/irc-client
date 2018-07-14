import {
  selectServers,
  selectRoute,
  selectServer,
} from "@app/reducers/_selectors";
import { rootInitialState } from "@app/reducers";

describe("root selectors", () => {
  test("select servers", () => {
    expect(selectServers(rootInitialState)).toMatchSnapshot();
  });

  test("select route", () => {
    expect(selectRoute(rootInitialState)).toMatchSnapshot();
  });

  test("select server", () => {
    expect(selectServer(rootInitialState)).toMatchSnapshot();
  });
});
