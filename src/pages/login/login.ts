import { LoginForm } from '../../components/login-form/login-form';
import template from './login.html?raw';
import { Module } from '../../types.ts';

export class Login extends Module {
  constructor() {
    super(template, [new LoginForm()]);
  }
}
