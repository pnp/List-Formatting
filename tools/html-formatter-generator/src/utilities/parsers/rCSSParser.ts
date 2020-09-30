import { calculate as calculateSpecificity, SpecificityArray } from "specificity";

enum CaptureGroup {
  comment = 1,
  selector = 2,
  end = 3,
  attr = 4,
}

const regexes: { [x: string]: RegExp } = {
  comment: /\/\*[\s\S]*?\*\//g,
  selector: /([^\s\;\{\}][^\;\{\}]*)\{/g,
  end: /\}/g,
  line: /([^\;\{\}]*)\;/g,
  lineAttr: /([^\:]+):([^\;]*);/,
  alternation: /(\/\*[\s\S]*?\*\/)|([^\s\;\{\}][^\;\{\}]*(?=\{))|(\})|([^\;\{\}]+\;(?!\s*\*\/))/gim,
};

class Utils {
  public static isEmpty = (x: any) => {
    return !x || !x.length;
  };

  public static timestamp = () => {
    return Date.now();
  };
}

export interface IStyleObject {
  selector: string;
  specificity: SpecificityArray;
  order: number;
  attributes: { [label: string]: string | number };
}

export interface ParserOptions {
  comments: boolean;
  split: boolean;
}

export interface CSSObject {
  rules: { [sel: string]: IStyleObject };
  comments: string[];
}

export class CSSParser {
  /**
   * Input is css string and current pos, returns JSON object
   * @param cssString
   *    The CSS string.
   * @param options
   *    ParserOptions
   */
  public static toJSON = (
    cssString: string,
    options: ParserOptions = { comments: false, split: true }
  ): CSSObject => {
    let match = null;
    let selectorOrderCount = 0;

    const parsed: CSSObject = { rules: {}, comments: [] };
    // remove comments in the css if comments are not needed.
    if (!options.comments) {
      cssString = cssString.replace(regexes.comment, "");
    }

    while ((match = regexes.alternation.exec(cssString)) != null) {
      // comment is at match[1] : using the capture group in the alt regex
      if (!Utils.isEmpty(match[CaptureGroup.comment]) && options.comments) {
        const add = match[CaptureGroup.comment].trim();
        parsed.comments.push(add);
      }
      // selector node at match[2] : we recurse till we find a closing brace
      else if (!Utils.isEmpty(match[CaptureGroup.selector])) {
        const selectors = match[CaptureGroup.selector].trim();
        const attributes = CSSParser.captureAttributes(cssString);

        selectorOrderCount++;

        let selectorList = selectors.split(",");
        for (let selector of selectorList) {
          selector = selector.trim();
          if (parsed.rules[selector]) {
            for (const att in attributes) {
              parsed.rules[selector].attributes[att] = attributes[att];
            }
          } else {
            const specificity = calculateSpecificity(selector)[0].specificityArray;
            parsed.rules[selector] = {
              selector,
              attributes,
              specificity,
              order: selectorOrderCount,
            };
          }
        }
      }
    }

    return parsed;
  };

  private static captureAttributes = (cssString: string): { [label: string]: string } => {
    let match = null;
    const attributes: { [label: string]: string } = {};

    while ((match = regexes.alternation.exec(cssString)) != null) {
      // attribute at match [4] : recursively cature and append to
      if (!Utils.isEmpty(match[CaptureGroup.attr])) {
        const line = match[CaptureGroup.attr].trim();
        const attr = regexes.lineAttr.exec(line);
        // attribute
        if (attr) {
          const name: string = attr[1].trim();
          const value = attr[2].trim();
          attributes[name] = value;
        }
      }
      // found the end
      else if (!Utils.isEmpty(match[CaptureGroup.end])) {
        return attributes;
      } else {
        break;
      }
    }
    return attributes;
  };
}
