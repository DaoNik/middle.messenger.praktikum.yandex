import { LoginForm } from '../../components/login-form/login-form';
import { Block } from '../../core/block';
import value from './login.html?raw';

export class Login extends Block {
  constructor() {
    super();
  }

  init(): void {
    this.content = value;
  }

  componentDidMount(): void {
    new LoginForm();
  }
}
