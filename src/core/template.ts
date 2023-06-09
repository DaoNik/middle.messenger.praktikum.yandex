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

  compile(properties: PropertiesT, block: HTMLElement): void {
    if (block.children.length > 0) {
      this._replaceTextContentChildNode(block.children, properties);
    } else {
      this._replaceTextContent(block, properties);
    }
  }

  addEvents(block: HTMLElement, functions: EventsT) {
    this._addOrRemoveEvents(block, functions, false);

    if (block.children.length > 0) {
      this._registerEvents(block.children, functions, false);
    }
  }

  removeEvents(block: HTMLElement, functions: EventsT) {
    this._addOrRemoveEvents(block, functions, true);

    if (block.children.length > 0) {
      this._registerEvents(block.children, functions, true);
    }
  }

  private _registerEvents(
    elements: HTMLCollection,
    functions: EventsT,
    isRemove: boolean
  ) {
    for (const element of elements) {
      this._addOrRemoveEvents(element, functions, isRemove);

      if (element.children.length > 0) {
        this._registerEvents(element.children, functions, isRemove);
      }
    }
  }

  private _addOrRemoveEvents(
    element: Element,
    functions: EventsT,
    isRemove: boolean
  ) {
    const reg = /^\(.*\)$/;

    for (const attribute of element.attributes) {
      if (reg.test(attribute.name)) {
        const eventName = attribute.name.slice(1, -1);

        const callback = functions[attribute.value];

        if (callback) {
          if (isRemove) {
            element.removeEventListener(eventName, callback);
          } else {
            element.addEventListener(eventName, callback);
          }
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
