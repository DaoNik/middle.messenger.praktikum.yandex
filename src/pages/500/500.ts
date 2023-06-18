import template from './500.html?raw';
import { Module } from '../../types.ts';

export class Page500 extends Module {
  content = template;
  declarations = [];

  constructor() {
    super();
  }

  init(): void {}
}
