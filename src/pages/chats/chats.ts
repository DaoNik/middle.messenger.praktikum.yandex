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
import {
  BASE_HREF,
  ChatsApiService,
  IChatData,
  IFullUserData,
  ResourcesApiService,
  WebSocketApiService,
} from '../../api';
import { ConfirmDialog } from '../../common';
import {
  IFile,
  IMessage,
  IState,
  MessageTypesEnum,
  StorageService,
  withStore,
} from '../../services';
import { AUTH_USER, CURRENT_CHAT_ID } from '../../constants.ts';
import { getTime, isEmpty, isEqual } from '../../utils';

const DEFAULT_TIMEOUT_FOR_LOAD_MESSAGES = 100;
const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;

class BaseChats extends Block {
  private readonly _chatsApiService = new ChatsApiService();
  private readonly _webSocketApi = new WebSocketApiService();
  private readonly _storageService = new StorageService();
  private readonly _resourcesApiService = new ResourcesApiService();
  private _messagesContainer: HTMLDivElement | null = null;

  readonly form = new FormGroup<{ message: string }>({
    message: new FormControl('', [isNotEmptyValidator]),
  });

  clipFiles: IFile[] = [];

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
    this._renderMessages(oldProperties, newProperties);

    super.render(newProperties);
  }

  override componentDidMount() {
    this._chatsApiService
      .getChats()
      .then((chats) => chats ?? [])
      .then((chats) => {
        this.props['chats'] = chats;

        this._renderChats(chats);
      });

    super.componentDidMount();

    this._messagesContainer = document.querySelector('.chat__messages');
  }

  private _renderChats(chats: IChatData[]) {
    const chatsList = document.querySelector('.chats__list')!;

    if (chats.length === 0) {
      chatsList.innerHTML = '';
      return;
    }

    const templateContent = (
      document.getElementById('chat-list-item-template') as HTMLTemplateElement
    ).content;

    for (const chat of chats) {
      const { id, last_message, avatar } = chat;
      const template = templateContent.cloneNode(true) as DocumentFragment;
      const item = template.children[0] as HTMLLIElement;

      const chatIdAttr = document.createAttribute('chatId');

      chatIdAttr.value = String(id);
      item.attributes.setNamedItem(chatIdAttr);

      if (this._storageService.getItem(CURRENT_CHAT_ID) === String(id)) {
        item.classList.add('chats__list-item-active');
        this._loadMessages(String(id));
      }

      const correctLastMessage = last_message
        ? {
            ...last_message,
            time: getTime(last_message.time),
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
  }

  private _renderMessages(
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

    if (!chatId) return;

    let date: Date | null = null;

    const authUser = JSON.parse(
      this._storageService.getItem(AUTH_USER)!
    ) as IFullUserData;

    for (const message of newChatMessages[chatId]) {
      if (
        (isEmpty(oldChatMessages) ||
          !Object.getOwnPropertyNames(oldChatMessages).includes(chatId) ||
          !oldChatMessages[chatId].includes(message)) &&
        message.type !== MessageTypesEnum.USER_CONNECTED
      ) {
        const { time, type, user_id, file } = message;
        const messageDate = new Date(Date.parse(time));
        let documentFragment: DocumentFragment;
        let item: HTMLDivElement;

        if (!date || messageDate.getTime() > date.getTime() + ONE_DAY_IN_MS) {
          const newDateParagraph = document.createElement('p');

          newDateParagraph.classList.add('chat__date');
          newDateParagraph.textContent = `${messageDate.getDate()}.${messageDate.getMonth()}.${messageDate.getFullYear()}`;

          this._messagesContainer?.append(newDateParagraph);

          date = messageDate;
        }

        switch (type) {
          case MessageTypesEnum.FILE:
            documentFragment = messageWithPhotoTemplateContent.cloneNode(
              true
            ) as DocumentFragment;
            item = documentFragment.children[0] as HTMLDivElement;
            const image = item.querySelector(
              '.chat__message-photo'
            ) as HTMLImageElement;

            image.src = `${BASE_HREF}/resources${file?.path ?? ''}`;
            image.alt = file?.filename ?? '';
            break;
          default:
            documentFragment = messageWithTextTemplateContent.cloneNode(
              true
            ) as DocumentFragment;
            item = documentFragment.children[0] as HTMLDivElement;
        }

        item.children[0].classList.add(
          authUser.id === user_id
            ? 'chat__message_from-user'
            : 'chat__message_to-user'
        );

        this.templater.compile(
          { ...message, time: getTime(time) } as any,
          item,
          false
        );

        this._messagesContainer?.append(item);
      }
    }

    if (isEmpty(oldChatMessages)) {
      setTimeout(() => {
        this._scrollMessagesToBottom();
      }, DEFAULT_TIMEOUT_FOR_LOAD_MESSAGES);
    }
  }

  onSubmit(event: SubmitEvent) {
    event.preventDefault();

    if (!this.form.valid && isEmpty(this.clipFiles)) return;

    const chatId = this._storageService.getItem(CURRENT_CHAT_ID);

    if (!chatId) {
      console.error('Чат не выбран');
      return;
    }

    const message = this.form.getRawValue();

    if (!isEmpty(this.clipFiles)) {
      for (const { id } of this.clipFiles) {
        this._webSocketApi.sendMessage(chatId, {
          content: String(id),
          type: 'file',
        });
      }

      const loadFilesContainer = document.querySelector('.chat__load-files')!;

      loadFilesContainer.innerHTML = '';
      loadFilesContainer.classList.add('chat__load-files_empty');
    }

    if (!isEmpty(message.message)) {
      this._webSocketApi.sendMessage(chatId, {
        content: message.message,
        type: 'message',
      });
    }

    this._resetForm();

    setTimeout(() => {
      this._scrollMessagesToBottom();
    }, DEFAULT_TIMEOUT_FOR_LOAD_MESSAGES);
  }

  onInput(event: InputEvent): void {
    inputHandler(event, this.form);
  }

  onInputFile(event: InputEvent): void {
    const fileList = (event.target as any).files as FileList;

    if (fileList.length === 0) return;

    const formData = new FormData();

    formData.append('resource', fileList[0], fileList[0].name);

    this._resourcesApiService.loadFile(formData).then((file) => {
      const image = document.createElement('IMG') as HTMLImageElement;

      image.src = `${BASE_HREF}/resources${file.path}`;
      image.alt = file.filename;

      const loadFilesContainer = document.querySelector('.chat__load-files');

      if (loadFilesContainer?.classList.contains('chat__load-files_empty')) {
        loadFilesContainer?.classList.remove('chat__load-files_empty');
      }

      document.querySelector('.chat__load-files')?.append(image);

      document.querySelector<HTMLButtonElement>(
        'button.chat__button-send'
      )!.disabled = false;

      this.clipFiles.push(file);
    });
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

    this._loadMessages(chatId);
  }

  private _loadMessages(chatId: string): void {
    this._webSocketApi.connect(chatId);
  }

  private _resetForm(): void {
    const form = document.querySelector(
      'form[name="send-message"]'
    ) as HTMLFormElement | null;

    form?.reset();
    this.clipFiles = [];

    document.querySelector<HTMLButtonElement>(
      'button.chat__button-send'
    )!.disabled = true;
  }

  private _scrollMessagesToBottom(): void {
    if (this._messagesContainer) {
      this._messagesContainer.scrollTop = this._messagesContainer.scrollHeight;
    }
  }
}

function mapStateToProps(state: IState) {
  return { chatMessages: { ...state.chatMessages } };
}

export const Chats = withStore(mapStateToProps)(BaseChats);
