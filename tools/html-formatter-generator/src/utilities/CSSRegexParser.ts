enum CaptureGroup {
  comment = 1,
  selector = 2,
  end = 3,
  attr = 4
}

const regexes: { [x: string]: RegExp } = {
  selX: /([^\s\;\{\}][^\;\{\}]*)\{/g,
  endX: /\}/g,
  line: /([^\;\{\}]*)\;/g,
  comment: /\/\*[\s\S]*?\*\//g,
  lineAttr: /([^\:]+):([^\;]*);/,
  // This is used, a concatenation of all above. We use alternation to capture.
  alternation: /(\/\*[\s\S]*?\*\/)|([^\s\;\{\}][^\;\{\}]*(?=\{))|(\})|([^\;\{\}]+\;(?!\s*\*\/))/gmi
};

class Utils {
  public static isEmpty = (x: any) => {
    return !x || !x.length;
  };

  public static timestamp = () => {
    return Date.now();
  }

  public static repeat = (input: string, n: number) => {
    return new Array(1 + n).join(input);
  };
}

export class CSSParser {
  /**
   * Input is css string and current pos, returns JSON object
   *
   * @param cssString
   *            The CSS string.
   * @param options
   *            An optional argument object.
   * ordered: Whether order of comments and other nodes should be kept in the output.
   *          This will return an object where all the keys are numbers and the values are objects containing
   *         "name" and "value" keys for each node.
   * comments: Whether to capture comments.
   * split: Whether to split each comma separated list of selectors.
   */
  public toJSON = (cssString: string, options = { ordered: false, comments: false, stripComments: false, split: false }) => {
    const node: any = {
      children: {},
      attributes: {}
    };
    let match = null;
    let count = 0;

    if (options.stripComments) {
      options.comments = false;
      cssString = cssString.replace(regexes.comment, '');
    }

    while ((match = regexes.alternation.exec(cssString)) != null) {

      if (!Utils.isEmpty(match[CaptureGroup.comment]) && options.comments) {
        // Comment
        const add = match[CaptureGroup.comment].trim();
        node[count++] = add;
      }
      else if (!Utils.isEmpty(match[CaptureGroup.selector])) {
        // New node, we recurse
        const name = match[CaptureGroup.selector].trim();
        // This will return when we encounter a closing brace
        const newNode = this.toJSON(cssString, options);
        if (options.ordered) {
          const obj = {
            name: name,
            value: newNode,
            type: 'rule'
          };
          node[count++] = obj;
        } else {
          let bits = options.split ? name.split(',') : [name];

          for (let i = 0; i < bits.length; i++) {
            const sel = bits[i].trim();
            if (sel in node.children) {
              for (const att in newNode.attributes) {
                node.children[sel].attributes[att] = newNode.attributes[att];
              }
            } else {
              node.children[sel] = newNode;
            }
          }
        }
      }
      else if (!Utils.isEmpty(match[CaptureGroup.attr])) {
        const line = match[CaptureGroup.attr].trim();
        const attr = regexes.lineAttr.exec(line);
        if (attr) {
          // Attribute
          const name = attr[1].trim();
          const value = attr[2].trim();
          if (options.ordered) {
            const obj = {
              name,
              value,
              type: 'attr'
            };
            node[count++] = obj;
          } else {
            if (name in node.attributes) {
              const currVal = node.attributes[name];
              if (!(currVal instanceof Array)) {
                node.attributes[name] = [currVal];
              }
              node.attributes[name].push(value);
            } else {
              node.attributes[name] = value;
            }
          }
        } else {
          // Semicolon terminated line
          node[count++] = line;
        }
      }
      else if (!Utils.isEmpty(match[CaptureGroup.end])) {
        // Node has finished
        return node;
      }
    }

    return node;
  };

}




