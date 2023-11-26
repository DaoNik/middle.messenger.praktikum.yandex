import { Component } from '../../types.ts';
import template from './chat-menu.html?raw';

export class ChatMenu extends Component {
  selector = 'chat-menu';

  constructor() {
    super(template);
  }

  onAddUserDialogOpened() {
    document
      .querySelector('.overlay-add-user')!
      .classList.add('overlay_opened');
    this.close();
  }

  onRemoveUserDialogOpened() {
    document
      .querySelector('.overlay-remove-user')!
      .classList.add('overlay_opened');
    this.close();
  }

  onRemoveChatDialogOpened() {
    document.querySelector('.overlay-confirm')!.classList.add('overlay_opened');
    this.close();
  }

  close() {
    this.element?.classList.remove('opened');
  }
}
