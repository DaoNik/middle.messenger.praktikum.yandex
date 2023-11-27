import { IComponent } from '../../types.ts';
import template from './load-file-dialog.html?raw';
import { UserApiService } from '../../api';
import { AUTH_USER } from '../../constants.ts';
import { StorageService, storeService } from '../../services';
import { Block } from '../../core';

export class LoadFileDialog extends Block implements IComponent {
  private readonly _userApiService = new UserApiService();
  private readonly _storageService = new StorageService();

  readonly selector = 'load-file-dialog';

  formData: FormData | null = null;
  filenameElement: HTMLSpanElement | null = null;
  submitElement: HTMLButtonElement | null = null;

  constructor() {
    super(template);
  }

  override componentDidMount() {
    super.componentDidMount();

    if (!this.element) return;

    this.formData = new FormData(this.element.querySelector('form')!);
    this.filenameElement = this.element.querySelector('.dialog__load-text');
    this.submitElement = this.element.querySelector('.dialog__submit');
  }

  onInput(event: InputEvent) {
    const fileList = (event.target as any).files as FileList;
    const element = this.element;

    if (
      fileList.length === 0 ||
      !element ||
      !this.filenameElement ||
      !this.submitElement
    )
      return;

    this.filenameElement.textContent = fileList[0].name;
    this.submitElement.disabled = false;
    this.formData?.append('avatar', fileList[0], fileList[0].name);
  }

  async onSubmit(event: SubmitEvent) {
    event.preventDefault();

    if (!this.formData) return;

    const user = await this._userApiService
      .updateAvatar(this.formData)
      .catch(console.error);

    if (user) {
      await this._storageService.setItem(AUTH_USER, user);

      storeService.set('user', user);
    }
  }

  onDialogClose() {
    this.element?.classList.remove('overlay_opened');
  }

  onDialogNotClose(event: MouseEvent) {
    event.stopPropagation();
  }
}
