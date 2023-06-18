import { Block } from './core/block.ts';

export abstract class Component extends Block {
  abstract selector: string;
}
