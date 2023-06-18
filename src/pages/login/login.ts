import { LoginForm } from '../../components/login-form/login-form';
import template from './login.html?raw';
import { Block } from '../../core/block.ts';

export class Login extends Block {
  constructor() {
    super(template, [new LoginForm()]);
  }
}
