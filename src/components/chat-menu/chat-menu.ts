import { Component } from '../../types.ts';
import template from './chat-menu.html?raw';

export class ChatMenu extends Component {
  selector = 'chat-menu';

  constructor() {
    super(template);
  }
}
