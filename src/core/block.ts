import { EventBus } from './event-bus';
import { v4 as uuidV4 } from 'uuid';
import { Template } from './template.ts';

export type PropertiesT = Record<string, unknown>;

export abstract class Block {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_RENDER: 'flow:render',
    FLOW_CDU: 'flow:component-did-update',
  };

  eventBus = new EventBus();
  props: PropertiesT;
  blockId = uuidV4();
  abstract content: string;
  precompiledContent = '';
  templater = new Template();

  protected constructor(properties: PropertiesT = {}) {
    this.props = this._makePropsProxy(properties);
    this._registerEvents();
    this.eventBus.emit(Block.EVENTS.INIT);
  }

  private _registerEvents(): void {
    this.eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
    this.eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    this.eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    this.eventBus.on(
      Block.EVENTS.FLOW_CDU,
      this._componentDidUpdate.bind(this)
    );
  }

  private _init(): void {
    this.init();

    this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  init(): void {}

  private _componentDidMount(): void {
    this.componentDidMount();
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  componentDidMount(): void {}

  private _render(): void {
    this.render();
  }

  render(): void {
    if (this.precompiledContent) {
      this.content = this.templater.compile(
        this.precompiledContent,
        this.props
      );
      document.getElementById(this.blockId)!.innerHTML = this.content;
    }
  }

  private _componentDidUpdate(
    oldProperties: PropertiesT,
    newProperties: PropertiesT
  ): void {
    const response = this.componentDidUpdate(oldProperties, newProperties);

    if (response) {
      this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  componentDidUpdate(
    oldProperties: PropertiesT,
    newProperties: PropertiesT
  ): boolean {
    return JSON.stringify(oldProperties) !== JSON.stringify(newProperties);
  }

  private _makePropsProxy(properties: PropertiesT): PropertiesT {
    const eventBus = this.eventBus;

    return new Proxy(properties, {
      get(target: PropertiesT, property: string) {
        const value = target[property];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target: PropertiesT, property: string, value) {
        console.log('set proxy trigger');
        const oldTarget = { ...target };
        target[property] = value;

        eventBus.emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
        return true;
      },
    });
  }
}
