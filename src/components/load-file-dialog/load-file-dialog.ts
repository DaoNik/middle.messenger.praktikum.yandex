import { Component } from '../../types.ts';
import template from './load-file-dialog.html?raw';

export class LoadFileDialog extends Component {
  selector = 'load-file-dialog';
  content = template;

  constructor() {
    super();
  }
}
