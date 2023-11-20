import {
  AddChatDialog,
  AddUserDialog,
  ChatMenu,
  ClipMenu,
  RemoveUserDialog,
} from '../../components';
import {
  Block,
  blurHandler,
  FormControl,
  FormGroup,
  inputHandler,
  isNotEmptyValidator,
  PropertiesT,
} from '../../core';
import template from './chats.html?raw';
import { BASE_HREF, ChatsApiService, WebSocketApiService } from '../../api';
import { ConfirmDialog } from '../../common';
import {
  IMessage,
  IState,
  MessageTypesEnum,
  StorageService,
  withStore,
} from '../../services';
import { CURRENT_CHAT_ID } from '../../constants.ts';
import { isEmpty, isEqual } from '../../utils';

class BaseChats extends Block {
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
        chatMessages: {} as IState['chatMessages'],
      },
      { display: 'grid' }
    );
  }

  override render(oldProperties?: PropertiesT, newProperties?: PropertiesT) {
    this.renderMessages(oldProperties, newProperties);

    super.render(newProperties);
  }

  override componentDidMount() {
    this._chatsApiService
      .getChats()
      .then((chats) => chats ?? [])
      .then((chats) => {
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
        }
      });

    super.componentDidMount();
  }

  renderMessages(
    oldProperties?: PropertiesT,
    newProperties?: PropertiesT
  ): void {
    if (!oldProperties && !newProperties) return;

    const oldChatMessages = (
      oldProperties ? oldProperties['chatMessages'] ?? {} : {}
    ) as Record<string, IMessage[]>;
    const newChatMessages = (
      newProperties ? newProperties['chatMessages'] ?? {} : {}
    ) as Record<string, IMessage[]>;

    if (isEqual(oldChatMessages, newChatMessages)) return;

    const messageWithTextTemplateContent = (
      document.getElementById(
        'chat-message-with-text-template'
      ) as HTMLTemplateElement
    ).content;
    const messageWithPhotoTemplateContent = (
      document.getElementById(
        'chat-message-with-photo-template'
      ) as HTMLTemplateElement
    ).content;

    const chatId = this._storageService.getItem(CURRENT_CHAT_ID);
    const chatMessages = document.querySelector('.chat__messages');

    if (!chatId) return;

    for (const message of newChatMessages[chatId]) {
      if (
        isEmpty(oldChatMessages) ||
        !Object.getOwnPropertyNames(oldChatMessages).includes(chatId) ||
        !oldChatMessages[chatId].includes(message)
      ) {
        let documentFragment: DocumentFragment;
        let item: HTMLDivElement;

        switch (message.type) {
          case MessageTypesEnum.FILE:
            documentFragment = messageWithPhotoTemplateContent.cloneNode(
              true
            ) as DocumentFragment;
            item = documentFragment.children[0] as HTMLDivElement;
            const image = item.querySelector(
              '.chat__message-photo'
            ) as HTMLImageElement;

            image.src = `${BASE_HREF}/resources${message.file?.path ?? ''}`;
            image.alt = message.file?.filename ?? '';

            this.templater.compile(
              { ...message, time: this._getTime(message.time) } as any,
              item,
              false
            );

            chatMessages?.append(item);
            break;
          default:
            documentFragment = messageWithTextTemplateContent.cloneNode(
              true
            ) as DocumentFragment;
            item = documentFragment.children[0] as HTMLDivElement;

            this.templater.compile(
              { ...message, time: this._getTime(message.time) } as any,
              item,
              false
            );

            chatMessages?.append(item);
        }
      }
    }
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
    const chatMessages = document.querySelector('.chat__messages');

    if (!chatId) return;

    const currentChatId = this._storageService.getItem(CURRENT_CHAT_ID);

    if (currentChatId && currentChatId !== chatId) {
      document
        .querySelector('.chats__list-item-active')
        ?.classList.remove('chats__list-item-active');

      if (chatMessages) {
        chatMessages.innerHTML = '';
      }
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
    const formattedMinutes = minutes > 9 ? minutes : `0${minutes}`;

    return `${messageDate.getHours()}:${formattedMinutes}`;
  }
}

function mapStateToProps(state: IState) {
  return { chatMessages: { ...state.chatMessages } };
}

export const Chats = withStore(mapStateToProps)(BaseChats);
