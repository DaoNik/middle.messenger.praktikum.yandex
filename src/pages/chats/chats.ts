import { AddUserDialog } from '../../components/add-user-dialog/add-user-dialog';
import { RemoveUserDialog } from '../../components/remove-user-dialog/remove-user-dialog';
import { isNotEmptyValidator } from '../../core/validators';
import { Form, IFormControl } from '../../core/form';
import { ClipMenu } from '../../components/clip-menu/clip-menu';
import { ChatMenu } from '../../components/chat-menu/chat-menu';
import template from './chats.html?raw';
import { Block } from '../../core/block.ts';

export class Chats extends Block {
  form!: Form;

  constructor() {
    super(template, [
      new ChatMenu(),
      new ClipMenu(),
      new AddUserDialog(),
      new RemoveUserDialog(),
    ]);
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

    this.form = new Form(
      {
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
      },
      this.props
    );

    this.form.init('send-message', this.formSubmit);

    super.componentDidMount();
  }

  formSubmit(formValue: Record<string, string>): void {
    console.log(formValue);
  }
}
