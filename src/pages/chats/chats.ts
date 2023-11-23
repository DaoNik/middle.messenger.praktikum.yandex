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

const DEFAULT_TIMEOUT_FOR_LOAD_MESSAGES = 300;

class BaseChats extends Block {
  private readonly _chatsApiService = new ChatsApiService();
  private readonly _webSocketApi = new WebSocketApiService();
  private readonly _storageService = new StorageService();
  private readonly _resourcesApiService = new ResourcesApiService();
  private _messagesContainer: HTMLDivElement | null = null;
  private _currentChatId: string | null = null;

  readonly form = new FormGroup<{ message: string }>({
    message: new FormControl('', [isNotEmptyValidator]),
  });

  clipFiles: IFile[] = [];
  mapChatLastMessageDate = new Map<string, Date>();

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

  override async render(
    oldProperties?: PropertiesT,
    newProperties?: PropertiesT
  ) {
    await this._renderMessages(oldProperties, newProperties);

    super.render(newProperties);
  }

  override async componentDidMount() {
    this._chatsApiService
      .getChats()
      .then((chats) => chats ?? [])
      .then((chats) => {
        this.props['chats'] = chats;

        return chats;
      })
      .then((chats) => this._renderChats(chats));

    super.componentDidMount();

    this._messagesContainer = document.querySelector('.chat__messages');
    this._currentChatId = await this._storageService.getItem(CURRENT_CHAT_ID);
  }

