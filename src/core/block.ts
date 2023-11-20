import { EventBus } from './event-bus';
import { v4 as uuidV4 } from 'uuid';
import { Template } from './template.ts';
import { Component } from '../types.ts';

export type EventT = (...parameters: any[]) => void;
export type EventsT = Record<string, EventT>;
export type PropertiesT = Record<string, unknown>;

export interface IBlockProperties {
  props: PropertiesT;
  events: EventsT;
}

export enum BlockEvents {
  INIT = 'init',
  FLOW_CDM = 'flow:component-did-mount',
  FLOW_RENDER = 'flow:render',
  FLOW_CDU = 'flow:component-did-update',
  DESTROY = 'destroy',
}

export abstract class Block {
  eventBus = new EventBus();
  props: PropertiesT;
  blockId = uuidV4();
  content: string;
  templater = new Template();
  declarations: Component[];
  hostStyles: Record<string, string>;
  element: HTMLElement | null = null;

  protected constructor(
    content: string,
    declarations: Component[] = [],
    properties: PropertiesT = {},
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

  private _render(): void {
    this.render();
  }

  render(properties?: PropertiesT): void {
    if (this.content && this.element) {
      this.templater.compile(properties ?? this.props, this.element);
    }
  }

  private _componentDidUpdate(
    oldProperties: PropertiesT,
    newProperties: PropertiesT
  ): void {
    const response = this.componentDidUpdate(oldProperties, newProperties);

    if (response) {
      this.eventBus.emit(BlockEvents.FLOW_RENDER, newProperties);
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

  setProps(nextProps: PropertiesT): void {
    if (!nextProps) return;

    Object.assign(this.props, nextProps);
  }
}
