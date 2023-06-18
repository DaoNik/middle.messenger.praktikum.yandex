import { Component } from '../../app.module.ts';
import template from './clip-menu.html?raw';

export class ClipMenu extends Component {
  content = template;
  selector = 'clip-menu';

  constructor() {
    super();
  }
}
