import { RegisterForm } from '../../components/register-form/register-form';
import { Block } from '../../core/block';
import template from './register.html?raw';
import { Module } from '../../app.module.ts';
import { Template } from '../../core/template.ts';

export class Register extends Block implements Module {
  declarations = [RegisterForm];
  imports = [];
  templater = new Template();
  content: string = this.templater.precompile(template, this.declarations);

  constructor() {
    super();
  }

  init() {}

  componentDidMount() {
    new RegisterForm();
  }
}
