import { Component } from '../../app.module.ts';
import template from './chat-menu.html?raw';

export class ChatMenu extends Component {
  selector = 'chat-menu';
  content = template;

  constructor() {
    super();
  }
}
