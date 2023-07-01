import { RegisterForm } from '../../components/register-form/register-form';
import template from './register.html?raw';
import { Block } from '../../core/block.ts';

export class Register extends Block {
  constructor() {
    super(template, [new RegisterForm()]);
  }
}
