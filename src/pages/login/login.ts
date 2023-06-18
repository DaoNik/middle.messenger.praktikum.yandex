import { LoginForm } from '../../components/login-form/login-form';
import { Block } from '../../core/block';
import template from './login.html?raw';
import { Module } from '../../app.module.ts';
import { Template } from '../../core/template.ts';

export class Login extends Block implements Module {
  declarations = [LoginForm];
  imports = [];
  templater = new Template();
  content: string = this.templater.precompile(template, this.declarations);

  constructor() {
    super();
  }

  init(): void {}

  componentDidMount(): void {
    new LoginForm();
  }
}
