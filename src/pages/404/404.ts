import template from './404.html?raw';
import { Block } from '../../core';

export class Page404 extends Block {
  constructor() {
    super(template);
  }
}
