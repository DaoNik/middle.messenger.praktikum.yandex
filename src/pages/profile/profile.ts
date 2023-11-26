import {
  ChangeUserDataDialog,
  ChangePasswordDialog,
  LoadFileDialog,
} from '../../components';
import template from './profile.html?raw';
import { Block, Router } from '../../core';
import { AuthApiService, BASE_HREF, IFullUserData } from '../../api';
import { IState, withStore } from '../../services';

class BaseProfile extends Block<IFullUserData> {
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
      undefined,
      {
        display: 'flex',
      }
    );
  }

  override render(
    oldProperties?: IFullUserData,
    newProperties?: IFullUserData
  ) {
    if (newProperties) {
      this._renderProfile(newProperties);
    }

    super.render(oldProperties, newProperties);
  }

  onAvatarClicked() {
    document
      .querySelector('.overlay-load-file')
      ?.classList.add('overlay_opened');
  }

  onChangeDataDialogOpened() {
    document
      .querySelector('.overlay-change-data')
      ?.classList.add('overlay_opened');
  }

  onChangePasswordDialogOpened() {
    document
      .querySelector('.overlay-change-password')
      ?.classList.add('overlay_opened');
  }

  onLogout(): void {
    this._authApiService
      .logout()
      .then(() => this._router.go('/'))
      .catch(console.error);
  }

  private _renderProfile(user: IFullUserData): void {
    const image = document.querySelector(
      '.profile__image'
    ) as HTMLImageElement | null;

    if (image) {
      const { avatar } = user;

      if (avatar) {
        image.src = `${BASE_HREF}/resources${avatar}`;
      }
    }
  }
}

function mapStateToProperties(state: IState) {
  return { ...state.user };
}

export const Profile = withStore(mapStateToProperties)(BaseProfile);
