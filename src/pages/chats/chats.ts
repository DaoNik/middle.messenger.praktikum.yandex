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
import {
  getTime,
  isEmpty,
  isEqual,
  isEqualDate,
  isFirstDateLessThenSecondDate,
  isFirstDateMoreThenSecondDate,
} from '../../utils';
import { NonEmptyArrayT } from '../../types.ts';

const DEFAULT_TIMEOUT_FOR_LOAD_MESSAGES = 500;
const CHAT_LOADS_FILES_CLASS = '.chat__load-files';
const CHAT_LOADS_FILES_EMPTY_CLASS_NAME = 'chat__load-files_empty';
const CHATS_LIST_ITEM_ACTIVE_CLASS_NAME = 'chats__list-item-active';

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
      .then((chats) => this._renderChats(chats))
      .catch(console.error);

    super.componentDidMount();

    this._messagesContainer = document.querySelector('.chat__messages');
    const chatId = await this._storageService.getItem<number>(CURRENT_CHAT_ID);

    this._currentChatId = String(chatId);
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
        item.classList.add(CHATS_LIST_ITEM_ACTIVE_CLASS_NAME);
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

  // eslint-disable-next-line sonarjs/cognitive-complexity
  private async _renderMessages(
    oldProperties?: PropertiesT,
    newProperties?: PropertiesT
  ): Promise<void> {
    if (!oldProperties && !newProperties) return;

    const chatId = this._currentChatId;
    const user = await this._storageService.getItem<IFullUserData>(AUTH_USER);

    if (!chatId || !user) return;

    const oldChatMessages = this._hasChatMessages(chatId, oldProperties);
    const newChatMessages = this._hasChatMessages(chatId, newProperties);

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

    let oldFirstMessageDate: Date | null = null;

    if (!isEmpty(oldChatMessages)) {
      oldFirstMessageDate = new Date(Date.parse(oldChatMessages[0].time));
    }

    let date: Date | null = null;

    const { updatedMessages, isAddToEnd } = this._getUpdatedMessages(
      isEmptyMessagesContainer,
      oldChatMessages,
      newChatMessages
    );
    const newCreatedElements: Element[] = [];

    for (const message of updatedMessages) {
      if (message.type !== MessageTypesEnum.USER_CONNECTED) {
        const messageDate = new Date(Date.parse(message.time));

        // TODO: remake it
        if (
          !date ||
          isFirstDateMoreThenSecondDate(messageDate, date) ||
          (oldFirstMessageDate &&
            isFirstDateLessThenSecondDate(messageDate, oldFirstMessageDate) &&
            isFirstDateLessThenSecondDate(messageDate, date))
        ) {
          const newDateParagraph = this._createDateParagraph(messageDate);

          newCreatedElements.push(newDateParagraph);

          date = messageDate;
        }

        const item = this._createMessage(
          message,
          messageWithPhotoTemplateContent,
          messageWithTextTemplateContent,
          user
        );

        newCreatedElements.push(item);
      }
    }

    if (isAddToEnd) {
      this._messagesContainer.append(...newCreatedElements.slice(1));
    } else {
      const newFirstMessageDate = new Date(
        Date.parse(updatedMessages.at(-1)!.time)
      );

      if (
        oldFirstMessageDate &&
        isEqualDate(oldFirstMessageDate, newFirstMessageDate)
      ) {
        this._messagesContainer.children[0].remove();
      }

      this._messagesContainer.prepend(...newCreatedElements);
    }

    if (isEmpty(oldChatMessages)) {
      this._scrollMessagesToBottom();
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

      const loadFilesContainer = document.querySelector(
        CHAT_LOADS_FILES_CLASS
      )!;

      loadFilesContainer.innerHTML = '';
      loadFilesContainer.classList.add(CHAT_LOADS_FILES_EMPTY_CLASS_NAME);
    }

    if (!isEmpty(message.message)) {
      await this._webSocketApi.sendMessage(chatId, {
        content: message.message,
        type: 'message',
      });
    }

    this._resetForm();

    this._scrollMessagesToBottom();
  }

  onInput(event: InputEvent): void {
    inputHandler(event, this.form);
  }

  onInputFile(event: InputEvent): void {
    const fileList = (event.target as any).files as FileList;

    if (fileList.length === 0) return;

    const formData = new FormData();

    formData.append('resource', fileList[0], fileList[0].name);

    this._resourcesApiService
      .loadFile(formData)
      .then((file) => {
        const image = document.createElement('IMG') as HTMLImageElement;

        image.src = `${BASE_HREF}/resources${file.path}`;
        image.alt = file.filename;

        const loadFilesContainer = document.querySelector(
          CHAT_LOADS_FILES_CLASS
        );

        if (
          loadFilesContainer?.classList.contains(
            CHAT_LOADS_FILES_EMPTY_CLASS_NAME
          )
        ) {
          loadFilesContainer?.classList.remove(
            CHAT_LOADS_FILES_EMPTY_CLASS_NAME
          );
        }

        document.querySelector(CHAT_LOADS_FILES_CLASS)?.append(image);

        document.querySelector<HTMLButtonElement>(
          'button.chat__button-send'
        )!.disabled = false;

        this.clipFiles.push(file);
      })
      .catch(console.error);
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
      .querySelector(`.${CHATS_LIST_ITEM_ACTIVE_CLASS_NAME}`)
      ?.classList.remove(CHATS_LIST_ITEM_ACTIVE_CLASS_NAME);

    if (chatMessages) {
      chatMessages.innerHTML = '';
    }

    this._currentChatId = chatId;
    await this._storageService.setItem(CURRENT_CHAT_ID, chatId);
    listItem.classList.add(CHATS_LIST_ITEM_ACTIVE_CLASS_NAME);

    await (this._webSocketApi.isConnected(chatId)
      ? this._renderMessages({}, this.props)
      : this._loadMessages(chatId));
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
    setTimeout(() => {
      if (!this._messagesContainer) return;

      this._messagesContainer.scrollTop = this._messagesContainer.scrollHeight;
    }, DEFAULT_TIMEOUT_FOR_LOAD_MESSAGES);
  }

  private _hasChatMessages(
    chatId: string,
    properties?: PropertiesT
  ): IMessage[] {
    const chatMessages = (
      properties ? properties['chatMessages'] ?? {} : {}
    ) as Record<string, IMessage[]>;

    if (Object.getOwnPropertyNames(chatMessages).includes(chatId)) {
      return chatMessages[chatId];
    }

    return [];
  }

  private _createDateParagraph(messageDate: Date): HTMLParagraphElement {
    const newDateParagraph = document.createElement('p');

    newDateParagraph.classList.add('chat__date');
    newDateParagraph.textContent = `${messageDate.getDate()}.${messageDate.getMonth()}.${messageDate.getFullYear()}`;

    return newDateParagraph;
  }

  private _getUpdatedMessages(
    isEmptyMessagesContainer: boolean,
    oldChatMessages: IMessage[],
    newChatMessages: IMessage[]
  ): { updatedMessages: NonEmptyArrayT<IMessage>; isAddToEnd: boolean } {
    if (isEmptyMessagesContainer || isEmpty(oldChatMessages))
      return {
        updatedMessages: newChatMessages as NonEmptyArrayT,
        isAddToEnd: true,
      };

    const oldFirstMessage = oldChatMessages[0];
    const newFirstMessage = newChatMessages[0];

    // элементы добавились пагинацией
    if (oldFirstMessage.id !== newFirstMessage.id) {
      const updatedMessages = newChatMessages.slice(
        0,
        newChatMessages.length - oldChatMessages.length
      ) as NonEmptyArrayT;

      return { updatedMessages, isAddToEnd: false };
    }

    // отправлены новые сообщения
    return {
      updatedMessages: newChatMessages.slice(
        oldChatMessages.length
      ) as NonEmptyArrayT,
      isAddToEnd: true,
    };
  }

  private _createMessage(
    message: IMessage,
    messageWithPhotoTemplateContent: DocumentFragment,
    messageWithTextTemplateContent: DocumentFragment,
    authUser: IFullUserData
  ): HTMLDivElement {
    const { type, time, user_id, file } = message;
    let documentFragment: DocumentFragment;
    let item: HTMLDivElement;

    if (type === MessageTypesEnum.FILE) {
      documentFragment = messageWithPhotoTemplateContent.cloneNode(
        true
      ) as DocumentFragment;
      item = documentFragment.children[0] as HTMLDivElement;
      const image = item.querySelector(
        '.chat__message-photo'
      ) as HTMLImageElement;

      image.src = `${BASE_HREF}/resources${file?.path ?? ''}`;
      image.alt = file?.filename ?? '';
    } else {
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
      { ...message, time: getTime(time) } as unknown as PropertiesT,
      item,
      false
    );

    return item;
  }
}

function mapStateToProperties(state: IState) {
  return { chatMessages: { ...state.chatMessages } };
}

export const Chats = withStore(mapStateToProperties)(BaseChats);
