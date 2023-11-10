import {
  ChangeUserDataDialog,
  ChangePasswordDialog,
  LoadFileDialog,
} from '../../components';
import template from './profile.html?raw';
import { Block, Router } from '../../core';
import { AuthApiService, BASE_HREF, IFullUserData } from '../../api';
import { AUTH_USER } from '../../constants.ts';

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
        display: 'flex',
      }
    );
  }

  override componentDidMount() {
    const user = localStorage.getItem(AUTH_USER);
    const image = document.querySelector(
      '.profile__image'
    ) as HTMLImageElement | null;

    if (user) {
      const userData: IFullUserData = JSON.parse(user);

      for (const [key, value] of Object.entries(userData)) {
        this.props[key] = value;
      }

      if (image) {
        const { avatar } = userData;

        if (avatar) {
          image.src = `${BASE_HREF}/resources${avatar}`;
        }
      }
    }

    super.componentDidMount();
  }

  onAvatarClicked() {
    document
      .querySelector('.overlay-load-file')!
      .classList.add('overlay_opened');
  }

  onChangeDataDialogOpened() {
    document
      .querySelector('.overlay-change-data')!
      .classList.add('overlay_opened');
  }

  onChangePasswordDialogOpened() {
    document
      .querySelector('.overlay-change-password')!
      .classList.add('overlay_opened');
  }

  onLogout() {
    this._authApiService.logout().then(() => {
      this._router.go('/');
    });
  }
}
