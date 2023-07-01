import template from './500.html?raw';
import { Module } from '../../types.ts';

export class Page500 extends Module {
  constructor() {
    super(template);
  }
}
