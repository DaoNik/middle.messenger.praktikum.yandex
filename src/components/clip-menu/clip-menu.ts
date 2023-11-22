import { Component } from '../../types.ts';
import template from './clip-menu.html?raw';

// NOTE: this component is not in use and may be removed after
export class ClipMenu extends Component {
  selector = 'clip-menu';

  constructor() {
    super(template);
  }
}
