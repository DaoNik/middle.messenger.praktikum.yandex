import { IComponent } from '../../types.ts';
import template from './chat-menu.html?raw';
import { Block } from '../../core';

export class ChatMenu extends Block implements IComponent {
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
