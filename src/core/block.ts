import { EventBus } from './event-bus';
import { Template } from './template.ts';
import { IComponent } from '../types.ts';
import { nanoid } from 'nanoid';

export type EventT = (...parameters: any[]) => void;
export type PropertiesT = Record<string, any>;

export enum BlockEvents {
  INIT = 'init',
  FLOW_CDM = 'flow:component-did-mount',
  FLOW_RENDER = 'flow:render',
  FLOW_CDU = 'flow:component-did-update',
  DESTROY = 'destroy',
}

export abstract class Block<Properties extends PropertiesT = any> {
  eventBus = new EventBus();
  props: Properties;
  blockId = nanoid();
  content: string;
  templater = new Template();
  declarations: (Block & IComponent)[];
  hostStyles: Record<string, string>;
  element: HTMLElement | null = null;

  protected constructor(
    content: string,
    declarations: (Block & IComponent)[] = [],
    properties: Properties = {} as any,
    hostStyles: Record<string, string> = {}
  ) {
    this.content = content;
    this.declarations = declarations;
    this.hostStyles = hostStyles;
    this.props = this._makePropsProxy(properties);
    this._registerEvents();
    this.eventBus.emit(BlockEvents.INIT);
  }

  private _registerEvents(): void {
    this.eventBus.on(BlockEvents.INIT, this._init.bind(this));
    this.eventBus.on(BlockEvents.FLOW_CDM, this._componentDidMount.bind(this));
    this.eventBus.on(BlockEvents.FLOW_RENDER, this._render.bind(this));
    this.eventBus.on(BlockEvents.FLOW_CDU, this._componentDidUpdate.bind(this));
    this.eventBus.on(BlockEvents.DESTROY, this._componentDidUnmount.bind(this));
  }

  private _init(): void {
    this.init();

    this.eventBus.emit(BlockEvents.FLOW_RENDER);
  }

  init(): void {
    this.content = this.templater.precompile(
      this.content,
      this.declarations,
      this.blockId
    );
  }

  private _componentDidMount(): void {
    this.element = document.querySelector(`[blockId="${this.blockId}"]`)!;
    this.templater.addEvents(this.element, this);
    this.componentDidMount();
  }

  componentDidMount(): void {
    if (this.declarations.length > 0) {
      for (const component of this.declarations) {
        component.eventBus.emit(BlockEvents.FLOW_CDM);
      }
    }

    this.templater.compile(this.props, this.element!);
  }

  private _render(
    oldProperties?: Properties,
    newProperties?: Properties
  ): void {
    this.render(oldProperties, newProperties);
  }

  render(_oldProperties?: Properties, newProperties?: Properties): void {
    if (this.content && this.element) {
      this.templater.compile(newProperties ?? this.props, this.element);
    }
  }

  private _componentDidUpdate(
    oldProperties: Properties,
    newProperties: Properties
  ): void {
    const response = this.componentDidUpdate(oldProperties, newProperties);

    if (response) {
      this.eventBus.emit(BlockEvents.FLOW_RENDER, oldProperties, newProperties);
    }
  }

  componentDidUpdate(
    oldProperties: Properties,
    newProperties: Properties
  ): boolean {
    return JSON.stringify(oldProperties) !== JSON.stringify(newProperties);
  }

  private _makePropsProxy(properties: Properties): Properties {
    const eventBus = this.eventBus;

    return new Proxy(properties, {
      get(target: Properties, property: keyof Properties & string) {
        const value = target[property];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target: Properties, property: keyof Properties & string, value) {
        const oldTarget = { ...target };
        target[property] = value;

        eventBus.emit(BlockEvents.FLOW_CDU, oldTarget, target);
        return true;
      },
    });
  }

  private _componentDidUnmount() {
    if (this.element) {
      this.templater.removeEvents(this.element, this);
    }
  }

  show() {
    if (this.element) {
      this.element.style.display = this.hostStyles['display'] ?? 'block';
    }
  }

  hide() {
    if (this.element) {
      this.element.style.display = 'none';
    }
  }

  setProps(nextProperties: Properties): void {
    if (!nextProperties) return;

    Object.assign(this.props, nextProperties);
  }
}
