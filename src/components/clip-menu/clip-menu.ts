import { Component } from '../../types.ts';
import template from './clip-menu.html?raw';

export class ClipMenu extends Component {
  selector = 'clip-menu';

  constructor() {
    super(template);
  }
}
