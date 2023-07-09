import { Component } from '../types.ts';
import { EventsT, PropertiesT } from './block.ts';

export class Template {
  elementsContentMap = new Map<string, Set<Element>>();

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

    if (block.children.length > 0) {
      this._replaceTextContentChildNode(block.children, properties);
    } else {
      this._replaceTextContent(block, properties);
    }
  }

  addEvents(blockId: string, functions: EventsT) {
    // eslint-disable-next-line unicorn/prefer-query-selector
    const block = document.getElementById(blockId);

    if (!block) return;

    this._addEvents(block, functions);

    if (block.children.length > 0) {
      this._registerEvents(block.children, functions);
    }
  }

  private _registerEvents(elements: HTMLCollection, functions: EventsT) {
    for (const element of elements) {
      this._addEvents(element, functions);

      if (element.children.length > 0) {
        this._registerEvents(element.children, functions);
      }
    }
  }

  private _addEvents(element: Element, functions: EventsT) {
    const reg = /^\(.*\)$/;

    for (const attr of element.attributes) {
      if (reg.test(attr.name)) {
        const eventName = attr.name.slice(1, -1);

        const callback = functions[attr.value];

        if (callback) {
          element.addEventListener(eventName, callback);
        }
      }
    }
  }

  private _replaceTextContentChildNode(
    children: HTMLCollection,
    properties: PropertiesT
  ) {
    if (children.length > 0) {
      for (const node of children) {
        // TODO: добавить проверку на наличие blockId
        if (node.children.length > 0) {
          this._replaceTextContentChildNode(node.children, properties);
        } else {
          this._replaceTextContent(node, properties);
        }
      }
    }
  }

  private _replaceTextContent(element: Element, properties: PropertiesT): void {
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
