import { Block } from '../../core/block';
// import value from 'bundle-text:./404.html';
import value from './404.html?raw';

export class Page404 extends Block {
  constructor() {
    super();
  }

  init(): void {
    console.log(value);
    this.content = value;
  }
}
