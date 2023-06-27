import { AddUserDialog } from '../../components/add-user-dialog/add-user-dialog';
import { RemoveUserDialog } from '../../components/remove-user-dialog/remove-user-dialog';
import { isNotEmptyValidator } from '../../core/validators';
import { Form, IFormControl } from '../../core/form';
import { ClipMenu } from '../../components/clip-menu/clip-menu';
import { ChatMenu } from '../../components/chat-menu/chat-menu';
import template from './chats.html?raw';
import { Module } from '../../types.ts';
import { Template } from '../../core/template.ts';

export class Chats extends Module {
  form!: Form;
  declarations = [
    new ChatMenu(),
    new ClipMenu(),
    new AddUserDialog(),
    new RemoveUserDialog(),
  ];
  templater = new Template();
  content: string = this.templater.precompile(
    template,
    this.declarations,
    this.blockId
  );

  constructor() {
    super();
  }

  init() {}

  render(): void {
    if (this.precompiledContent) {
      this.content = this.templater.compile(
        this.precompiledContent,
        this.props
      );
      document.getElementById(this.blockId)!.innerHTML = this.content;
    }
  }

  componentDidMount(): void {
    super.componentDidMount();

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

    this.form = new Form({
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
    });

    this.form.init('send-message', this.formSubmit);
  }

  formSubmit(formValue: Record<string, string>): void {
    console.log(formValue);
  }
}
