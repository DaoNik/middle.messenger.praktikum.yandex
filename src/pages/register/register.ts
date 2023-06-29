import { RegisterForm } from '../../components/register-form/register-form';
import template from './register.html?raw';
import { Module } from '../../types.ts';
import { Template } from '../../core/template.ts';

export class Register extends Module {
  declarations = [new RegisterForm()];
  templater = new Template();
  content: string = this.templater.precompile(
    template,
    this.declarations,
    this.blockId
  );

  constructor() {
    super();
  }

  init(): void {}

  componentDidMount() {
    super.componentDidMount();
  }
}
