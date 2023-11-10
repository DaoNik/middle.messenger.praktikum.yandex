import {
  AddUserDialog,
  RemoveUserDialog,
  ClipMenu,
  ChatMenu,
} from '../../components';
import {
  isFormValid,
  isNotEmptyValidator,
  IForm,
  IFormControl,
  inputHandler,
  blurHandler,
  Block,
  Router,
} from '../../core';
import template from './chats.html?raw';
import { ChatsApiService } from '../../api';
import { AddChatDialog } from '../../components/add-chat-dialog/add-chat-dialog.ts';
import { ConfirmDialog } from '../../common/confirm-dialog/confirm-dialog.ts';
import { joinUrlParts } from '../../utils';
import { MainRoutes } from '../../index.ts';
import { WebSocketApiService } from '../../api/web-socket-api.service.ts';

export class Chats extends Block {
  private readonly _chatsApiService = new ChatsApiService();
  private readonly _router = Router.__instance;
  private readonly _webSocketApi = new WebSocketApiService();

  form: IForm = {
    controls: new Map<string, IFormControl>([
      [
        'message',
        {
          value: '',
          validators: [isNotEmptyValidator],
          valid: false,
          error: '',
        },
      ],
    ]),
    valid: false,
  };

  constructor() {
    super(
      template,
      [
        new ChatMenu(),
        new ClipMenu(),
        new AddUserDialog(),
        new RemoveUserDialog(),
        new AddChatDialog(),
        new ConfirmDialog(),
      ],
      {
        chats: [],
      },
      { display: 'grid' }
    );
  }

  override componentDidMount() {
    this._chatsApiService
      .getChats()
      .then((chats) => chats ?? [])
      .then((chats) => {
        console.log(chats);
        this.props['chats'] = chats;
        const chatsList = document.querySelector('.chats__list')!;

        if (chats.length === 0) {
          chatsList.innerHTML = '';
          return;
        }

        const templateContent = (
          document.getElementById(
            'chat-list-item-template'
          ) as HTMLTemplateElement
        ).content;
        let i = 0;

        for (const chat of chats) {
          const template = templateContent.cloneNode(true) as DocumentFragment;
          const item = template.children[0] as HTMLLIElement;

          const chatIdAttr = document.createAttribute('chatId');

          chatIdAttr.value = String(chat.id);
          item.attributes.setNamedItem(chatIdAttr);

          const formattedChat = {
            ...chat,
            avatar: chat.avatar ?? '/assets/no-avatar.svg',
            last_message: chat.last_message ?? {
              content: 'Ещё нет сообщений',
              time: '',
            },
          };

          this.templater.compile(formattedChat as any, item, false);

          chatsList.append(item);
          i++;
        }
      });

    super.componentDidMount();
  }

  onSubmit(event: SubmitEvent) {
    event.preventDefault();
    const form = this.form;
    if (isFormValid(form)) {
      const formValue: Record<string, string> = {};
      for (const [key, value] of form.controls) {
        formValue[key] = value.value;
      }
      console.log(formValue);
    }
  }

  onInput(event: InputEvent) {
    inputHandler(event, this.form.controls);
  }

  onBlur(event: FocusEvent) {
    blurHandler(event, this.form, this.props, this.element);
  }

  onChatMenuToggled() {
    document.querySelector('.chat-menu')?.classList.toggle('opened');
  }

  onClipMenuToggled() {
    document.querySelector('.clip-menu')?.classList.toggle('opened');
  }

  onAddChatOpened() {
    document
      .querySelector('.overlay-add-chat')
      ?.classList.add('overlay_opened');
  }

  onChatClicked(event: MouseEvent) {
    if (!event.target) return;

    const target = event.target as HTMLElement;
    const listItem = (
      target.tagName === 'LI' ? target : target.parentElement
    ) as HTMLLIElement;
    const chatId = listItem.getAttribute('chatId');

    if (!chatId) return;

    this._router.go(joinUrlParts(MainRoutes.MESSENGER, chatId));

    this._webSocketApi.connect(chatId);
  }
}
