import { parseCss, IStyleAttribute } from "./parsers/nCSSParser";
import * as accepted from "./FormatterConstants";

const $get = (selector: string, context: HTMLDocument = document) => {
  try {
    const nodes = context.querySelectorAll(selector);
    return Array.prototype.slice.call(nodes || []);
  } catch (ex) {
    return [];
  }
};

export default class HTMLToFormatterConverter {
  /**
   * parse html and css input together and generate a formatter with proper style attributes.
   * @param htmlInput html snippet string
   * @param cssInput css snippet string
   */
  public static generateFormatter(htmlInput: string, cssInput: string = "", isTest?: boolean) {
    // parse string to a html document
    const parsedDocument = this.convertToDocument(htmlInput);

    // append inline styles to external css
    const inputStyles = `${this.getStylesFromInternalTags(parsedDocument)}\n${cssInput}`;

    // parse css into a ordered list of styles
    const styleObjectList = parseCss(inputStyles) || [];

    // mark each matching html node with 'inline-css' special attribute
    const styleObjectMap: { [x: string]: IStyleAttribute } = {};
    styleObjectList.forEach((rule: IStyleAttribute) => {
      const matchedNodes = $get(rule.selector, parsedDocument);
      styleObjectMap[rule.selector] = rule;
      matchedNodes.forEach((node: Element) => {
        const existing = node.getAttribute("inline-css") || "";
        const inlineAttribute = parsedDocument.createAttribute("inline-css");
        inlineAttribute.value = existing + ";" + rule.selector;
        node.attributes.setNamedItem(inlineAttribute);
      });
    });
    // process child nodes on the document and set style inline
    this.setStyleAttributeRecursively(parsedDocument.body, styleObjectMap);

    // generate json from the processed html
    const generated = this.elementToJSON(parsedDocument.body.children[0] as HTMLElement, isTest);
    return {
      json: generated,
      html: parsedDocument.body.children[0],
    };
  }

  private static convertToDocument(htmlString: string): HTMLDocument {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");
    return doc;
  }

  private static getStylesFromInternalTags(parsedDocument: HTMLDocument) {
    const styleTagsList = $get("style", parsedDocument);
    return styleTagsList.reduce(
      (internalcss: string, tag: HTMLElement) => `${internalcss}\n${tag.innerHTML}`,
      ""
    );
  }

  private static setComputedStyles(
    node: HTMLElement,
    styleObjectMap: { [x: string]: IStyleAttribute }
  ) {
    const matches = node.getAttribute("inline-css");
    let stylesToApply: string = "";
    if (matches) {
      matches.split(";").forEach((match) => {
        if (styleObjectMap[match]) {
          stylesToApply += styleObjectMap[match].style + ";";
        }
      });
    }

    const inlineStyle = node.getAttribute("style");

    let finalStyleString =
      stylesToApply && inlineStyle
        ? stylesToApply + ";" + inlineStyle
        : inlineStyle || stylesToApply;

    node.setAttribute("style", finalStyleString);
  }

  public static elementToJSON(elm: HTMLElement, isTest?: boolean) {
    const tagName = elm && elm.tagName && elm.tagName.toLowerCase();
    if (!tagName || !accepted.OK_ELMS[tagName]) {
      return;
    }
    //create formatter
    const jsonVal: any = {
      $schema: accepted.SCHEMA_URI,
      debugMode: true,
      elmType: tagName,
    };
    // parse each attribute and set on the json
    for (let index = 0; index < elm.attributes.length; index++) {
      const element = elm.attributes[index];

      if (!accepted.OK_ATTRS[element.nodeName]) {
        continue;
      }

      if (element.nodeName !== "style") {
        if (!jsonVal.attributes) jsonVal.attributes = {};
        jsonVal.attributes[element.nodeName] = element.textContent;
      } else if (element.textContent) {
        let styleObj: any = {};
        element.textContent.split(";").forEach((element) => {
          let keyValuePair = element.split(":");
          if (keyValuePair.length === 2) {
            styleObj[keyValuePair[0]] = keyValuePair[1];
          }
        });
        jsonVal.style = styleObj;
      }
    }

    if (elm.children.length === 0 && !!elm.textContent) {
      jsonVal.txtContent = elm.textContent.replace(/\n/g, "");
    }

    //process child elements and set as children
    for (let index = 0; index < elm.children.length; index++) {
      if (index === 0) jsonVal.children = [];
      const element = elm.children[index] as HTMLElement;
      const childNode = this.elementToJSON(element);
      if (childNode) {
        jsonVal.children.push(childNode);
      }
    }

    return jsonVal;
  }

  private static setStyleAttributeRecursively(
    node: HTMLElement,
    styleMap: { [x: string]: IStyleAttribute }
  ) {
    [].slice.call(node.children).forEach((childElement: HTMLElement) => {
      this.setComputedStyles(childElement, styleMap);
      this.setStyleAttributeRecursively(childElement, styleMap);
    });
  }
}
