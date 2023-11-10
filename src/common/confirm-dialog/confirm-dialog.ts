import { Component } from '../../types.ts';
import { ChatsApiService } from '../../api';
import template from './confirm-dialog.html?raw';

export class ConfirmDialog extends Component {
  private readonly _chatsApi = new ChatsApiService();

  constructor() {
    super(template);
  }

  selector = 'confirm-dialog';

  onSaveChanges() {
    const urls = document.location.pathname.split('/');

    console.log(urls);

    if (urls.length === 2) {
      this._chatsApi.deleteChat(Number(urls[1])).then(() => {
        document.location.reload();
      });
    }
  }

  onDialogClose() {
    this.element?.classList.remove('overlay_opened');
  }

  onDialogNotClose(event: MouseEvent) {
    event.stopPropagation();
  }
}
