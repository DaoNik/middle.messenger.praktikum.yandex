import { RegisterForm } from '../../components';
import template from './register.html?raw';
import { Block } from '../../core';

export class Register extends Block {
  constructor() {
    super(template, [new RegisterForm()]);
  }
}
