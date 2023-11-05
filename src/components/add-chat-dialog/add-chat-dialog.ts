import { isFormValid, isMinimalLength, isNotEmptyValidator } from '../../core';
import { blurHandler, IForm, IFormControl, inputHandler } from '../../core';
import { Component } from '../../types.ts';
import template from './add-chat-dialog.html?raw';
import { ChatsApiService } from '../../api';

export class AddChatDialog extends Component {
  private readonly _chatsApi = new ChatsApiService();

  form: IForm = {
    controls: new Map<string, IFormControl>([
      [
        'title',
        {
          value: '',
          validators: [isNotEmptyValidator, isMinimalLength],
          minLength: 4,
          valid: false,
          error: '',
        },
      ],
    ]),
    valid: false,
  };
  selector = 'add-chat-dialog';

  constructor() {
    super(template, [], {
      title_error: '',
    });
  }

  onSubmit(event: SubmitEvent) {
    event.preventDefault();

    const form = this.form;

    if (!isFormValid(form)) return;

    const formValue: Record<string, string> = {};

    for (const [key, value] of form.controls) {
      formValue[key] = value.value;
    }

    this._chatsApi.createChat(formValue['title']).then(() => {
      // TODO: change to normal update
      document.location.reload();
    });
  }

  onInput(event: InputEvent) {
    inputHandler(event, this.form.controls);
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
