import { Block } from '../../core/block';
import value from './500.html?raw';

export class Page500 extends Block {
  constructor() {
    super();
  }

  init(): void {
    this.content = value;
  }
}
