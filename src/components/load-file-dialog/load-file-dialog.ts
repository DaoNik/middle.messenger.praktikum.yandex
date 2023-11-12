import { Component } from '../../types.ts';
import template from './load-file-dialog.html?raw';
import { Router } from '../../core';
import { UserApiService } from '../../api';
import { AUTH_USER } from '../../constants.ts';

export class LoadFileDialog extends Component {
  private readonly _userApiService = new UserApiService();
  private readonly _router = Router.__instance;
  formData = new FormData(this.element?.querySelector('form')!);
  readonly selector = 'load-file-dialog';

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
        localStorage.setItem(AUTH_USER, JSON.stringify(user));

        this._router.refresh();
      }
    });
  }

  onDialogClose() {
    this.element?.classList.remove('overlay_opened');
  }

  close(): void {
    this.element?.classList.remove('overlay_opened');
  }

  onDialogNotClose(event: MouseEvent) {
    event.stopPropagation();
  }
}
