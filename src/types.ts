import { Block } from './core';

export type Indexed<T = any> = {
  [key in string]: T;
};

export type NonEmptyArrayT<T = any> = [T, ...T[]];

export abstract class Component extends Block {
  abstract selector: string;
}