  private async _renderChats(chats: IChatData[]): Promise<void> {
    const chatsList = document.querySelector('.chats__list')!;

    if (chats.length === 0) {
      chatsList.innerHTML = '';
      return;
    }

    const templateContent = (
      document.querySelector('#chat-list-item-template') as HTMLTemplateElement
    ).content;

    for (const chat of chats) {
      const { id, last_message, avatar } = chat;
      const template = templateContent.cloneNode(true) as DocumentFragment;
      const item = template.children[0] as HTMLLIElement;

      const chatIdAttribute = document.createAttribute('chatId');

      chatIdAttribute.value = String(id);
      item.attributes.setNamedItem(chatIdAttribute);

      if (this._currentChatId === String(id)) {
        item.classList.add('chats__list-item-active');
        await this._loadMessages(String(id));
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

  private async _renderMessages(
    oldProperties?: PropertiesT,
    newProperties?: PropertiesT
  ): Promise<void> {
    if (!oldProperties && !newProperties) return;

    const oldChatMessages = (
      oldProperties ? oldProperties['chatMessages'] ?? {} : {}
    ) as Record<string, IMessage[]>;
    const newChatMessages = (
      newProperties ? newProperties['chatMessages'] ?? {} : {}
    ) as Record<string, IMessage[]>;

    console.log(oldChatMessages, newChatMessages);

    if (isEmpty(newChatMessages) || !this._messagesContainer) return;

    const isEmptyMessagesContainer =
      this._messagesContainer.children.length === 0;

    if (isEqual(oldChatMessages, newChatMessages) && !isEmptyMessagesContainer)
      return;

    const messageWithTextTemplateContent = (
      document.querySelector(
        '#chat-message-with-text-template'
      ) as HTMLTemplateElement
    ).content;
    const messageWithPhotoTemplateContent = (
      document.querySelector(
        '#chat-message-with-photo-template'
      ) as HTMLTemplateElement
    ).content;

    const chatId = this._currentChatId;
    const user = await this._storageService.getItem(AUTH_USER);

    if (!chatId || !user) return;

    let oldFirstMessageDate: Date | null = null;
    let oldLastMessageDate: Date | null = null;

    if (!isEmpty(oldChatMessages) && !isEmpty(oldChatMessages[chatId])) {
      oldFirstMessageDate = new Date(
        Date.parse(oldChatMessages[chatId][0].time)
      );
      oldLastMessageDate = new Date(
        Date.parse(oldChatMessages[chatId].at(-1)!.time)
      );
    }

    let date: Date | null = isEmptyMessagesContainer
      ? null
      : this.mapChatLastMessageDate.get(chatId) ?? null;

    const authUser = JSON.parse(user) as IFullUserData;

    console.log(newChatMessages[chatId], isEmptyMessagesContainer);

    for (const message of newChatMessages[chatId]) {
      if (
        isEmptyMessagesContainer ||
        ((isEmpty(oldChatMessages) ||
          !Object.getOwnPropertyNames(oldChatMessages).includes(chatId) ||
          !oldChatMessages[chatId].includes(message)) &&
          message.type !== MessageTypesEnum.USER_CONNECTED)
      ) {
        console.log(date, message, isEmptyMessagesContainer);
        const { time, type, user_id, file } = message;
        const messageDate = new Date(Date.parse(time));
        let documentFragment: DocumentFragment;
        let item: HTMLDivElement;

        if (!date || messageDate.getDate() > date.getDate()) {
          const newDateParagraph = document.createElement('p');

          newDateParagraph.classList.add('chat__date');
          newDateParagraph.textContent = `${messageDate.getDate()}.${messageDate.getMonth()}.${messageDate.getFullYear()}`;

          this._messagesContainer.append(newDateParagraph);

          date = messageDate;
          this.mapChatLastMessageDate.set(chatId, messageDate);
        }

        switch (type) {
          case MessageTypesEnum.FILE: {
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
          }
          default: {
            documentFragment = messageWithTextTemplateContent.cloneNode(
              true
            ) as DocumentFragment;
            item = documentFragment.children[0] as HTMLDivElement;
          }
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

        if (!oldFirstMessageDate || !oldLastMessageDate) {
          this._messagesContainer.append(item);
        } else if (messageDate.getTime() >= oldLastMessageDate.getTime()) {
          this._messagesContainer.append(item);
        } else if (isEmptyMessagesContainer) {
          this._messagesContainer.append(item);
        } else {
          document
            .querySelector('p.chat__date')
            ?.insertAdjacentElement('afterend', item);
        }
      }
    }

    if (isEmpty(oldChatMessages) || isEmpty(oldChatMessages[chatId])) {
      setTimeout(() => {
        this._scrollMessagesToBottom();
      }, DEFAULT_TIMEOUT_FOR_LOAD_MESSAGES);
    }
  }

  async onSubmit(event: SubmitEvent): Promise<void> {
    event.preventDefault();

    if (!this.form.valid && isEmpty(this.clipFiles)) return;

    const chatId = this._currentChatId;

    if (!chatId) {
      console.error('Чат не выбран');
      return;
    }

    const message = this.form.getRawValue();

    if (!isEmpty(this.clipFiles)) {
      for (const { id } of this.clipFiles) {
        await this._webSocketApi.sendMessage(chatId, {
          content: String(id),
          type: 'file',
        });
      }

      const loadFilesContainer = document.querySelector('.chat__load-files')!;

      loadFilesContainer.innerHTML = '';
      loadFilesContainer.classList.add('chat__load-files_empty');
    }

    if (!isEmpty(message.message)) {
      await this._webSocketApi.sendMessage(chatId, {
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

  async onMessagesContainerScroll(): Promise<void> {
    if (this._messagesContainer?.scrollTop === 0) {
      const chatId = this._currentChatId;

      if (!chatId) return;

      const chatMessages = (this.props['chatMessages'] ?? {}) as Record<
        string,
        IMessage[]
      >;

      await this._webSocketApi.sendMessage(chatId, {
        content: `${chatMessages[chatId]?.length ?? 0}`,
        type: 'get old',
      });
    }
  }

  async onChatClicked(event: MouseEvent): Promise<void> {
    if (!event.target) return;

    const target = event.target as HTMLElement;
    const listItem = (
      target.tagName === 'LI' ? target : target.parentElement
    ) as HTMLLIElement;
    const chatId = listItem.getAttribute('chatId');
    const chatMessages = document.querySelector('.chat__messages');

    if (!chatId) return;

    const currentChatId = this._currentChatId;

    if (currentChatId && currentChatId === chatId) return;

    document
      .querySelector('.chats__list-item-active')
      ?.classList.remove('chats__list-item-active');

    if (chatMessages) {
      chatMessages.innerHTML = '';
    }

    this._currentChatId = chatId;
    await this._storageService.setItem(CURRENT_CHAT_ID, chatId);
    listItem.classList.add('chats__list-item-active');

    if (!this._webSocketApi.isConnected(chatId)) {
      await this._loadMessages(chatId);
    } else {
      await this._renderMessages({}, this.props);
    }
  }

  private _loadMessages(chatId: string): Promise<void> {
    return this._webSocketApi.connect(chatId);
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

function mapStateToProperties(state: IState) {
  return { chatMessages: { ...state.chatMessages } };
}

export const Chats = withStore(mapStateToProperties)(BaseChats);
