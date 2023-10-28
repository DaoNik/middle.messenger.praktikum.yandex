import { Component } from '../types.ts';
import { EventsT, PropertiesT } from './block.ts';

// key : testProperty, key: messages.1.userName
const getPropertyValue = (property: PropertiesT, key: string): any => {
  const paths = key.split('.');

  if (paths.length === 1) {
    return property[key];
  }

  let result: any = property;

  for (const path of paths) {
    result = result[path];
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
    block: HTMLElement | Node,
    propertyKey?: string
  ): void {
    if (block instanceof HTMLElement) {
      if (block.children.length > 0) {
        this._replaceTextContentChildNode(
          block.children,
          properties,
          propertyKey
        );
      } else {
        this._replaceTextContent(block, properties, propertyKey);
      }

      return;
    }

    if (block.childNodes.length > 0) {
      this._replaceTextContentChildNode(
        block.childNodes,
        properties,
        propertyKey
      );
    } else {
      this._replaceTextContent(block, properties, propertyKey);
    }
  }

  addDirectives(properties: PropertiesT, block: Element): void {
    for (const element of block.children) {
      this._addDirectives(properties, element);
    }
  }

  private _addDirectives(properties: PropertiesT, element: Element): void {
    const forOf = element.attributes.getNamedItem('[forOf]');
    const forLet = element.attributes.getNamedItem('[forLet]');

    if (forOf && forLet) {
      element.attributes.removeNamedItem('[forOf]');
      element.attributes.removeNamedItem('[forLet]');
      const arr = properties[forOf.value] as any[];

      for (let i = arr.length - 1; i >= 0; i--) {
        if (i === 0) {
          this.compile(arr[i], element, `${forOf.value}.${i}`);
        } else {
          const newElement = element.cloneNode(true);

          this.compile(arr[i], newElement, `${forOf.value}.${i}`);

          element.after(newElement);
        }
      }

      return;
    }

    if (element.children.length > 0) {
      for (const childElement of element.children) {
        this._addDirectives(properties, childElement);
      }
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
    children: HTMLCollection | NodeListOf<Node>,
    properties: PropertiesT,
    propertyKey?: string
  ) {
    if (children.length > 0) {
      for (const node of children) {
        // TODO: добавить проверку на наличие blockId
        if (node instanceof Element) {
          if (node.children.length > 0) {
            this._replaceTextContentChildNode(
              node.children,
              properties,
              propertyKey
            );
          } else {
            this._replaceTextContent(node, properties, propertyKey);
          }
        } else {
          if (node.childNodes.length > 0) {
            this._replaceTextContentChildNode(
              node.childNodes,
              properties,
              propertyKey
            );
          } else {
            this._replaceTextContent(node, properties, propertyKey);
          }
        }
      }
    }
  }

  private _replaceTextContent(
    element: Element | Node,
    properties: PropertiesT,
    propertyKey?: string
  ): void {
    const content = element.textContent;

    for (const key in properties) {
      if (this.elementsContentMap.has(key)) {
        const elements = this.elementsContentMap.get(key)!;

        for (const element of elements) {
          const value = getPropertyValue(properties, key);

          if (typeof value === 'string') {
            element.textContent = value;
          }
        }
      }
    }

    if (content) {
      const keys = content.match(/{{[\w-.'()]*}}/gm);

      if (!keys || keys.length === 0 || properties['length'] === 0) {
        return;
      }

      for (const key of keys.map((key) => key.slice(2, -2))) {
        const regExp = new RegExp(`{{${key}}}`, 'gm');
        const value = properties[key];

        if (typeof value === 'string') {
          const fullKey = propertyKey ? `${propertyKey}.${key}` : key;
          const elements = this.elementsContentMap.get(fullKey) ?? new Set();

          elements.add(element);
          this.elementsContentMap.set(fullKey, elements);
          element.textContent = content.replace(regExp, value);
        }
      }
    }
  }
}
