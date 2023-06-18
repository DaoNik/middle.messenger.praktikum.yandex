import { RegisterForm } from '../../components/register-form/register-form';
import { Block } from '../../core/block';
import value from './register.html?raw';

export class Register extends Block {
  constructor() {
    super();
  }

  init() {
    this.content = value;
  }

  componentDidMount() {
    new RegisterForm();
  }
}
