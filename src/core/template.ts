import { Component } from '../types.ts';
import { PropertiesT } from './block.ts';

export class Template {
  precompile(template: string, declarations: Component[]): string {
    const keys = template.match(/{{>[\w-]*}}/gm);
    let result = template;
    const componentsMap = new Map<string, string>();

    if (!keys || keys.length === 0 || declarations.length === 0) {
      return result;
    }

    for (const component of declarations) {
      componentsMap.set(component.selector, component.content);
    }

    keys
      .map((key) => key.slice(3, key.length - 2))
      .forEach((key) => {
        const regExp = new RegExp(`{{>${key}}}`, 'gm');
        if (componentsMap.has(key)) {
          result = result.replace(regExp, componentsMap.get(key)!);
        }
      });

    return result;
  }

  compile(template: string, properties: PropertiesT): string {
    const keys = template.match(/{{[\w-]*}}/gm);
    let result = template;

    if (!keys || keys.length === 0 || properties.length === 0) {
      return result;
    }

    keys
      .map((key) => key.slice(2, key.length - 2))
      .forEach((key) => {
        const regExp = new RegExp(`{{${key}}}`, 'gm');
        const value = properties[key];
        if (value && typeof value === 'string') {
          result = result.replace(regExp, value);
        }
      });

    return result;
  }
}
