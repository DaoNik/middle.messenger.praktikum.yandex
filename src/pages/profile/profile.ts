import { ChangeUserDataDialog } from '../../components/change-user-data-dialog/change-user-data-dialog';
import { ChangePasswordDialog } from '../../components/change-password-dialog/change-password-dialog';
import { LoadFileDialog } from '../../components/load-file-dialog/load-file-dialog';
import template from './profile.html?raw';
import { Module } from '../../types.ts';

export class Profile extends Module {
  constructor() {
    super(template, [
      new ChangeUserDataDialog(),
      new ChangePasswordDialog(),
      new LoadFileDialog(),
    ]);
  }

  componentDidMount() {
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

    super.componentDidMount();
  }
}
