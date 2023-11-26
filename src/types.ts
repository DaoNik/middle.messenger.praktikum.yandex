import { Block, PropertiesT } from './core';

export type Indexed<T = any> = {
  [key in string]: T;
};

export type NonEmptyArrayT<T = any> = [T, ...T[]];

export abstract class Component<
  Properties extends PropertiesT = any
> extends Block<Properties> {
  abstract selector: string;
}
