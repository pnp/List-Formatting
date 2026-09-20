import HtmlFormatterPlugin from "../HTMLToFormatter";
import { testInputs } from "./HtmlToFormatter.testdata";

describe("generateFromInput tests", () => {
  testInputs.forEach((input) => {
    it(input.name, () => {
      const result = HtmlFormatterPlugin.generateFormatter(input.html, input.css);
      expect(result.json).toStrictEqual(input.expected);
    });
  });
});
