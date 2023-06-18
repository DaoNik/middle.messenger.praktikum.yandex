import { Block } from '../../core/block';
import template from './500.html?raw';
import { Module } from '../../app.module.ts';

export class Page500 extends Block implements Module {
  content = template;
  declarations = [];
  imports = [];

  constructor() {
    super();
  }

  init(): void {}
}
