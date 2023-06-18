import template from './404.html?raw';
import { Module } from '../../types.ts';

export class Page404 extends Module {
  content = template;
  declarations = [];

  constructor() {
    super();
  }

  init(): void {}
}
