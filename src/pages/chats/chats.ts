import { AddUserDialog } from '../../components/add-user-dialog/add-user-dialog';
import { RemoveUserDialog } from '../../components/remove-user-dialog/remove-user-dialog';
import { isFormValid, isNotEmptyValidator } from '../../core/validators';
import {
  IForm,
  IFormControl,
  inputHandler,
  blurHandler,
} from '../../core/form';
import { ClipMenu } from '../../components/clip-menu/clip-menu';
import { ChatMenu } from '../../components/chat-menu/chat-menu';
import template from './chats.html?raw';
import { Block } from '../../core/block.ts';

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
      {},
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
      }
    );
  }
}
