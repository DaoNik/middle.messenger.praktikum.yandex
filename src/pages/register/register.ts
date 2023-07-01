import { RegisterForm } from '../../components/register-form/register-form';
import template from './register.html?raw';
import { Module } from '../../types.ts';

export class Register extends Module {
  constructor() {
    super(template, [new RegisterForm()]);
  }
}
