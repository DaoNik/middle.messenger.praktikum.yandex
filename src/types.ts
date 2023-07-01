import { Block } from './core/block.ts';

export abstract class Module extends Block {}

export abstract class Component extends Block {
  abstract selector: string;
}
