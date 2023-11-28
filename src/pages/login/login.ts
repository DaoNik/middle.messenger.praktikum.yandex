import { LoginForm } from '../../components';
import template from './login.html?raw';
import { Block } from '../../core';

export class Login extends Block {
  constructor() {
    super(template, [new LoginForm()]);
  }
}
