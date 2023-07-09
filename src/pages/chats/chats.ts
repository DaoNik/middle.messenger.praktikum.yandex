import { AddUserDialog } from '../../components/add-user-dialog/add-user-dialog';
import { RemoveUserDialog } from '../../components/remove-user-dialog/remove-user-dialog';
import {
  isControlValid,
  isFormValid,
  isNotEmptyValidator,
} from '../../core/validators';
import { IForm, IFormControl } from '../../core/form';
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
        onInput: (event) => {
          const controls = this.form.controls;
          const target = event.target as HTMLInputElement;

          if (controls.has(target.name)) {
            controls.get(target.name)!.value = target.value;
          }
        },
        onBlur: (event) => {
          const form = this.form;
          const target = event.target as HTMLInputElement;
          const control = form.controls.get(target.name)!;
          const { isValid, error } = isControlValid(control);

          control.valid = isValid;
          control.error = error;
          if (this.props[`${target.name}_error`] !== control.error) {
            this.props[`${target.name}_error`] = control.error;
          }
          form.valid = isFormValid(form);

          const formElement = document.getElementById(this.blockId)!;
          const submitButtonElement = formElement.querySelector(
            'button[type="submit"]'
          ) as HTMLButtonElement;
          submitButtonElement!.disabled = !form.valid;
        },
      }
    );
  }

  componentDidMount(): void {
    document
      .querySelector('button.chat__menu')!
      .addEventListener('click', () => {
        document.querySelector('.chat-menu')?.classList.toggle('opened');
      });
    document
      .querySelector('.chat__button-attach')!
      .addEventListener('click', () => {
        document.querySelector('.clip-menu')?.classList.toggle('opened');
      });

    document
      .querySelector<HTMLButtonElement>('.chat-menu .menu__button_add')!
      .addEventListener('click', () => {
        document
          .querySelector('.overlay-add-user')!
          .classList.add('overlay_opened');
      });

    document
      .querySelector<HTMLButtonElement>('.chat-menu .menu__button_remove')!
      .addEventListener('click', () => {
        document
          .querySelector('.overlay-remove-user')!
          .classList.add('overlay_opened');
      });

    // eslint-disable-next-line unicorn/prefer-spread
    for (const overlay of Array.from(document.querySelectorAll('.overlay'))) {
      overlay.addEventListener('click', () => {
        overlay.classList.remove('overlay_opened');
      });
    }

    // eslint-disable-next-line unicorn/prefer-spread
    for (const overlayChild of Array.from(
      document.querySelectorAll('.overlay section')
    )) {
      overlayChild.addEventListener('click', (event) => {
        event.stopPropagation();
      });
    }

    super.componentDidMount();
  }
}
