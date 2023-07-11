import template from './500.html?raw';
import { Block } from '../../core/block.ts';

export class Page500 extends Block {
  constructor() {
    super(template);
  }
}
