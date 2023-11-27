import { IComponent } from '../../types.ts';
import template from './clip-menu.html?raw';
import { Block } from '../../core';

// NOTE: this component is not in use and may be removed after
export class ClipMenu extends Block implements IComponent {
  selector = 'clip-menu';

  constructor() {
    super(template);
  }
}
