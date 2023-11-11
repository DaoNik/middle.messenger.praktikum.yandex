import { Component } from '../types.ts';
import { Block, PropertiesT } from './block.ts';

const getPropertyValue = (property: PropertiesT, key: string): any => {
  const paths = key.split('.');

  if (paths.length === 1) {
    return property[key];
  }

  let result: any = property;

  for (const path of paths) {
    if (
      (typeof result === 'object' &&
        result !== null &&
        Object.getOwnPropertyNames(result).includes(path)) ||
      (Array.isArray(result) &&
        Number.isNaN(Number(path)) &&
        Number(path) >= 0 &&
        result.length > Number(path))
    ) {
      result = result[path];
    }
  }

  return result;
};

export class Template {
  elementsContentMap = new Map<string, Set<Element | Node>>();

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

  compile(
    properties: PropertiesT,
    block: HTMLElement,
    isSave: boolean = true,
    propertyKey?: string
  ): void {
    if (block.children.length > 0) {
      this._replaceTextContentChildNode(
        block.children,
        properties,
        isSave,
        propertyKey
      );
    } else {
      this._replaceTextContent(block, properties, isSave, propertyKey);
    }

    return;
  }

  addEvents(block: HTMLElement, blockClass: Block) {
    this._addOrRemoveEvents(block, blockClass, false);

    if (block.children.length > 0) {
      this._registerEvents(block.children, blockClass, false);
    }
  }

  removeEvents(block: HTMLElement, blockClass: Block) {
    this._addOrRemoveEvents(block, blockClass, true);

    if (block.children.length > 0) {
      this._registerEvents(block.children, blockClass, true);
    }
  }

  private _registerEvents(
    elements: HTMLCollection,
    blockClass: Block,
    isRemove: boolean
  ) {
    for (const element of elements) {
      if (!element.id) {
        this._addOrRemoveEvents(element, blockClass, isRemove);

        if (element.children.length > 0) {
          this._registerEvents(element.children, blockClass, isRemove);
        }
      }
    }
  }

  private _addOrRemoveEvents(
    element: Element,
    blockClass: Block,
    isRemove: boolean
  ) {
    const reg = /^\(.*\)$/;

    for (const attribute of element.attributes) {
      if (reg.test(attribute.name)) {
        const eventName = attribute.name.slice(1, -1);

        // @ts-ignore
        const callback = blockClass[attribute.value];

        if (!callback || typeof callback !== 'function') return;

        if (isRemove) {
          element.removeEventListener(eventName, callback.bind(blockClass));
        } else {
          element.addEventListener(eventName, callback.bind(blockClass));
        }
      }
    }
  }

  private _replaceTextContentChildNode(
    children: HTMLCollection,
    properties: PropertiesT,
    isSave: boolean,
    propertyKey?: string
  ) {
    if (children.length === 0) return;

    for (const node of children) {
      if (!node.id) {
        if (node.children.length > 0) {
          this._replaceTextContentChildNode(
            node.children,
            properties,
            isSave,
            propertyKey
          );
        } else {
          this._replaceTextContent(node, properties, isSave, propertyKey);
        }
      }
    }
  }

  private _replaceTextContent(
    element: Element | Node,
    properties: PropertiesT,
    isSave: boolean,
    propertyKey?: string
  ): void {
    const content = element.textContent;

    for (const [key, elements] of this.elementsContentMap.entries()) {
      const value = getPropertyValue(properties, key);
      const textContent = value ? String(value) : '';

      for (const element of elements) {
        element.textContent = textContent;
      }
    }

    if (content) {
      const keys = content.match(/{{[\w-.'()]*}}/gm);

      if (!keys || keys.length === 0 || properties['length'] === 0) {
        return;
      }

      for (const key of keys.map((key) => key.slice(2, -2))) {
        const regExp = new RegExp(`{{${key}}}`, 'gm');
        const value = getPropertyValue(properties, key) ?? '';

        if (typeof value === 'string' || typeof value === 'number') {
          if (isSave) {
            const fullKey = propertyKey ? `${propertyKey}.${key}` : key;

            const elements = this.elementsContentMap.get(fullKey) ?? new Set();

            elements.add(element);
            this.elementsContentMap.set(fullKey, elements);
          }

          element.textContent = content.replace(regExp, String(value));
        }
      }
    }
  }
}
