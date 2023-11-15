import {
  AddUserDialog,
  RemoveUserDialog,
  ClipMenu,
  ChatMenu,
  AddChatDialog,
} from '../../components';
import {
  isNotEmptyValidator,
  inputHandler,
  blurHandler,
  Block,
  FormGroup,
  FormControl,
} from '../../core';
import template from './chats.html?raw';
import { ChatsApiService, WebSocketApiService } from '../../api';
import { ConfirmDialog } from '../../common';
import { StorageService } from '../../services';
import { CURRENT_CHAT_ID } from '../../constants.ts';

export class Chats extends Block {
  private readonly _chatsApiService = new ChatsApiService();
  private readonly _webSocketApi = new WebSocketApiService();
  private readonly _storageService = new StorageService();

  readonly form = new FormGroup<{ message: string }>({
    message: new FormControl('', [isNotEmptyValidator]),
  });

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
          const { id, last_message, avatar } = chat;
          const template = templateContent.cloneNode(true) as DocumentFragment;
          const item = template.children[0] as HTMLLIElement;

          const chatIdAttr = document.createAttribute('chatId');

          chatIdAttr.value = String(id);
          item.attributes.setNamedItem(chatIdAttr);

          const correctLastMessage = last_message
            ? {
                ...last_message,
                time: this._getTime(last_message.time),
              }
            : {
                content: 'Ещё нет сообщений',
                time: '',
              };

          const formattedChat = {
            ...chat,
            avatar: avatar ?? '/assets/no-avatar.svg',
            last_message: correctLastMessage,
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

    if (!this.form.valid) return;

    console.log(this.form.getRawValue());
  }

  onInput(event: InputEvent) {
    inputHandler(event, this.form);
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

    if (this._storageService.getItem(CURRENT_CHAT_ID)) {
      document
        .querySelector('.chats__list-item-active')
        ?.classList.remove('chats__list-item-active');
    }

    this._storageService.setItem(CURRENT_CHAT_ID, chatId);
    listItem.classList.add('chats__list-item-active');

    this._webSocketApi.connect(chatId);
  }

  private _getTime(time: string): string {
    const messageDate = new Date(Date.parse(time));
    const now = new Date(Date.now());

    if (
      now.getFullYear() !== messageDate.getFullYear() ||
      now.getMonth() !== messageDate.getMonth() ||
      now.getDate() - messageDate.getDate() > 6
    ) {
      return `${messageDate.getDate()}.${messageDate.getMonth()}.${messageDate.getFullYear()}`;
    }

    const minutes = messageDate.getMinutes();
    const formattedMinutes = minutes > 10 ? minutes : `0${minutes}`;

    return `${messageDate.getHours()}:${formattedMinutes}`;
  }
}
