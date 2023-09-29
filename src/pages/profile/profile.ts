import { ChangeUserDataDialog } from '../../components/change-user-data-dialog/change-user-data-dialog';
import { ChangePasswordDialog } from '../../components/change-password-dialog/change-password-dialog';
import { LoadFileDialog } from '../../components/load-file-dialog/load-file-dialog';
import template from './profile.html?raw';
import { Block } from '../../core/block.ts';
import { AuthApiService } from '../../api/auth-api.service.ts';

export class Profile extends Block {
  private readonly _authApiService: AuthApiService;

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
            console.log('add redirect to login');
          });
        },
      }
    );

    this._authApiService = new AuthApiService();

    this._authApiService.user().then((data) => console.log(data, typeof data));
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
