import { Block } from './core';

export abstract class Component extends Block {
  abstract selector: string;
}
