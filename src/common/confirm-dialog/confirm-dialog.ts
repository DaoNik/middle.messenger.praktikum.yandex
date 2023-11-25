import { Component } from '../../types.ts';
import { ChatsApiService } from '../../api';
import template from './confirm-dialog.html?raw';
import { StorageService } from '../../services';
import { CURRENT_CHAT_ID } from '../../constants.ts';

export class ConfirmDialog extends Component {
  private readonly _chatsApi = new ChatsApiService();
  private readonly _storageService = new StorageService();

  constructor() {
    super(template);
  }

  selector = 'confirm-dialog';

  async onSaveChanges(): Promise<void> {
    const chatId = await this._storageService.getItem<number>(CURRENT_CHAT_ID);

    if (!chatId) return;

    this._chatsApi
      .deleteChat(chatId)
      .then(() => {
        // TODO: change to normal update
        document.location.reload();
      })
      .catch(console.error);
  }

  onDialogClose() {
    this.element?.classList.remove('overlay_opened');
  }

  onDialogNotClose(event: MouseEvent) {
    event.stopPropagation();
  }
}
