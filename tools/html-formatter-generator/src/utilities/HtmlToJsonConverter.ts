import { parse as parseCSSDocument, Rule, Declaration } from "css";

const JSON_SCHEMA_URL =
  "https://developer.microsoft.com/json-schemas/sp/v2/column-formatting.schema.json";

const errorStrings: { [x: string]: string } = {
  elmTypeMissing: "Must specify a tagName, tag cannot be empty.",
  elmTypeInvalid: "Invalid tag: {0}. Must be one of {1}.",
  ariaError:
    "No aria- tags found. As such, the field will not be accessible via a screen reader.",
  invalidProtocol: "Only http, https and mailto protocols are allowed.",
  invalidStyleValue:
    "Style values cannot contain unsafe expressions, behaviors or javascript.",
  invalidStyleAttribute: "'{0}' is not a valid style attribute.",
};

const StringHelper = (() => {
  // Regex that finds {#} so it can be replaced by the arguments in string format
  const FORMAT_REGEX = /\{(\d+)\}/g;
  /**
   * String Format is like C# string format. Use template strings instead unless the string is dynamic.
   * Calling format on a string with less arguments than specified in the format will substitute "undefined"
   * @example
   * ```
   * expect("hello {0}!".format("mike")).toEqual("hello mike!")
   * ```
   */
  return {
    format: (template: string, ...values: any[]): string => {
      return template.replace(
        FORMAT_REGEX,
        (match: string, valueIndex: string) => {
          const value = values[Number(valueIndex)];
          // Checking null for consistency with old behavior, all other values pass through.
          return value === null ? "" : `${value}`;
        }
      );
    },
  };
})();

// List of allowed elements
const OK_ELMS: { [x: string]: boolean } = {
  div: true,
  span: true,
  a: true,
  img: true,
  svg: true,
  button: true, // Allow action buttons. But we won't allow users to specify onclick
  path: true,
};

function throwErr(templateKey: string, ...args: string[]) {
  let throwError = "";
  if (errorStrings && templateKey && errorStrings[templateKey]) {
    let templateVal = errorStrings[templateKey];
    throwError = StringHelper.format(templateVal, ...args);
  } else if (templateKey) {
    //If no error strings were provided to us, output the error Key
    throwError = "FieldRenderer Error: " + templateKey;
  }
  throw throwError;
}

function appendInlineCss(rootElement: HTMLElement, cssText: string) {
  const styleSheet = parseCSSDocument(cssText).stylesheet;
  if (
    styleSheet &&
    (!styleSheet.parsingErrors || styleSheet.parsingErrors.length === 0)
  ) {
    for (const rule of styleSheet.rules) {
      const crule = <Rule>rule;
      const selectorString = (crule.selectors || []).join("");
      let cssString = "";
      (crule.declarations || []).forEach((currentVal: any) => {
        const { property, value } = currentVal as Declaration;
        cssString += property + ":" + value + ";";
      });

      const matchingElements =
        (rootElement.parentNode &&
          rootElement.parentNode.querySelectorAll(selectorString)) ||
        [];
      for (let i = 0; i < matchingElements.length; i++) {
        const inlineCSSAttr = document.createAttribute("inline-css");
        inlineCSSAttr.value = cssString;
        matchingElements[i].attributes.setNamedItem(inlineCSSAttr);
      }
    }
  }
}

export function createFormatter(
  elm: HTMLElement,
  level: number,
  cssText?: string
) {
  if (!elm || !elm.tagName) {
    return throwErr(errorStrings.elmTypeMissing);
  }

  if (!OK_ELMS[elm.tagName.toLowerCase()]) {
    return throwErr(
      StringHelper.format(
        errorStrings.elmTypeInvalid,
        elm.tagName,
        Object.keys(OK_ELMS).join(" ")
      )
    );
  }
  let jsonVal: any = {};

  if (level === 0) {
    jsonVal.$schema = JSON_SCHEMA_URL;
    if (cssText) {
      appendInlineCss(elm, cssText);
    }
  }

  jsonVal.elmType = elm.tagName.toLowerCase();

  for (let index = 0; index < elm.attributes.length; index++) {
    const element = elm.attributes[index];
    if (element.nodeName !== "style") {
      if (!jsonVal.attributes) jsonVal.attributes = {};
      jsonVal.attributes[element.nodeName] = element.textContent;
      console.log(element.nodeName, element.textContent);
    } else if (element.textContent) {
      let styleObj: any = {};
      element.textContent.split(";").forEach((element) => {
        let keyValuePair = element.split(":");
        if (keyValuePair.length === 2) {
          styleObj[keyValuePair[0].trim()] = keyValuePair[1].trim();
        }
      });
      jsonVal.style = styleObj;
    }
  }

  if (elm.children.length === 0 && !!elm.textContent) {
    jsonVal.txtContent = elm.textContent.replace(/\n/g, "");
  }

  if (jsonVal.attributes && jsonVal.attributes["inline-css"]) {
    jsonVal.style = jsonVal.style || {};
    jsonVal.attributes["inline-css"]
      .split(";")
      .forEach((styleToken: string) => {
        let keyValuePair = styleToken.split(":");
        if (keyValuePair[0] && !jsonVal.style[keyValuePair[0]]) {
          jsonVal.style[keyValuePair[0]] = keyValuePair.slice(1).join("");
        }
      });
    jsonVal.attributes["inline-css"] = undefined;
  }

  for (let index = 0; index < elm.children.length; index++) {
    if (index === 0) jsonVal.children = [];
    const element = elm.children[index] as HTMLElement;
    jsonVal.children.push(createFormatter(element, level + 1));
  }

  return jsonVal;
}

/**
 * @param {String} HTML representing a single element
 * @return {Element}
 */
export function htmlToElement(html: string): HTMLElement {
  var template = document.createElement("template");
  html = html.trim(); // Never return a text node of whitespace as the result
  template.innerHTML = html;
  return template.content.firstChild as HTMLElement;
}
