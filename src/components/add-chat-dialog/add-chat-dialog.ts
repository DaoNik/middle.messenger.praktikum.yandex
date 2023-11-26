import {
  blurHandler,
  FormControl,
  FormGroup,
  inputHandler,
  isMinimalLength,
  isNotEmptyValidator,
} from '../../core';
import { Component } from '../../types.ts';
import template from './add-chat-dialog.html?raw';
import { ChatsApiService } from '../../api';
import { storeService } from '../../services';

export class AddChatDialog extends Component {
  private readonly _chatsApi = new ChatsApiService();

  readonly form = new FormGroup<{ title: string }>({
    title: new FormControl('', [isNotEmptyValidator, isMinimalLength], 4),
  });

  selector = 'add-chat-dialog';

  constructor() {
    super(template, [], {
      title_error: '',
    });
  }

  onSubmit(event: SubmitEvent) {
    event.preventDefault();

    if (!this.form.valid) return;

    const { title } = this.form.getRawValue();

    this._chatsApi
      .createChat(title)
      .then(() => this._chatsApi.getChats())
      .then((chats) => {
        storeService.set('chats', chats);
      })
      .then(() => this.onDialogClose())
      .catch(console.error);
  }

  onInput(event: InputEvent) {
    inputHandler(event, this.form);
  }

  onBlur(event: FocusEvent) {
    blurHandler(event, this.form, this.props, this.element);
  }

  onDialogClose() {
    this.element?.classList.remove('overlay_opened');
  }

  onDialogNotClose(event: MouseEvent) {
    event.stopPropagation();
  }
}
