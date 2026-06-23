// List of allowed elements
export const OK_ELMS: { [x: string]: boolean } = {
  'div': true,
  'span': true,
  'a': true,
  'img': true,
  'svg': true,
  'button': true,
  'path': true,
  'p': true,
  'filepreview': true
};

export const OK_ATTRS: { [x: string]: boolean } = {
  'style': true,
  'href': true,
  'rel': true, // for anchor attributes
  'src': true,
  'class': true,
  'target': true,
  'title': true,
  'role': true, // for accessibility
  'd': true, // for SVG path element
  'alt': true, // for accessibility for img element
  'iconname': true, // Fluent UI icon name (lowercased by HTML parser)
  'data-interception': true, // link navigation behavior
  'viewBox': true, // SVG viewBox
  'preserveAspectRatio': true, // SVG aspect ratio
  'draggable': true
};

// aria-* attributes are allowed dynamically (matched by prefix)
export function isAllowedAttr(attrName: string): boolean {
  return !!OK_ATTRS[attrName] || /^aria-[a-z]+$/.test(attrName);
}

export const SCHEMA_URI = "https://developer.microsoft.com/json-schemas/sp/v2/column-formatting.schema.json";

/**
 * Dictionary of booleans.
 *
 * @internal
 */
export interface IConditionalClass {
  [className: string]: boolean;
}

/**
 * Serializable object.
 *
 * @internal
 */
export interface ISerializableObject {
  toString?: () => string;
}

/**
 * css input type.
 *
 * @internal
 */
export type ICssInput = string | ISerializableObject | IConditionalClass | null | undefined | boolean;

/**
 * Concatination helper, which can merge class names together. Skips over falsey values.
 *
 * @public
 */
export function merge(...args: ICssInput[]): string {
  let classes = [];

  for (let arg of args) {
    if (arg) {
      if (typeof arg === 'string') {
        classes.push(arg);
      } else if (arg.hasOwnProperty('toString') && typeof arg.toString === 'function') {
        classes.push(arg.toString());
      } else {
        // tslint:disable-next-line:no-any
        for (let key in arg as any) {
          // tslint:disable-next-line:no-any
          if ((arg as any)[key]) {
            classes.push(key);
          }
        }
      }
    }
  }

  return classes.join(' ');
}