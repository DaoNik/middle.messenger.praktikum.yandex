import {
  AddUserDialog,
  RemoveUserDialog,
  ClipMenu,
  ChatMenu,
} from '../../components';
import {
  isFormValid,
  isNotEmptyValidator,
  IForm,
  IFormControl,
  inputHandler,
  blurHandler,
  Block,
} from '../../core';
import template from './chats.html?raw';

export class Chats extends Block {
  form: IForm = {
    controls: new Map<string, IFormControl>([
      [
        'message',
        {
          value: '',
          validators: [isNotEmptyValidator],
          valid: false,
          error: '',
        },
      ],
    ]),
    valid: false,
  };

  constructor() {
    super(
      template,
      [
        new ChatMenu(),
        new ClipMenu(),
        new AddUserDialog(),
        new RemoveUserDialog(),
      ],
      {
        chats: [{ userName: 'testUser' }, { userName: 'testUser2' }],
      },
      {
        onSubmit: (event: SubmitEvent) => {
          event.preventDefault();
          const form = this.form;
          if (isFormValid(form)) {
            const formValue: Record<string, string> = {};
            for (const [key, value] of form.controls) {
              formValue[key] = value.value;
            }
            console.log(formValue);
          }
        },
        onInput: (event: InputEvent) => {
          inputHandler(event, this.form.controls);
        },
        onBlur: (event) => {
          blurHandler(event, this.form, this.props, this.element);
        },
        onChatMenuToggled: () => {
          document.querySelector('.chat-menu')?.classList.toggle('opened');
        },
        onClipMenuToggled: () => {
          document.querySelector('.clip-menu')?.classList.toggle('opened');
        },
      },
      { display: 'grid' }
    );
  }
}
