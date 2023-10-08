import {
  ChangeUserDataDialog,
  ChangePasswordDialog,
  LoadFileDialog,
} from '../../components';
import template from './profile.html?raw';
import { Block, Router } from '../../core';
import { AuthApiService } from '../../api';

export class Profile extends Block {
  private readonly _authApiService = new AuthApiService();
  private readonly _router = Router.__instance;

  constructor() {
    super(
      template,
      [
        new ChangeUserDataDialog(),
        new ChangePasswordDialog(),
        new LoadFileDialog(),
      ],
      {
        email: '',
        login: '',
        first_name: '',
        second_name: '',
        phone: '',
        display_name: '',
      },
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
        onLogout: () => {
          this._authApiService.logout().then(() => {
            this._router.go('/login');
          });
        },
        onGoToChats: () => {
          this._router.go('/chats');
        },
      },
      {
        display: 'flex',
      }
    );
  }

  override componentDidMount() {
    const user = localStorage.getItem('authUser');

    if (user) {
      for (const [key, value] of Object.entries(JSON.parse(user))) {
        this.props[key] = value;
      }
    }

    super.componentDidMount();
  }
}
