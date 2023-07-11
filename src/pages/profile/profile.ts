import { ChangeUserDataDialog } from '../../components/change-user-data-dialog/change-user-data-dialog';
import { ChangePasswordDialog } from '../../components/change-password-dialog/change-password-dialog';
import { LoadFileDialog } from '../../components/load-file-dialog/load-file-dialog';
import template from './profile.html?raw';
import { Block } from '../../core/block.ts';

export class Profile extends Block {
  constructor() {
    super(
      template,
      [
        new ChangeUserDataDialog(),
        new ChangePasswordDialog(),
        new LoadFileDialog(),
      ],
      {},
      {
        onChangeDataDialogOpened: () => {
          document
            .querySelector('.overlay-change-data')!
            .classList.add('overlay_opened');
        },
        onChangePasswordDialogOpened: () => {
          document
            .querySelector('.overlay-change-password')!
            .classList.add('overlay_opened');
        },
      }
    );
  }
}
