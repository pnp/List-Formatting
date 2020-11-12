import { parse as parseCSSDocument, Rule, Declaration } from "css";
import {
  calculate as calculateSpecificity,
  compare as compareSpecifity,
  SpecificityArray,
} from "specificity";

export interface IStyleAttribute {
  specificity: SpecificityArray;
  order: number;
  style: string;
  selector: string;
}

export function parseCss(cssText: string) {
  const styleSheet = parseCSSDocument(cssText).stylesheet;
  if (styleSheet && (!styleSheet.parsingErrors || styleSheet.parsingErrors.length === 0)) {
    /**
     * A rule block is of type
     * selector1, selector2 {
     *   declaration property:value;
     * }
     * we extract rule blocks and use
     */
    const castRules = styleSheet.rules as Rule[];
    const selectorLookup: { [selector: string]: IStyleAttribute } = {};

    for (let i = 0; i < castRules.length; i++) {
      const rule = castRules[i];
      // create a style string from the current rule
      const styleValueString = (rule.declarations || []).reduce(
        (iValue: string, current: Declaration) => iValue + `${current.property}:${current.value};`,
        ""
      );
      // for each selector of this rule, make an entry into the lookup
      (rule.selectors || []).forEach((selector, selectorIndex) => {
        if (!selectorLookup[selector]) {
          selectorLookup[selector] = {
            selector,
            specificity: calculateSpecificity(selector)[0].specificityArray,
            order: i * 100 + selectorIndex,
            style: styleValueString,
          };
        } else {
          selectorLookup[selector].style += ";" + styleValueString;
          selectorLookup[selector].order = i * 100 + selectorIndex;
        }
      });
    }
    // get the selector values in a list
    const selectorValueList = Object.keys(selectorLookup).map(
      (selector) => selectorLookup[selector]
    );
    // sort based on specificity
    selectorValueList.sort(
      (a, b) => compareSpecifity(a.specificity, b.specificity) || a.order - b.order
    );
    return selectorValueList;
  }
}
