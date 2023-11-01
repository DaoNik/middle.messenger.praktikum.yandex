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

export abstract class Block {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_RENDER: 'flow:render',
    FLOW_CDU: 'flow:component-did-update',
    DESTROY: 'destroy',
  };

  eventBus = new EventBus();
  props: PropertiesT;
  blockId = uuidV4();
  content: string;
  templater = new Template();
  declarations: Component[];
  events: EventsT;
  hostStyles: Record<string, string>;
  element: HTMLElement | null = null;

  protected constructor(
    content: string,
    declarations: Component[] = [],
    properties: PropertiesT = {},
    events: EventsT = {},
    hostStyles: Record<string, string> = {}
  ) {
    this.content = content;
    this.declarations = declarations;
    this.events = events;
    this.hostStyles = hostStyles;
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
    this.eventBus.on(
      Block.EVENTS.DESTROY,
      this._componentDidUnmount.bind(this)
    );
  }

  private _init(): void {
    this.init();

    this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
  }

  init(): void {
    this.content = this.templater.precompile(
      this.content,
      this.declarations,
      this.blockId
    );
  }

  private _componentDidMount(): void {
    this.element = document.getElementById(this.blockId)!;
    // this.templater.addDirectives(this.props, this.element);
    this.templater.addEvents(this.element, this.events);
    this.componentDidMount();
    console.log(this);
  }

  componentDidMount(): void {
    if (this.declarations.length > 0) {
      for (const component of this.declarations) {
        component.eventBus.emit(Block.EVENTS.FLOW_CDM);
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
      this.eventBus.emit(Block.EVENTS.FLOW_RENDER, newProperties);
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

        eventBus.emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
        return true;
      },
    });
  }

  private _componentDidUnmount() {
    if (this.element) {
      this.templater.removeEvents(this.element, this.events);
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
}
