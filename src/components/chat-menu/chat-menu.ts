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
  }

  onRemoveUserDialogOpened() {
    document
      .querySelector('.overlay-remove-user')!
      .classList.add('overlay_opened');
  }

  onRemoveChatDialogOpened() {
    document.querySelector('.overlay-confirm')!.classList.add('overlay_opened');
  }
}
