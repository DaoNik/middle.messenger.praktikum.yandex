import { Component } from '../types.ts';
import { PropertiesT } from './block.ts';

export class Template {
  elementsContentMap = new Map<string, Set<ChildNode>>();

  precompile(
    template: string,
    declarations: Component[],
    blockId: string
  ): string {
    const keys = template.match(/{{>[\w-]*}}/gm);
    let result = template;
    const componentsMap = new Map<string, string>();

    result = result.replaceAll(/{{blockId}}/gm, blockId);

    if (!keys || keys.length === 0 || declarations.length === 0) {
      return result;
    }

    for (const component of declarations) {
      componentsMap.set(component.selector, component.content);
    }

    for (const key of keys.map((key) => key.slice(3, -2))) {
      const regExp = new RegExp(`{{>${key}}}`, 'gm');
      if (componentsMap.has(key)) {
        result = result.replace(regExp, componentsMap.get(key)!);
      }
    }

    return result;
  }

  compile(properties: PropertiesT, blockId: string): void {
    // eslint-disable-next-line unicorn/prefer-query-selector
    const block = document.getElementById(blockId);

    if (!block) return;

    if (block.childNodes.length > 0) {
      this._replaceTextContentChildNode(block.childNodes, properties);
    } else {
      this._replaceTextContent(block, properties);
    }
  }

  private _replaceTextContentChildNode(
    childNodes: NodeListOf<ChildNode>,
    properties: PropertiesT
  ) {
    if (childNodes.length > 0) {
      for (const node of childNodes) {
        if ([...node.childNodes].length > 0) {
          this._replaceTextContentChildNode(node.childNodes, properties);
        } else {
          this._replaceTextContent(node, properties);
        }
      }
    }
  }

  private _replaceTextContent(
    element: ChildNode,
    properties: PropertiesT
  ): void {
    const content = element.textContent;

    for (const key in properties) {
      if (this.elementsContentMap.has(key)) {
        const elements = this.elementsContentMap.get(key)!;

        for (const element of elements) {
          const value = properties[key];
          if (typeof value === 'string') {
            element.textContent = value;
          }
        }
      }
    }

    if (content) {
      const keys = content.match(/{{[\w-.'()]*}}/gm);

      if (!keys || keys.length === 0 || properties.length === 0) {
        return;
      }

      for (const key of keys.map((key) => key.slice(2, -2))) {
        const regExp = new RegExp(`{{${key}}}`, 'gm');
        const value = properties[key];
        if (typeof value === 'string') {
          const elements = this.elementsContentMap.get(key) ?? new Set();

          elements.add(element);
          this.elementsContentMap.set(key, elements);
          element.textContent = content.replace(regExp, value);
        }
      }
    }
  }
}
