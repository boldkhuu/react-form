import React from 'react';


/**
 * Creates field input element
 * @class
 */
class Element {
  /**
   * @param  {String} tag - HTML tag name ('input', 'texarea' etc.)
   * @param  {Object} attr - Tag attributes (name, value etc.)
   * @param  {Array} [children] - Child elements
   * @return {Element}
   */
  constructor(tag, attr, children) {
    this.tag = tag;
    this.attr = attr;
    this.children = children;
  }

  /**
   * Public methods
   */

  /**
   * Returns generated ReactElement with its child elements
   * @return {ReactElement}
   */
  createElement() {
    const self = this;
    const childElements = self._createChildElements(self.children);

    return React.createElement(self.tag, self.attr, childElements);
  }

  /**
   * Private methods
   */

  /**
   * Builds elements recursively with their children
   * @param  {Element|String} children
   * @return {ReactElement}
   */
  _createChildElements(children) {
    const self = this;

    if (_.isEmpty(children)) {
      return;
    }

    if (typeof children === 'string') {
      return children;
    }

    return children.map((child, index) => {
      const subs = child.children;
      const subChildren = subs && self._createChildElements(subs);

      const attr = { ...child.attr, key: index };

      return React.createElement(child.tag, attr, subChildren);
    });
  }
}

export default Element;
