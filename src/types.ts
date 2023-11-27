export type Indexed<T = any> = {
  [key in string]: T;
};

export type NonEmptyArrayT<T = any> = [T, ...T[]];

export interface IComponent {
  selector: string;
}
