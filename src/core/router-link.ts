import { Router } from './router.ts';

export class RouterLink extends HTMLElement {
  private readonly _router = Router.__instance;

  constructor() {
    super();
    // элемент создан
  }

  connectedCallback() {
    // браузер вызывает этот метод при добавлении элемента в документ
    // (может вызываться много раз, если элемент многократно добавляется/удаляется)
    const link = this.getAttribute('link') ?? '/chats';

    this.addEventListener('click', () => {
      this._router.go(link);
    });
  }

  disconnectedCallback() {
    // браузер вызывает этот метод при удалении элемента из документа
    // (может вызываться много раз, если элемент многократно добавляется/удаляется)
    const link = this.getAttribute('link') ?? '/chats';

    this.removeEventListener('click', () => {
      this._router.go(link);
    });
  }

  static get observedAttributes() {
    return [
      /* массив имён атрибутов для отслеживания их изменений */
      'link',
    ];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    // вызывается при изменении одного из перечисленных выше атрибутов
  }

  adoptedCallback() {
    // вызывается, когда элемент перемещается в новый документ
    // (происходит в document.adoptNode, используется очень редко)
  }

  // у элемента могут быть ещё другие методы и свойства
}
