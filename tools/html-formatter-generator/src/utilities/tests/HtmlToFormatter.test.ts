import HtmlFormatterPlugin from "../HTMLToFormatter";
import { testInputs } from "./HtmlToFormatter.testdata";

describe("generateFromInput tests", () => {
  testInputs.forEach((input) => {
    it(input.name, () => {
      const recieved = HtmlFormatterPlugin.generateFormatter(input.html, input.css, true);
      expect(recieved).toStrictEqual(input.expected);
    });
  });
});
