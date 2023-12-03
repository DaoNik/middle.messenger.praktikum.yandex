import {
  ChangeUserDataDialog,
  ChangePasswordDialog,
  LoadFileDialog,
} from '../../components';
import template from './profile.html?raw';
import { Block, Router } from '../../core';
import { AuthApiService, IFullUserData } from '../../api';
import {
  IState,
  StorageService,
  storeService,
  withStore,
} from '../../services';
import { IComponent } from '../../types.ts';
import { isEmpty } from '../../utils';
import { AUTH_USER, getImgSource } from '../../constants.ts';

class BaseProfile extends Block<IFullUserData> {
  private readonly _authApiService = new AuthApiService();
  private readonly _storageService = new StorageService();
  private readonly _router = Router.__instance;

  constructor() {
    super(
      template,
      [
        new ChangeUserDataDialog({}) as Block & IComponent,
        new ChangePasswordDialog(),
        new LoadFileDialog(),
      ],
      undefined,
      {
        display: 'flex',
      }
    );
  }

  override async componentDidMount() {
    if (isEmpty(this.props)) {
      const { user } = storeService.getState();

      if (user) {
        this.props = user;
        this._renderProfile(user);
      } else {
        const userData = await this._storageService.getItem<IFullUserData>(
          AUTH_USER
        );

        if (userData) {
          this.props = userData;
          this._renderProfile(userData);
        }
      }
    }

    super.componentDidMount();
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
        image.src = getImgSource(avatar);
      }
    }
  }
}

function mapStateToProperties(state: IState) {
  return { ...state.user };
}

export const Profile = withStore(mapStateToProperties)(BaseProfile);
