import { ChangeUserDataDialog } from '../../components/change-user-data-dialog/change-user-data-dialog';
import { ChangePasswordDialog } from '../../components/change-password-dialog/change-password-dialog';
import { Block } from '../../core/block';
import { LoadFileDialog } from '../../components/load-file-dialog/load-file-dialog';
import template from './profile.html?raw';
import { Module } from '../../app.module.ts';
import { Template } from '../../core/template.ts';

export class Profile extends Block implements Module {
  declarations = [ChangeUserDataDialog, ChangePasswordDialog, LoadFileDialog];
  imports = [];
  templater = new Template();
  content: string = this.templater.precompile(template, this.declarations);

  constructor() {
    super();
  }

  init(): void {}

  componentDidMount() {
    new ChangeUserDataDialog();
    new ChangePasswordDialog();
    new LoadFileDialog();

    document
      .querySelector('.profile__button_data')!
      .addEventListener('click', () => {
        document
          .querySelector('.overlay-change-data')!
          .classList.add('overlay_opened');
      });

    document
      .querySelector('.profile__button_pass')!
      .addEventListener('click', () => {
        document
          .querySelector('.overlay-change-password')!
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
  }
}

new Profile();
