import { Block } from '../../core/block';
// import value from 'bundle-text:./404.html';
import template from './404.html?raw';
import { Module } from '../../app.module.ts';

export class Page404 extends Block implements Module {
  content = template;
  declarations = [];
  imports = [];

  constructor() {
    super();
  }

  init(): void {}
}
