import { Component } from '../../types.ts';
import template from './load-file-dialog.html?raw';
import { Router } from '../../core';
import { UserApiService } from '../../api';
import { AUTH_USER } from '../../constants.ts';
import { StorageService } from '../../services';

export class LoadFileDialog extends Component {
  private readonly _userApiService = new UserApiService();
  private readonly _router = Router.__instance;
  private readonly _storageService = new StorageService();

  readonly selector = 'load-file-dialog';

  formData = new FormData(this.element?.querySelector('form')!);

  constructor() {
    super(template);
  }

  onInput(event: InputEvent) {
    const fileList = (event.target as any).files as FileList;
    const element = this.element;

    if (fileList.length === 0 || !element) return;

    element.querySelector('.dialog__load-text')!.textContent = fileList[0].name;
    (element.querySelector('.dialog__submit') as HTMLButtonElement).disabled =
      false;
    this.formData.append('avatar', fileList[0], fileList[0].name);
  }

  onSubmit(event: SubmitEvent) {
    event.preventDefault();

    this._userApiService.updateAvatar(this.formData).then((user) => {
      if (user) {
        this._storageService.setItem(AUTH_USER, user);

        this._router.refresh();
      }
    });
  }

  onDialogClose() {
    this.element?.classList.remove('overlay_opened');
  }

  onDialogNotClose(event: MouseEvent) {
    event.stopPropagation();
  }
}
